"use client"
import { useParams } from "next/navigation";
import Category from "../../Component/Category/Category";



function PageCategory(){

    const { id } = useParams();

    return(<>

            {id}

        <Category></Category>


    
    </>);
}
export default PageCategory;