"use client"

import UpdateProduct from "../../../Component/Products/UpdateProduct";;

const { useParams } = require("next/navigation");





 function PageUpdateProduct(){

    const {id} = useParams();

    return(<>
    
        <UpdateProduct id = {id} />


    </>);
}

export default PageUpdateProduct;