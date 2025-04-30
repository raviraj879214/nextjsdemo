"use client"
import { useRouter } from "next/navigation";
import userToken from "../store/userToken";
import { useEffect } from "react";


function Verify(){
const router = useRouter();
const {setRole}= userToken();




const handleVerify = async (token) => {
  console.log("handle verify token : " + token );

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      if (response.status === 200 && data.valid) {
        console.log('✅ Token is valid.');
        console.log('👤 User info:', data.user);
        console.log('Role anme', data.user.role);
        localStorage.setItem("Rolename",data.user.role);


        // console.log('Role Global', role);
        const userId = data.user.id;
        const userName = data.user.name;
        const userEmail = data.user.email;

        // router.push("/user-dashboard");

      } 
      else
      {
        router.push("/login");
        console.log('❌ Token verification failed:', data.message);
      }
    } else {
      const text = await response.text();
      console.log('Unexpected non-JSON response:', text);
    }
  } catch (error) {
    console.log('Error verifying token:', error);
  }
};







   
    return {handleVerify};
}

export default Verify;