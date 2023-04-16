import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

interface FormState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
}

const initialFormState: FormState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
};

const Login = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";

    try {
      setLoginStatus(true);
      const authenticatedUser = await signInWithEmailAndPassword(auth, formState.email, formState.password);
      login(authenticatedUser)
      setLoginStatus(false)
      navigate("/");
    } catch (error: any) {
      setLoginStatus(false)
      if (error?.code === "auth/internal-error") {
        if (!formState.email) {
          emailError = "Email cannot be empty";
        }

        if (!formState.password) {
          passwordError = "Password cannot be empty";
        }
      }


      if (error?.code === "auth/invalid-email" || error?.code === "auth/user-not-found") {
        emailError = "Invalid Email";
      }

      if (error?.code === "auth/invalid-password" || error?.code === "auth/wrong-password") {
        passwordError = "Wrong Password"
      }
      
      setFormState({
        ...formState,
        emailError,
        passwordError
      })
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
      <article className="w-4/5 md:w-96 h-[500px] shadow-nav-shadow bg-sidebar-nav-color rounded-lg px-8">
        <h1 className="font-noto text-2xl font-semibold mt-4 mb-4">Log In</h1>
        <div className='w-full h-0.5 bg-sidebar-color mt-8' />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className='flex justify-between'>
            <label htmlFor="email" className=''>Email</label>
            { formState.emailError && <span className='text-red-500'>{formState.emailError}</span> }
          </div>
          <input type="email" name="email" value={formState.email}
            onChange={handleInputChange}
            className="bg-sidebar-color outline-none rounded-lg py-3 px-4"
          />
          <div className='flex justify-between'>
            <label htmlFor="password" className=''>Password</label>
            { formState.passwordError && <span className='text-red-500'>{formState.passwordError}</span> }
          </div>
          <input type="password" name="password" value={formState.password}
            onChange={handleInputChange}
            className="bg-sidebar-color outline-none rounded-lg py-3 px-4"
          />
          <button className="w-full bg-login-button shadow-md mt-4 rounded-lg py-3 disabled:opacity-50"
            disabled={loginStatus ? true : false}
          >
            Log In
          </button>
        </form>
        <div className='w-full h-0.5 bg-sidebar-color mt-8' />
        <div className='text-center mt-2'>
          <h4>Don't have an account?</h4>
          <Link to="/signup" className='text-login-button font-medium text-base'>
            Sign up
          </Link>
        </div>
      </article>
    </section>
  )
}

export default Login