import Image from "next/image";
import HeroSection from './_components/HeroSection'
import ProductSection from "./_components/ProductSection";
export default function Home() {   //if we put underscore before folder name i doesn' become a route it is called private folders can work like normal folders and not considered routing system
  return (
   <div>
   <HeroSection/>
   <ProductSection/>
   </div>
  );
}
