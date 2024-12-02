import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import { LoginSchema } from '@/schema/LoginSchema'
import Github from './components/Github'
import Google from './components/Google'
import { onLoginSubmit } from '@/api/LoginUser'




const SignIn: React.FC = () => {


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authLoading, setAuthLoading] = useState<boolean>(false)



    const [show, setShow] = useState(false);
    const navigate = useNavigate();




    const togglePassword = () => {
        setShow(!show);
    }

    const loginForm = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });




    const handleSubmitClick = loginForm.handleSubmit(async (data) => {
        const { email, password } = data;

        await onLoginSubmit(
            { email, password },
            setIsLoading,
            navigate
        );
    });

    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const query = window.location.search
        const url = new URLSearchParams(query)
        const codeP = url.get("code")

        if (codeP && (localStorage.getItem("accessToken") === null)) {
            const getAccessToken = async () => {
                setAuthLoading(true)
                try {

                    const response = await fetch(`${import.meta.env.VITE_API}/auth/acc?code=` + codeP, {
                        method: "GET"
                    })
                    const data = await response.json()

                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token)
                        setRerender(!rerender)

                        try {
                            const response = await fetch(`${import.meta.env.VITE_API}/auth/getUser`, {
                                method: "GET",
                                headers: {
                                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                                }
                            })
                            const data = await response.json()
                            setAuthLoading(false)

                            if (data.message === "User registered successfully" || data.message === "User signed in" || data.message === "User added with Github Sucessfully!") {
                                localStorage.setItem("userToken", data.userId)
                                navigate(`/${data.user}`)
                            }
                        } catch (error) {
                            console.log(error)
                        }

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getAccessToken()
        }
    }, [navigate, rerender])
    return (
        <div className="sm:py-8 md:py-[3.75rem]">

            <div className=" sm:w-[408px] sm:px-6 sm:py-8 ">
                <div className="space-y-9 w-[22rem] sm:w-[360px]  mx-auto">
                    {/* <Link to={"/"}>
            <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
          </Link> */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl flex justify-between">Sign in</h1>
                            <div className=' flex justify-between'>
                                <p className="text-muted-foreground font-medium text-sm ">
                                    Don't have an account yet?{" "}
                                    <Link to={"/signup"}>
                                        <span className="text-foreground">Sign up</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-4">
                                <Form {...loginForm}>
                                    <form className="space-y-4" >
                                        <FormField
                                            control={loginForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex justify-between">Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="email" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex justify-between">
                                                        Password{" "}
                                                        <Link to={"/forgotPassword"} className="text-muted-foreground font-medium text-sm">
                                                            Forgot Password?
                                                        </Link>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input {...field} type={show ? "text" : "password"} className="w-full" />
                                                            {
                                                                show ?
                                                                    <EyeOff onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                                    :
                                                                    <Eye onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                            }

                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div>
                                            <div className=' flex justify-between'>
                                                <div className="space-x-2">
                                                    <input type="checkbox" />
                                                    <label
                                                        htmlFor="terms"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Keep me signed in
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </Form>
                            </div>

                            <div>
                                {isLoading ?
                                    <Button className="w-full py-[0.625rem] px-[0.875rem]">
                                        <Loader className="h-6 animate-spin" />
                                    </Button>
                                    :
                                    <Button className="w-full py-[0.625rem] px-[0.875rem]" onClick={handleSubmitClick}>
                                        Sign In
                                    </Button>
                                }
                            </div>
                            <div className="flex items-center justify-center w-full">
                                <hr className="flex-1 border-t" />
                                <span className="mx-[0.625rem] text-muted-foreground">or</span>
                                <hr className="flex-1 border-t" />
                            </div>
                            <Google />
                            {authLoading ?
                                <Button className="w-full py-[0.625rem] px-[0.875rem]">
                                    <Loader className="h-6 animate-spin" />
                                </Button>
                                : <Github />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn