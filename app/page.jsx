import Header from "@/components/home/header";
import Product from "@/components/home/product";
import About from "./about/page";
import Services from "./services/page";
import Contact from "./contact/page";

export default function Home() {
  return (
    <>
      <Product/>
      <About/>
      <Services/>
      <Contact/>
    </>
  )
}
