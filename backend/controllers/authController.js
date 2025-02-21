import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
  
//   const newUser = new User({ name, email, password: hashedPassword });
//   await newUser.save();
  
//   res.status(201).json({ message: 'User registered successfully' });
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
// };

// const generateToken = (user) => {
//   return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
// };

// // **Socket Connection**
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("register", async (userData, callback) => {
//     const { name, email, password } = userData;
//     const existingUser = User.find((u) => u.email === email);
//     if (existingUser) return callback({ error: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };
//     users.push(newUser);
    
//     io.emit("user_registered", { name, email });
//     callback({ success: "User registered successfully" });
//   });

//   socket.on("login", async (loginData, callback) => {
//     const { email, password } = loginData;
//     const user = users.find((u) => u.email === email);
//     if (!user) return callback({ error: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return callback({ error: "Invalid credentials" });

//     const token = generateToken(user);
//     callback({ token, user: { id: user.id, name: user.name, email: user.email } });

//     io.emit("user_logged_in", { name: user.name, email: user.email });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });





export const register = async (req, res) => {
  console.log('register route hit  name is',req.body.name)
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully ,Proceed to login" });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message }); // Handle errors
  }
};


export const login = async (req, res) => {
  console.log('Login route hit, email:', req.body.email);

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set token as an HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure:false,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    };

    // Only set the `secure` flag if in production (when HTTPS is required)
    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    res.cookie("authToken", token, cookieOptions);

    // Send response with token and user info (excluding password)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};
export const checkAuth = (req, res) => {
  const authToken = req.cookies.authToken;
  console.log('authtoken in checkauthe controller',authToken);
  // If there's no token, respond with 401 Unauthorized
  if (!authToken) {
    
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // Verify and decode the token using the JWT secret
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    
    // If token is valid, return user info (you can expand this as needed)
    res.status(200).json({
      user: { 
        id: decoded.id, 
        // You can include additional information here (e.g., name, email) 
      }
    });
  } catch (error) {
    // Handle token errors (expired or invalid)
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = (req, res) => {
  console.log('inside logout controller');
  
  // In development, don't require secure cookies
  const cookieOptions = {
    httpOnly: true,
    sameSite: "Strict",
    secure:false
  };

  // Only set `secure` flag to true in production environment
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.clearCookie("authToken",cookieOptions);
  res.json({ message: "Logged out successfully" });
};
