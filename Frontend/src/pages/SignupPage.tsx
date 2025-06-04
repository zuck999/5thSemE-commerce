import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { ChangeEvent } from "react";
import { useUserStore } from '../store/useUserStore';

function SignupPage() {

    const navigate = useNavigate(); 
    const { signup, loading } = useUserStore();

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function changeEventHandler(e: ChangeEvent<HTMLInputElement>) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    async function signupHandler(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        signup(input, navigate);
    }

    return (
        <>
<div className="flex items-center justify-center min-h-screen w-full px-4 sm:px-8 md:px-16 lg:px-32 overflow-y-hidden">
    <form
        onSubmit={signupHandler}
        className="shadow-xl/30 shadow-red-50/50 border border-zinc-800 w-full max-w-sm sm:max-w-md lg:max-w-lg flex flex-col gap-5 p-6 sm:p-8 md:p-10 rounded-lg"
    >
        <div>
            <h1 className="text-center font-bold text-2xl sm:text-3xl">Signup</h1>
            <p className="text-center text-sm sm:text-base px-6 sm:px-8 md:px-14 text-gray-400">
                Enter your email below to sign
            </p>
        </div>

        <div>
            <span className="py-2 font-medium text-sm sm:text-base">Name</span>
            <Input
                type="text"
                value={input.name}
                name="name"
                onChange={changeEventHandler}
                className="focus-visible:ring-1 border border-zinc-800 w-full"
            />
        </div>

        <div>
            <span className="py-2 font-medium text-sm sm:text-base">Email</span>
            <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                className="focus-visible:ring-1 border border-zinc-800 w-full"
            />
        </div>

        <div>
            <span className="py-2 font-medium text-sm sm:text-base">Password</span>
            <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                className="focus-visible:ring-1 border border-zinc-800 w-full"
            />
        </div>

        <div>
            <span className="py-2 font-medium text-sm sm:text-base">Confirm Password</span>
            <Input
                type="password"
                value={input.confirmPassword}
                name="confirmPassword"
                onChange={changeEventHandler}
                className="focus-visible:ring-1 border border-zinc-800 w-full"
            />
        </div>

        {loading ? (
            <Button className="bg-white text-black hover:bg-gray-100 w-full">
                <Loader2 className="animate-spin" />
            </Button>
        ) : (
            <Button className="bg-white text-black hover:bg-gray-100 w-full" type="submit">
                Submit
            </Button>
        )}

        <span className="text-[15px] font-light flex justify-center">
            Already have an account?
            <Link className="text-gray-100 underline mx-2" to="/login">
                Login
            </Link>
        </span>
    </form>
</div>
        </>
    )
}

export default SignupPage;