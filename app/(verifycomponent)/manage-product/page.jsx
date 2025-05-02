import ManageProduct from "../../Component/Products/ManageProduct";
import Sidebar from "../../Component/Sidebar";


function PageManageProduct(){



    return(<>


    
   
 <div className="flex min-h-screen">
        <aside className=" text-white">
            <Sidebar />
        </aside>
        <main className="flex-1 bg-gray-100 p-6">
        <ManageProduct></ManageProduct>
        </main>
        </div>


    </>);
}

export default PageManageProduct;