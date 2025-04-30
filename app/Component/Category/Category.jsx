import Sidebar from "../Sidebar";
import CategoryTable from "../Category/CategoryTable";
import CategoryAdd from "../Category/CategoryAdd";






function Category(){



    return(<>


        <div className="flex min-h-screen">
        <aside className=" text-white">
            <Sidebar />
        </aside>
        <main className="flex-1 bg-gray-100 p-6">
            <CategoryAdd></CategoryAdd>
        </main>
        </div>


        
    </>);
}
export default Category;