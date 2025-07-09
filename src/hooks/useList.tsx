import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";

const useList = () => {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error("useList doit être utilisé à l’intérieur de ListProvider");
  }

  return context;
};

export default useList;
