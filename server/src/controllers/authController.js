import User from "../models/User.js";
import { generateToken, verifyToken } from "../utils/jwtUtils.js";

export const googleAuthCallback = (req, res) => {
  const { user } = req;
  const token = generateToken(user);

  const frontendUrl = process.env.FRONTEND_URL
  
  const userString = JSON.stringify(user)

  res.send(`
    <script>
      window.opener.postMessage({ token: "${token}", user: ${userString} }, "${frontendUrl}");
      window.close();
    </script>
  `)
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const logoutUser = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};

export const verifyUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);
    if (!user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
