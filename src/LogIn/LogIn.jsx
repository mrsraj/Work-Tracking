// // Importing necessary modules
// import React from 'react';
// import axios from 'axios';
// import './LogIn.css'; // Importing the CSS file for styling

// const Login = () => {
//     const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google Client ID

//     const onSuccess = async (credentialResponse) => {
//         try {
//             const response = await axios.post('http://your-backend-url.com/api/auth/google', {
//                 token: credentialResponse.credential,
//             });
//             console.log("Backend Response:", response.data);
//         } catch (error) {
//             console.error("Error logging in with Google:", error);
//         }
//     };

//     return (
//         <GoogleOAuthProvider clientId={clientId}>
//             <div className="login-container">
//                 <div className="login-box">
//                     <h2 className="login-title">Login</h2>
//                     <GoogleLogin
//                         onSuccess={onSuccess}
//                         onError={() => {
//                             console.log("Login Failed");
//                         }}
//                         useOneTap
//                     />
//                 </div>
//             </div>
//         </GoogleOAuthProvider>
//     );
// };

// export default Login;
