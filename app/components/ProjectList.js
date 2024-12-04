// components/ProjectList.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Footer from "./Footer.js";

export default function ProjectList({ projects }) {
  // const [selectedFilter, setSelectedFilter] = useState('design');
    // const filteredProjects = projects.filter((project) =>
  //   project.types.includes(selectedFilter) 
  // );
  const pathname = usePathname();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('design');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    
    const filter = pathname === '/' ? 'design' : pathname.slice(1);
    setActiveFilter(filter);
    setFilteredProjects(
      projects.filter((project) => project.types.includes(filter))
    );
  }, [pathname, projects]);

  const handleFilterChange = (filterType) => {
    router.push(`/${filterType}`);
  };

    const toolColors = {
    "Figma": "#FEA3A0",
    "Indesign": "#FFC3E4",
    "Illustrator": "#FEA3A0",
    "Blender": "#CBFF28",
    "Cinema 4D":'#CBFF28',
    "AfterEffects": '#6BCEB1',
    "Code": '#5800FF',
    "Installation": '#FE80AA',
    "Electronics": '#ADF0B6',
    "Risograph": '#CAA1FF',

  };

  return (
    <section className="w-full p-8">
      <div className="border-b border-black border-dashed py-4 flex justify-between">
        <h1>Selected Projects</h1>
        <div className="flex gap-6">
          <p
            className={`uppercase cursor-pointer font-bold ${activeFilter === 'design' ? 'underline decoration[--grey] decoration-2 underline-offset-8 text-[--grey]' : ''}`}
            onClick={() => handleFilterChange('design')}
          >
            Design
          </p>
          <p
            className={`uppercase cursor-pointer font-bold ${activeFilter === 'art' ? 'underline decoration-[--grey] decoration-2 underline-offset-8 text-[--grey]' : ''}`}
            onClick={() => handleFilterChange('art')}
          >
            Art
          </p>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-6 w-full">
        {filteredProjects.map((project) => (
          <div key={project._id} className="flex flex-col lg:flex-row justify-between w-full border-b border-black py-4 gap-5">
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
              <Link href={`/project-page/${project.currentSlug}`} className="more-btn w-1/4">
                More
              </Link>
            </section>
            <section className="lg:w-[50vw] w-full">
              {project.mediaType.startsWith('image/') ? (
                <Image src={project.mediaUrl} alt={project.alt} width={1920} height={1080} className='img-container' />
              ) : (
                <video autoPlay loop className='video-container'>
                  <source src={project.mediaUrl} type={project.mediaType} />
                </video>
              )}
            </section>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </section>
  );
}