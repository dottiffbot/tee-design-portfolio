'use client';
import { useEffect } from "react";
import Link from "next/link"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpIcon} from '@heroicons/react/24/solid'
    
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP,ScrollToPlugin);
export default function Footer (){
    useEffect(() =>{
        const backtoTop = document.querySelector(".back");
        const scrollToTop = (e) => {
            e.preventDefault();
            gsap.to(window, {duration:1, scrollTo: {y:0, autoKill:true}});
        };
        backtoTop.addEventListener("click", scrollToTop);

        return() => {
            backtoTop.removeEventListener("click", scrollToTop);
        };

    }, []);

    return(
        <div className="p-2 text-sm copyright flex justify-between w-full">
            <div>
            © 2024 Tee Topor
            </div>
            <Link href="#" className="back flex content-center gap-2 hover:text-[--midnight]">
            <ArrowUpIcon className="size-4"/> <span>to the top</span>
            </Link>
        </div>
    )
}