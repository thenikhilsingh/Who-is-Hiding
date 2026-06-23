import { Outlet } from "react-router-dom";
import useAxios from "./hooks/useAxios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

function App() {
  const api = useAxios();
  const [levels, setLevels] = useState([]);
 
  const getLevels = async () => {
    try {
      const response = await api.get("/api/game/levels");
      setLevels(response.data.levels);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <>
      <DataContext.Provider value={{ levels }}>
        <Outlet />
      </DataContext.Provider>
    </>
  );
}

export default App;
