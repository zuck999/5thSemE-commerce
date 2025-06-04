import { Button } from '../components/ui/button.tsx'
import { Input } from '../components/ui/input.tsx'
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../store/useUserStore.ts";

function LoginPage() {
	const { login, loading } = useUserStore();

    const navigate = useNavigate()

    const [input , setInput] = useState({
        email:"",
        password:""
    });

    function changeEventHandler(e:ChangeEvent<HTMLInputElement>){
        setInput({...input , [e.target.name]:e.target.value});
    }

    async function logoutHandler(e:ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        login(input.email, input.password,navigate)
    }

  return (
    <>
      <div className='flex items-center justify-center w-[100vw] h-[100vh] overflow-y-hidden py-auto fixed'>
        <form 
          onSubmit={logoutHandler} 
          className='mr-5 shadow-xl/30 shadow-red-50/50 border border-zinc-800 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[31vw] max-w-md flex flex-col gap-5 p-4 sm:p-6 md:p-8 rounded-lg'
        >
          <div>
            <h1 className='text-center font-bold text-lg sm:text-xl md:text-2xl'>Login</h1>
            <p className='text-center text-xs sm:text-sm px-4 sm:px-8 md:px-14 text-gray-400'>
              Enter your email below to login to your account
            </p>
          </div>

          <div>
            <span className="py-2 font-sm">Email</span>
            <Input 
              type="email" 
              value={input.email} 
              name="email" 
              onChange={changeEventHandler} 
              className="focus-visible:ring-1 border border-zinc-800"
            />
          </div>

          <div>
            <span className="py-2 font-sm">Password</span>
            <Input 
              type="password" 
              value={input.password} 
              name='password' 
              onChange={changeEventHandler} 
              className="focus-visible:ring-1 border border-zinc-800"
            />
          </div>

          {
            loading ? (
              <Button className="bg-white text-black hover:bg-gray-100">
                <Loader2 className="animate-spin"/>
              </Button>
            ) : (
              <Button 
                className="bg-white text-black hover:bg-gray-100" 
                type="submit"
              >
                Submit
              </Button>
            )
          }

          <span className='text-[13px] sm:text-[15px] font-light flex justify-center'>
            already has an account? 
            <Link className='text-gray-100 underline mx-2' to="/signup">signup</Link>
          </span>
        </form>
      </div>
    </>
  )
}

export default LoginPage