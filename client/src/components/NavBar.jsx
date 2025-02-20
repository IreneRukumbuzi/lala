import { useAuth } from "../context/AuthContext";
import { Button } from "antd";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex p-6 justify-between items-center">
        <h1 className="text-xl font-bold text-red-500">Lala Rentals</h1>

        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-800 font-medium">
              {user.name}
            </span>

            <Button onClick={logout} type="default" danger>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
