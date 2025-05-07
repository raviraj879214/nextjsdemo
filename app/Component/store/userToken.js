
import { create } from 'zustand'




const userToken = create((set) => ({
tokens :null, 
role : null,
setTokens:((tokens)=>set({tokens})),
setRole:((role)=>set({role}))
}))

export default userToken
