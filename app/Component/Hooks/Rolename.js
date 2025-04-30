"use client";
import { useEffect, useState } from "react";



export default function Rolename() {
  const [roleName, setRoleName] = useState(null);

  useEffect(() => {
    const roname = localStorage.getItem("Rolename");
    console.log("Role name from localStorage:", roname);
    setRoleName(roname);
  }, []);

  return roleName;
}
