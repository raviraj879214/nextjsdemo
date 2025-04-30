"use client"

import { useEffect } from "react";
import Verify from "../Component/Hooks/Verfy";
import userToken from "../Component/store/userToken";
import { useRouter } from "next/navigation";


const Layout=({children})=>{
    const {handleVerify} = Verify();
    const {tokens,setTokens}= userToken();
    const router = useRouter();
  

    console.log("layout verify");
     useEffect(()=>{
         if(!tokens){
             if(typeof window !=='undefined'){
                 const tkn=localStorage.getItem('token')
                 if(tkn){
                    setTokens(tkn)
                    handleVerify(tkn)

                 }
                 else {
                    router.push("/login");
                 }
                 console.log('login')
                 
             }
         }
         else{
             console.log("user token")
             handleVerify(tokens)
         }
 
     },[tokens, setTokens, handleVerify])
    return(
        <div>
            {children}
        </div>
    )
}
export default Layout;