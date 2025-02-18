import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
