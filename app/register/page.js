"use client"
import React, { useState ,useEffect} from 'react';
import { app } from '../../firebaseConfig';
import { getAuth, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,

} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Footer from '../Components/Footer';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const auth = getAuth();
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();




  const SignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        // store token inside session storage 
        sessionStorage.setItem('Token',response.user.accessToken)
        console.log(response.user.accessToken)

        router.push('/');
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
      });
  }
 
  const signUpWithGoogle = ()=>{
   signInWithPopup(auth, googleProvider)
   .then((response)=>{
    const user = response.user;
    sessionStorage.setItem('Token',user.accessToken)
    console.log(response.user.accessToken)
    console.log('User signed up with Google:', user);
    router.push('/');
   })
   .catch((error) => {
    console.error("Error signing up with Google:", error.message);
    setError(error.message); // Show error message to user
  });
  }

  const signUpWithGithub = ()=>{
    
    signInWithPopup(auth, githubProvider)
    .then((response)=>{
     const user = response.user;
     sessionStorage.setItem('Token',user.accessToken)
     console.log(user.accessToken)
     console.log('User signed up with Github:', user);
     router.push('/');
    })
    .catch((error) => {
      console.error("Error signing up with Github", error.message);
      setError(error.message); // Show error message to user
    });
  }


  useEffect(()=>{
    let token = sessionStorage.getItem('Token')

    if(token){
      router.push('/')
    }
   
  },[])



  return (
    <div className="flex-col justify-center columns items-center min-h-screen bg-gray-100">
      <div className=" p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-black text-center mb-6">Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2   text-gray-600 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4  text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={SignUp}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Register
        </button>



        <button
        onClick={signUpWithGoogle}
           className="w-full mb-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">Sign Up With Google</button>
        <button 
        onClick={signUpWithGithub}
         className="w-full mb-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">Sign Up With GitHub</button>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Register;