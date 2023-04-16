import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useEmailPasswordSignUp from "../hooks/useEmailPasswordSignUp";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import useUsernameAvailability from '../hooks/useUsernameAvailability';

interface FormState {
  username: string;
  email: string;
  password: string;
  usernameError: string;
  emailError: string;
  passwordError: string;
}

const initialFormState: FormState = {
  username: "",
  email: "",
  password: "",
  usernameError: "",
  emailError: "",
  passwordError: "",
};

const Signup = () => {

  const [formState, setFormState] = useState<FormState>(initialFormState);

  const { signUpState, signUp } = useEmailPasswordSignUp();
  const { checkUsername } = useUsernameAvailability();

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let usernameError = "";
    let emailError = "";
    let passwordError = "";

    if (!formState.username) {
      usernameError = "Username is required";
    } else {
      const isTaken = await checkUsername(formState.username)
      
      if (isTaken) {
        usernameError = "Username in use"
      }
      
    }

    if (!formState.email) {
      emailError = "Email is required";
    }

    if (!formState.password) {
      passwordError = "Password is required";
    }

    if (usernameError || emailError || passwordError) {
      setFormState({
        ...formState,
        usernameError,
        emailError,
        passwordError,
      });
      return;
    }
    
    try {
      await signUp(formState.email, formState.password, formState.username);
      
      const authenticatedUser = await signInWithEmailAndPassword(auth, formState.email, formState.password);
      login(authenticatedUser)
      navigate("/");
    } catch (error: any) {
      if (error?.code === "auth/email-already-in-use") {
        emailError = "Email already in use";
      }
      if (error?.code === "auth/weak-password") {
        passwordError = "Password too short"  
      }

      setFormState({
        ...formState,
        usernameError,
        emailError,
        passwordError,
      });
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section className="w-screen h-screen bg-sidebar-color grid place-items-center text-white">
      <article className="w-10/12 md:w-96 h-[620px] shadow-nav-shadow bg-sidebar-nav-color rounded-lg px-8">
        <h1 className="font-noto text-2xl font-semibold mt-4 mb-4">Sign up</h1>
        <div className='w-full h-0.5 bg-sidebar-color mt-6' />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2 mb-3">
          <div className='flex justify-between'>
            <label htmlFor="username" className=''>Username</label>
            {formState.usernameError && <span className='text-red-500'>{ formState.usernameError }</span> }
          </div>
          <input type="text" name="username" value={formState.username}
            onChange={handleInputChange}
            className="bg-sidebar-color outline-none rounded-lg py-3 px-4"
          />
          <div className='flex justify-between'>
            <label htmlFor="username" className=''>Email</label>
            { formState.emailError && <span className='text-red-500'>{formState.emailError}</span> }
          </div>
          <input type="email" name="email" value={formState.email}
            onChange={handleInputChange}
            className="bg-sidebar-color outline-none rounded-lg py-3 px-4"
          />
          <div className='flex justify-between'>
            <label htmlFor="username" className=''>Password</label>
            { formState.passwordError && <span className='text-red-500'>{formState.passwordError}</span> }
          </div>
          <input type="password" name="password" value={formState.password}
            onChange={handleInputChange}
            className="bg-sidebar-color outline-none rounded-lg py-3 px-4"
          />
          <button className="w-full bg-login-button shadow-md mt-4 rounded-lg py-3 px-8 text-white focus:outline-none disabled:opacity-50"
            disabled={signUpState.isLoading ? true : false}>
            Sign up
          </button>
        </form>
        <div className='w-full h-0.5 bg-sidebar-color mt-8' />
        <div className='text-center mt-2'>
          <h4>Already have an account?</h4>
          <Link to="/login" className='text-login-button font-medium text-base'>
            Log in
          </Link>
        </div>
      </article>
    </section>
  )
}

export default Signup