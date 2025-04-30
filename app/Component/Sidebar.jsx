"use client"
import Link from "next/link";
import Rolename from "./Hooks/Rolename";






function Sidebar(){
const rolenameeee = Rolename();

    return(<>
    
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-5 space-y-6">
        <h1 className="text-3xl font-bold">{rolenameeee}</h1>
        <ul>
        {rolenameeee === 'admin' ? (
            <>
              <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">Admin Home</a></li>
              <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">Admin Profile</a></li>
              
              <li>
              <Link href={"/manage-category"} className="block py-2 px-4 hover:bg-indigo-600">Manage Category</Link>
              
              </li>
              <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">Add Products</a></li>
              <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">Logout</a></li>
            </>
        ) : (
          <>
            <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">User Home</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">User Profile</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">User Settings</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-indigo-600">Logout</a></li>
          </>
        )}
        </ul>
      </div>

    
    </div>



    </>);
}
export default Sidebar;