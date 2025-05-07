"use client"
import { useParams } from "next/navigation";
import ProductDetails from "../../../Component/ProductDetails";



function Pageproductdetails(){


    const {producturl} = useParams();
    
    return(<>
    <ProductDetails producturl = {producturl}  ></ProductDetails>
    </>);
}


export default Pageproductdetails;