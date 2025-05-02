"use client"
import Link from "next/link";
import Rolename from "./Hooks/Rolename";
import {useSignout} from "./Hooks/useSignout";





function Sidebar(){
const rolenameeee = Rolename();
const signout = useSignout();
    return(<>
    
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-5 space-y-6">
        <h1 className="text-3xl font-bold">{rolenameeee}</h1>
        <ul>
        {rolenameeee === 'admin' ? (
            <>
            
              
              <li>
              <Link href={"/manage-category"} className="block py-2 px-4 hover:bg-indigo-600">Manage Category</Link>
              
              </li>
              <li>
               
                <Link href={"/add-product"} className="block py-2 px-4 hover:bg-indigo-600">Add Product</Link>
                
                </li>
                <li>
               
               <Link href={"/manage-product"} className="block py-2 px-4 hover:bg-indigo-600">Manage Product</Link>
               
               </li>
              <li><a className="block py-2 px-4 hover:bg-indigo-600" onClick={signout}>Logout</a></li>
            </>
        ) : (
          <>
            <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">User Home</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">User Profile</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">User Settings</a></li>
            <li><a  className="block py-2 px-4 hover:bg-indigo-600" onClick={signout} >Logout</a></li>
          </>
        )}
        </ul>
      </div>

    
    </div>



    </>);
}
export default Sidebar;