import Image from "next/image";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Banner from "./Component/Banner";
import ProductHome from "./Component/ProductHome";
import HomeGeneral from "./Component/HomeGeneral";




export default function Home() {




  return (
    <>
     
       <Banner></Banner>

        <ProductHome></ProductHome>

        <HomeGeneral></HomeGeneral>

      
      </>
  );
}
