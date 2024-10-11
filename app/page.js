import Image from "next/image";
import Link from "next/link.js";
import  client  from './lib/sanity.js'
import Footer from "./components/Footer.js";
export const revalidate = 10;

async function getData(){
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
    "mediaType": media.asset->mimeType
  }`


const data = await client.fetch(query);
return data;

};

export default async function Home() {
  const data = await getData();

  const sortedData = data.sort((a, b) => a.number - b.number);

  const toolColors = {
    "Figma": "#FEA3A0",
    "Indesign": "#FFC3E4",
    "Illustrator": "#FEA3A0",
    "Blender": "#CBFF28",
    "Cinema 4D":'#CBFF28',
    "AfterEffects": '#6BCEB1',
    "Code": '#5800FF',
  };
  return (
<section className="w-full p-8">
  <h1 className="border-b border-black border-dashed py-4">Selected Projects</h1>
  <div className="py-6 flex flex-col gap-6 w-full">
    {sortedData.map((project) =>(
      <div key={project.id} className="flex flex-col lg:flex-row justify-between w-full border-b border-black py-4 gap-5">
        <section className="flex flex-col gap-6 lg:w-1/3 w-full">
        <h4 className="text-xs">[{project.number}.]</h4>
        <h2>{project.title}</h2>
        <h3>{project.heading}</h3>
          <div className="flex flex-wrap flex-row lg:gap-6 gap-2">
           {project.tools.map((toolItem, index) => (
            <div key={toolItem}className="flex items-center justify-center place-items-center">
            <span className="rounded-full border border-black  blur-[1px] p-[0.25em] bg-[--cream]" style={{ backgroundColor: toolColors[toolItem] || "#ccc" }}></span>
            <span className="tool-tag">{toolItem}</span>
            </div>
          ))}
          </div>

        <Link href={`/project-page/${project.currentSlug}`} className="more-btn w-1/4">More</Link> 
        </section>
        <section className="lg:w-[50vw] w-full">
        {project.mediaType.startsWith("image/") ? (
                <Image src={project.mediaUrl} alt={project.alt} width={1920} height={1080}  className="img-container"/>
              ) : project.mediaType.startsWith("video/") ? (
                <video autoPlay loop className="video-container">
                  <source src={project.mediaUrl} type={project.mediaType}  />
                  Your browser does not support the video tag.
                </video>
              ) : null}
        </section>

        </div>

    ))}

  </div>
  {/* <h1 className="border-b border-black border-dashed py-4"> Additional Projects</h1> */}
  <Footer></Footer>
</section>
  );
}
