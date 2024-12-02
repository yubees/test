import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }).min(1, { message: "Email is required" }),
})



const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const email = form.getValues("email")

    const onSubmit = async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/auth/forgotPassword`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json"
            }
        });
       
        const responseData = await response.json();
        if (response.ok) {
            setEmailSent(true);
            form.reset();
        } else {
            alert(responseData.message)
        }
    };
    return (
        <>
            {!emailSent ?
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]" >

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="font-semibold text-2xl">Reset password</h1>
                                <p className="text-muted-foreground text-sm font-medium">Enter the email address you registered with and we'll send you the reset instructions</p>
                            </div>
                            <div className="space-y-[0.375rem]">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className=" flex justify-between">Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="email" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <div>
                                            <Button type="submit" className="w-full">Send Reset Instructions</Button>
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div >
                </div >
                :
                <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold">Check your email</h1>
                            <p className="text-muted-foreground text-sm font-medium">We've sent the password reset instructions to <span className="font-semibold">{email}</span></p>
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
            }
        </>
    )
}

export default ForgotPassword