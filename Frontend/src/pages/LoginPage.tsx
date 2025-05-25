import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../store/useCartStore.ts";



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



    async function  logoutHandler(e:ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        login(input.email, input.password,navigate)
    }

  return (
    <>

<div className='flex items-center w-[100vw] h-[80vh] justify-center overflow-y-hidden'>
    <form onSubmit={logoutHandler} className='shadow-xl/30 shadow-red-50/50 border border-zinc-800 w-[31vw] flex flex-col gap-5 p-8 rounded-lg'>

        <div>
            <h1 className='text-center font-bold text-2xl'>Login</h1>
            <p className='text-center text-sm px-14 text-gray-400'>Enter your email below to login to your account</p>
        </div>

        <div>
        <span className="py-2 font-sm">Email</span>
        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} className="focus-visible:ring-1 border border-zinc-800"/>
        </div>

        <div>
        <span className="py-2 font-sm">Password</span>
        <Input type="password" value={input.password} name='password' onChange={changeEventHandler}  className="focus-visible:ring-1 border border-zinc-800"/>
        </div>

        {
            loading ? (
                <Button className="bg-white text-black hover:bg-gray-100">
                    <Loader2 className="animate-spin"/>
                </Button>
            ):(
                <Button className="bg-white text-black hover:bg-gray-100"  type="submit">Submit</Button>
            )
        }

        <span className='text-[15px] font-light flex justify-center'>already has an account? <Link className='text-gray-100 underline mx-2' to="/signup">signup</Link></span>

    </form>
</div>
      
    </>
  )

}

export default LoginPage

