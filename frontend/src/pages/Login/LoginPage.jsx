// import React from 'react';
// import { Box, Typography ,Stack,Paper} from '@mui/material';
// import Login from './Login';

// function LoginPage() {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh' ,
//     backgroundImage: 'url(https://images.unsplash.com/photo-1487900562037-056962ab1fb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDU0NzkyfHxlbnwwfHx8fHw%3D)', 

//     }}>
//       {/* First Box: Descriptive Information */}

//         <Box sx={{ 
//         flex: 1, 
//         // backgroundImage: 'url(https://images.unsplash.com/photo-1487900562037-056962ab1fb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDU0NzkyfHxlbnwwfHx8fHw%3D)', 
//         backgroundSize: 'cover', 
//         color: 'white', 
//         padding: '20px', 
//         display: 'flex', 
//         flexDirection: 'column', 
//         justifyContent: 'center' 
//       }}>
//               {/* <Stack>
//               <Paper sx={{backgroundColor:"transparent" ,padding:"20px" ,borderRadius:"10px", height:'80vh',textAlign:'center'}} elevation={3}>
//         <Typography variant="h4" gutterBottom>
//           Welcome to Our Service
//         </Typography>
//         <Typography variant="body1">
//           Please login to access your account and enjoy our features.
//         </Typography>
//         </Paper>
//       </Stack> */}
      
//       </Box>


//       {/* Second Box: Login Form */}
//       <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <Stack>
//       <Paper sx={{backgroundColor:"lavenderblush" ,padding:"20px" ,borderRadius:"10px", height:'80vh',textAlign:'center'}} elevation={3}>
//         <Login />
//         </Paper>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }


// export default LoginPage



import React,{useState,useEffect} from 'react';
import { Box, Stack, Paper ,Typography} from '@mui/material';
import Login from './Login';
import Register from '../Register/Register';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

     const [token, setToken] = useState(null);
   
     useEffect(() => {
       const authToken = Cookies.get("authToken"); // Fetch token from cookies
       setToken(authToken);
     }, []);
   
     
  const handleRegistserToggle = ()=> setIsRegister(prev =>!prev);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        height: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1487900562037-056962ab1fb0?w=1080&auto=format&fit=crop&q=80)',  
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1
        }
      }}
    >
      {/* Left Side (Can Add Some Branding or Intro) */}
      {/* Left Side (Branding / Intro Section) */}
<Box 
  sx={{ 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: "center",
    color: 'white',
    textAlign: "center",
    position: "relative",
    zIndex: 2,
    px: 4
  }}
>
  <Typography variant="h3" fontWeight="bold" gutterBottom>
    Stay Informed, Stay Ahead
  </Typography>
  
  <Typography variant="h6" sx={{ maxWidth: "500px", opacity: 0.8 }}>
    Get the latest news, insights, and trends from around the world, all in one place.  
    Sign in to personalize your news feed and never miss an update.
  </Typography>

  <Typography variant="body1" sx={{ mt: 2, fontStyle: "italic", opacity: 0.7 }}>
    "Empowering you with knowledge, one article at a time."
  </Typography>
</Box>

      {/* Right Side (Login Box) */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: "relative", zIndex: 2 }}>
        <Stack>
          <Paper 
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",  // Glassmorphism effect
              backdropFilter: "blur(10px)", 
              padding: "30px",
              borderRadius: "12px",
              height: 'auto',
              textAlign: 'center',
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
            }} 
            elevation={5}
          >
            {isRegister?  <Register  toggleRegister={handleRegistserToggle}/>:<Login/>}
            <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegister ? "Already have an account? Login Here" : "Don't have an account? Register Here"}
      </p>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginPage;
