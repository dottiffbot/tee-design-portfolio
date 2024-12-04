import client  from './lib/sanity.js'
export const revalidate = 10;
import ProjectList from './components/ProjectList';

async function getData() {
  const query = `*[_type == 'project'] {
    title, 
    _id, 
    heading, 
    description, 
    tools,  
    number,
    alt,
    "currentSlug":slug.current,
    "mediaUrl" : media.asset->url,
    "mediaType": media.asset->mimeType,
    types
  }`;

  const data = await client.fetch(query);
  return data;


}

export default async function Home() {

  const data = await getData();
  const sortedData = data.sort((a, b) => a.number - b.number);

  return <ProjectList projects={sortedData} />;
}
