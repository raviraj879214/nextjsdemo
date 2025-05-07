import OrderUserDetails from "../../Component/OrderUserDetails";
import Sidebar from "../../Component/Sidebar";




function PageOrderDetails() {



    return (<>
     
        <div className="flex min-h-screen">
            <aside className=" text-white">
                <Sidebar />
            </aside>
            <main className="flex-1 bg-gray-100 p-6">
                <OrderUserDetails></OrderUserDetails>
            </main>
        </div>
    </>);
}
export default PageOrderDetails;