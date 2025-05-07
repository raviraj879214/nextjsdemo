// app/hooks/useSignout.js
"use client";
import { useRouter } from "next/navigation";

export function useSignout() {
  const router = useRouter();

  const signout = () => {
    // You can add clearing tokens, localStorage, etc.
    alert("Signing out...");
    localStorage.setItem("token","");
    localStorage.setItem("Rolename","");
    localStorage.setItem("UserID","");
    // router.push("/");
    window.location.href = "/";
  };

  return signout;
}
