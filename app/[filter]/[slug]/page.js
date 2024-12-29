import client from '../../lib/sanity'
export const revalidate = 30;
import ProjectPage from '../../components/ProjectPage';


async function getData(slug){
    const projectQuery = `
    *[_type == "project" && slug.current == $slug][0]{
      title, 
      _id, 
      link[]{ url, title },
      heading, 
      year, 
      description, 
      role, 
      tools, 
      collaborators, 
      "heroUrl": hero.asset->url,
      "heroType": hero.asset->mimeType,
      images[]{
        _type == "image" => { "type": "image", "url": asset->url, alt }, 
        _type == "file" => { "type": "file", "url": asset->url }
      },
      number, 
      types
    }`;
    const navigationQuery = `
    {
      "nextProject": *[_type == "project" && $types[0] in types && number > $currentNumber] | order(number asc)[0]{
        "slug": slug.current
      },
      "previousProject": *[_type == "project" && $types[0] in types && number < $currentNumber] | order(number desc)[0]{
        "slug": slug.current
      },
        "firstProject": *[_type == "project" && $types[0] in types] | order(number asc)[0]{
    "slug": slug.current
  },
  "lastProject": *[_type == "project" && $types[0] in types] | order(number desc)[0]{
    "slug": slug.current
  }
    }`;
    const currentProject = await client.fetch(projectQuery, {slug});
    const { nextProject, previousProject, firstProject, lastProject } = await client.fetch(navigationQuery, {
      types: currentProject.types,
      currentNumber: currentProject.number,
    });
    return { currentProject, 
      nextProject:nextProject?.slug || firstProject.slug,
       previousProject:previousProject?.slug || lastProject.slug };

}

    export default async function Project({params}){
          const { currentProject, nextProject, previousProject } = await getData(params.slug);
          return <ProjectPage currentProject={currentProject} nextProject={nextProject} previousProject={previousProject} />;   
      
    }