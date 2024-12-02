import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const ResendEmailSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
})

const Email = () => {


    const form = useForm<z.infer<typeof ResendEmailSchema>>({
        resolver: zodResolver(ResendEmailSchema),
        defaultValues: {
            email: "",
        },
    })

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const codeParam = params.get("code");




    const [isExpired, setIsExpired] = useState(false)
    const [isVerified, setIsVerified] = useState(false);
    // const [isInvalid, setIsInvalid] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const response = await fetch(`${import.meta.env.VITE_API}/auth/emailVerify/${codeParam}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            const responseData = await response.json();
            if (responseData.message === "User verified successfully.") {
                setIsVerified(true);
            }
            if (responseData.message === "jwt expired") {
                setIsExpired(true)
            }

        }
        verifyEmail()
    }, [codeParam])


    const handleResend = async () => {
        const email = form.getValues("email")
        const response = await fetch(`${import.meta.env.VITE_API}/auth/resendEmail`,
            {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        const responseData = await response.json();
        if (responseData.msg === "Email send") {
            setResendSuccess(true)
            setIsExpired(false)
        }
    }
    return (
        <>
            {isVerified &&
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
                        {/* <div>
                            <img src="/" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </div> */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-semibold">Account verified</h1>
                                <p className="font-medium text-sm text-muted-foreground">Congratulations! your email has been verified</p>
                            </div>
                            <div>
                                <Button className="w-full" onClick={() => navigate("/signin")}>Login Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {isExpired &&
                <div className="w-[360px] mx-auto py-8 md:py-[3.75rem] space-y-9">
                    {/* <div>
                        <Link to={"/"}>
                            <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </Link>
                    </div> */}
                    <div className="space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleResend)} className="space-y-4">
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input {...field} type="text" autoComplete='new-password' className="w-full" />

                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <div>
                                    <Button type="submit" className="w-full">Resend Link</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            }


            {resendSuccess &&
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-semibold">Check your email</h1>
                                <p className="text-muted-foreground text-sm font-medium">We've resent the email verification link to email.</p>
                            </div>
                            <div className="space-y-3 flex flex-col">
                                <Button className="py-[0.625rem] px-[0.875rem]" asChild>
                                    <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">Open email application</a>
                                </Button>
                                <Button className="py-[0.625rem] px-[0.875rem]" variant={"outline"} asChild>
                                    <Link to={"/signin"}>Back to Sign in</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
};

export default Email;