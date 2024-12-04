'use client';
import React from "react";
import Link from "next/link";
import { Drawer } from 'vaul'; 

  

export default function Header (){
    const [isOpen, setIsOpen] = React.useState(false);
    return(
        <div className="w-full flex justify-between p-8 fixed text-[--grey] header text-lg">
            <Link className="btn" href="/">Tee Topor</Link> 
    
            <Drawer.Root direction="top" open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger className="cursor-help">INFO</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50" />
        <Drawer.Content className="bg-[--metal] lg:h-[75vh] h-auto fixed top-0 left-0 right-0 border rounded-b-lg border-white cursor-row-resize">
          <div className="p-8 h-full w-full flex flex-col justify-between text-[--cream] gap-6 lg:gap-1">
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
          <h1 className="text-[--grey] text-sm">About</h1>
          <p className="lg:text-2xl text-md">
                 Tee Topor is a designer and full stack web developer, amongst other things. 
                They mix traditional graphic design sensibility with experimental techniques, specializing in 3D modelling and animation, creative coding and more recently, game design. Often they are lucky to collaborate with value aligned artists, designers and cultural institutions. 
          </p>
          <p className="lg:text-2xl text-md">
          Currently, Tee is based in New York and available for freelance work.  
          </p>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
          <h1 className="text-[--grey] text-sm">colophon</h1>
          <p className=" lg:text-2xl text-md">
          This website was made using next.js, Tailwind and Sanity.  The typefaces on this webpage are  <a href="https://ddott.net/font/aether-mono/" target="_blank">Aether Mono</a>  by DDOTT, <a href="https://charlotterohde.de/typefaces/" target="_blank"> New Edge 666</a> by Charlotte Rohde, and <a href="https://pangrampangram.com/products/editorial-new" target="_blank">Editorial New Italic</a> by Panagram Panagram.
          </p>
          </div>
        
          <div className="flex flex-row lg:w-1/4  w-1/2 justify-between">
            <Link href="https://docs.google.com/document/d/1C8xP_UCQQ4_rMs48h6RJXycYukevY_-JXDpGtxfvE8c/edit?usp=sharing" target="_blank" className="more-btn text-[--coffee]"><span className="button-text">CV</span></Link> 
            <Link href="" className="more-btn text-[--coffee]"><span className="button-text">Email</span></Link>
          </div>
          <span className="lg:w-[10vw] w-1/2 btn text-center cursor-pointer" onClick={() => setIsOpen(false)}>CLOSE</span>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>


        </div>

    )
}