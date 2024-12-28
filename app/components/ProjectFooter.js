'use client'
import Link from 'next/link';
import { ArrowUpIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { gsap } from 'gsap';
import { useEffect } from "react";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function ProjectFooter({ previousProject, nextProject, topSelector = "body" }) {
    useEffect(() =>{
        const backtoTop = document.querySelector(".top-arrow");
        const scrollToTop = (e) => {
            e.preventDefault();
            gsap.to(window, {duration:1, scrollTo: {y:0, autoKill:true}});
        };
        backtoTop.addEventListener("click", scrollToTop);

        return() => {
            backtoTop.removeEventListener("click", scrollToTop);
        };

    }, []);


  return (
    <footer className='w-full overflow-hidden flex justify-between p-4 mt-2 box-border content-center'>
      {previousProject ? (
        <Link href={`/project-page/${previousProject.slug}`} className='circular-nav flex gap-1 content-center hover:text-[--teal]'>
          <ArrowLeftIcon className='size-4 self-center' /> Previous
        </Link>
      ) : (
        <div />
      )}
      <Link href="#" className="top-arrow flex content-center gap-2 hover:text-[--midnight]">
        <ArrowUpIcon className="size-4 self-center" /> <span className='self-center top'>Top</span>
      </Link>
      {nextProject ? (
        <Link href={`/project-page/${nextProject.slug}`} className='circular-nav flex gap-1 content-center hover:text-[--teal]'>
          Next <ArrowRightIcon className='size-4 self-center' />
        </Link>
      ) : (
        <div />
      )}
    </footer>
  );
}