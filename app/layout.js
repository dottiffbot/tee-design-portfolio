import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";


export const metadata = {
  title: "Tee's Web",
  description: "hahahaahaha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="style" href="https://use.typekit.net/jmt6wra.css"/>
      </head>
      <body>
        <Header/>
        <section className="pt-12">
    
        {children}
 
        </section>
      </body>
    </html>
  );
}
