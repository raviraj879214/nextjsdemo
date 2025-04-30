import { create } from "zustand";


const DataID =create((set)=>({

    ID : null,
    SetID:((ID)=>set({ID}))

}))

export default DataID;