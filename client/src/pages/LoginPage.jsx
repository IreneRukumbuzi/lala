import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    window.open(
      "http://localhost:4000/api/auth/google",
      "_blank",
      "width=500,height=600"
    );

    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:4000") return;

      const { token, user } = event.data;
      if (token) {
        login(token, user);
        navigate("/");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="hidden md:block relative w-full md:w-1/2 h-64 md:h-full">
        <img
          src="/residences.jpg"
          className="w-full h-full object-cover brightness-50"
          alt="background"
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 left-[10%] right-[10%] text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-white my-4">
            Lala Rentals
          </h1>
          <p className="text-sm md:text-xl text-white font-normal">
            Welcome to Lala Rentals
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center h-screen p-10 relative">
        <div className="md:hidden absolute inset-0 w-full h-full">
          <img
            src="/residences.jpg"
            className="w-full h-full object-cover brightness-50"
            alt="background"
          />
        </div>

        <div className="w-full max-w-md bg-white bg-opacity-80 p-8 rounded-lg shadow-lg z-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-4 md:mb-6 text-center">
            Login
          </h2>
          <p className="text-sm md:text-gray-500 mb-4 md:mb-6 text-center">
            Welcome back! Please enter your details to continue.
          </p>
          <button
            className="flex items-center justify-center w-full bg-blue-500 py-3 border border-gray-300 rounded-lg shadow-sm text-white hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={handleGoogleLogin}
          >
            <GoogleOutlined className="text-2xl mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;