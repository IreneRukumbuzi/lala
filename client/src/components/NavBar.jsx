import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex p-6 justify-between items-center">
        <h1 className="text-xl font-bold text-red-500">Lala Rentals</h1>

        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-800 font-medium">
              {user.email}
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

