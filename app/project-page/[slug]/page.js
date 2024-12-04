
import client from '../../lib/sanity'
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon, ArrowUpIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'


export const revalidate = 30;


async function getData(slug){
  const currentProjectQuery = `
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
    number
  }`;

  const currentProject = await client.fetch(currentProjectQuery, { slug });

  const navigationQuery = `
  {
    "nextProject": *[_type == "project" && number > $currentNumber] | order(number asc)[0]{ "slug": slug.current, "number": number },
    "previousProject": *[_type == "project" && number < $currentNumber] | order(number desc)[0]{ "slug": slug.current, "number": number },
     "firstProject": *[_type == "project"] | order(number asc)[0]{ "slug": slug.current },
    "lastProject": *[_type == "project"] | order(number desc)[0]{ "slug": slug.current }
  }`;

  const { nextProject, previousProject } = await client.fetch(navigationQuery, { currentNumber: currentProject.number });

  return { currentProject, nextProject, previousProject };
}


export default async function ProjectPage({params}){
    const data = await getData(params.slug);
    const {currentProject, nextProject, previousProject, firstProject, lastProject} = data;

    const next = nextProject || firstProject;
    const previous = previousProject || lastProject;

    console.log(previousProject, nextProject);
    
    const toolColors = {
      "Figma": "#FEA3A0",
      "Illustrator": "#FEA3A0",
      "Indesign": "#FFC3E4",
      "Blender": "#CBFF28",
      "Cinema 4D":'#CBFF28',
      "AfterEffects": '#6BCEB1',
      "Code": '#5800FF',
      "Installation": '#FE80AA', 
      "Electronics": '#ADF0B6',
      "Risograph": '#CAA1FF',

    };

    const roleColors = {
      "3D Designer": "#E4FA9F", 
      "Designer": "#FEA3A0",
      "Animator": "#A9DFCF",
      "UX Designer": "#D2BCFD",
      "Web Developer": "#D2BCFD",
      "Copywriter": "#B5DEFC",
    };


    return(
        <section className='flex flex-col justify-between w-screen min-h-screen p-8 pt-15'> 
         <section className='flex flex-col-reverse lg:flex-row justify-between gap-4'>

        <section className='flex flex-col justify-start lg:w-1/2 w-full pb-10 lg:pt-8 gap-5'>
        <h2 className='border-b border-[--grey] py-4 lg:w-[40vw] w-full'>{currentProject.title}</h2>
        <div className="lg:w-[40vw] w-full">
        <p>{currentProject.description}</p>
        </div>
        <section className='flex flex-col gap-5 w-full'>

        <div className="flex flex-col gap-2">
        <p className="sub text-[--grey]">
          Role
        </p>
        <div className="flex gap-2">
          {currentProject.role.map((roleItem, index) => (
            <span key={index} className="tag" style={{backgroundColor: roleColors[roleItem] || "#ccc"}}>{roleItem} </span>
          ))}
        </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="sub text-[--grey]">Tools</p>
          <div className="flex flex-row flex-wrap lg:gap-6 gap-2">
          {currentProject.tools.map((toolItem, index) => (
            <div key={toolItem}className="flex lg:flex-row content-center">
            <span className="rounded-full self-center border border-black  blur-[1px] p-[0.25em] bg-[--cream]" style={{ backgroundColor: toolColors[toolItem] || "#ccc" }}></span>
            <span className="tool-tag">{toolItem}</span>
            </div>
          ))}
          </div>
        </div>

        <div className='flex flex-col gap-2'>
        <p className="sub text-[--grey]">Year</p>
          <div className='year'>{currentProject.year}</div>
        </div>
        {currentProject.collaborators && (
               <div className="flex flex-col gap-2">
               <p className="sub text-[--grey]">Collaborators</p>
               <div className="flex flex-col">
                 {currentProject.collaborators.map((collaboratorsItem, index) => (
                   <span key={index} className="collaborators">{collaboratorsItem}</span> 
                 ))}
               </div>
       
               </div>
        )}

        {currentProject.link && (
              <div className="flex flex-col gap-2">
              <p className="sub text-[--grey]">Links</p>
              <div className="flex flex-col">
                {currentProject.link.map ((linkItem, index) => (
                
                   <Link key={index} href={linkItem.url} title={linkItem.title} className='link flex content-center gap-1 hover:text-[--midnight]'><span className='link-text'>{linkItem.title}</span><ArrowUpRightIcon className=' arrow size-3 self-center'/></Link>
          
                ))}
              </div>
              </div>

        )}

       
        </section>
        </section>
        <div className='w-full h-full lg:pt-24 lg:pb-5'>  
      
        {currentProject.heroType.startsWith("image/") ? (
                <Image src={currentProject.heroUrl} alt={currentProject.alt} width={1920} height={1080} className="w-full h-full object-cover img-container"/>
              ) : currentProject.heroType.startsWith("video/") ? (
                <video autoPlay loop className="w-full h-full object-cover video-container">
                  <source src={currentProject.heroUrl} type={currentProject.heroType}/>
                  Your browser does not support the video tag.
                </video>
              ) : null}
        </div>
        </section>
   
    
      
        <section className='flex flex-col gap-4 pb-4'>
          {currentProject.images.map((mediaItem, index) => (
               mediaItem.type === 'image' ? (
                 <Image key={index} src={mediaItem.url} alt={currentProject.title} width={1920} height={1080} className="img-container"></Image>
    
               ): mediaItem.type === 'file' ?(
              <video key={index} width={1920} height={1080} autoPlay loop className='video-container'>
                <source src={mediaItem.url} type='video/mp4'/>
              </video>
               ):null
             
    ))}
    
        </section>
                <footer className='w-full overflow-hidden flex justify-between p-4 mt-2 box-border content-center'>
              
                    {previousProject ? (
                      <Link href={`/project-page/${previous.slug}`} className='circular-nav flex gap-1 content-center hover:text-[--teal]'>
                       <ArrowLeftIcon className='size-4 self-center'/> Previous 
                      </Link>
                    ):<div/>}
                     <Link href="#" className=" top flex content-center gap-2 hover:text-[--midnight]">
            <ArrowUpIcon className="size-4 self-center"/> <span className='self-center top'>Top</span>
            </Link>
                    {nextProject ?(
                      <Link href={`/project-page/${next.slug}`} className='circular-nav flex gap-1 content-center hover:text-[--teal]'>
                        Next <ArrowRightIcon className='size-4 self-center'/>
                     </Link>

                    ): <div/>}

                </footer>
      
        </section>


    )
}

