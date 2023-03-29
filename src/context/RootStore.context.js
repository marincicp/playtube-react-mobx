import { createContext, useContext } from "react";
import rootStore from "../stores/RootStore";

const rootStoreContext = createContext();

export function RootStoreContextProvider({ children }) {
  const { store, channelStore } = rootStore;

  const storeToShare = { store, channelStore };

  return (
    <rootStoreContext.Provider value={storeToShare}>
      {children}
    </rootStoreContext.Provider>
  );
}

export const useStores = () => {
  return useContext(rootStoreContext);
};
