import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { ChangeEvent } from "react";
import { useUserStore } from '@/store/useCartStore';

function SignupPage() {

    const navigate = useNavigate(); 
    	const { signup, loading } = useUserStore();



    const [input , setInput] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    function changeEventHandler(e:ChangeEvent<HTMLInputElement>){
        setInput({...input , [e.target.name]:e.target.value});
    }

    async function  signupHandler(e:ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        signup(input,navigate);
    }


  return (
    <>

<div className='flex items-center w-screen h-[80vh] justify-center'>
    <form onSubmit={signupHandler} className='shadow-xl/30 shadow-red-50/50  border border-zinc-800 w-[31vw] flex flex-col gap-5 p-8 rounded-lg'>

        <div>
            <h1 className='text-center font-bold text-2xl'>Signup</h1>
            <p className='text-center text-sm px-14 text-gray-400'> Enter your email below to sign </p>
        </div>

        <div >
        <span className="py-2 font-medium ">name</span>
        <Input type="text" value={input.name} name="name" onChange={changeEventHandler}  className="focus-visible:ring-1 border border-zinc-800 "/>
        </div>

        <div>
        <span className="py-2 font-medium">email</span>
        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} className="focus-visible:ring-1 border border-zinc-800"/>
        </div>


        <div>
        <span className="py-2 font-medium">password</span>
        <Input type="password" value={input.password} name='password' onChange={changeEventHandler} className="focus-visible:ring-1 border border-zinc-800"/>
        </div>

        <div>
        <span className="py-2 font-medium">confirm password</span>
        <Input type="password" value={input.confirmPassword} name='confirmPassword' onChange={changeEventHandler} className="focus-visible:ring-1 border border-zinc-800"/>
        </div>


        {
            loading ? (
                <Button className="bg-white text-black hover:bg-gray-100">
                    <Loader2 className='animate-spin'/>
                </Button>
            ):(
                <Button className='bg-white text-black hover:bg-gray-100' type="submit">Submit</Button>
            )
        }

        <span className='text-[15px] font-light flex justify-center'>already has an account? <Link className='text-gray-100 underline mx-2' to="/login">login</Link></span>

    </form>
</div>
      
    </>
  )
}

export default SignupPage;
