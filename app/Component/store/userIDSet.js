import { create } from 'zustand';






const useUserIDStore = create((set) => ({
  userID: null,
  setUserID: (id) => set({ userID: id }),
}));

export default useUserIDStore;
