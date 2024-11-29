import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterSchema } from '@/schema/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
// import Github from '../component/Github'
// import Google from '../component/Google'
// import { onRegisterSubmit } from '@/api/RegisterUser'

const SignUp: React.FC = () => {

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()



  const registrationForm = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const togglePassword = () => {
    setShow(!show);
  }

  const [isRegistered, setIsRegistered] = useState(false);


 


  const email = registrationForm.getValues("email");

  const handleSubmitClick = registrationForm.handleSubmit(async (data) => {
    const { fullName, email, password } = data;

    console.log(fullName,email,password)
    navigate("")
    setIsRegistered(false)
    setIsLoading(false)

    // await onRegisterSubmit(
    //   { fullName, email, password },
    //   setIsLoading,
    //   setIsRegistered,
    //   navigate
    // );
  });


  return (
    <>
      {!isRegistered ? <div className="space-y-9 w-[360px] mx-auto py-8 md:py-[3.75rem]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-semibold text-2xl flex justify-between">Sign Up</h1>
            <div className=' flex justify-between'>
              <p className="text-muted-foreground font-medium text-sm">
                Already have an account?{" "}
                <Link to={"/signin"}>
                  <span className="text-foreground">Sign in</span>
                </Link>
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <Form {...registrationForm}>
                <form
                  className="space-y-4"
                >
                  <FormField
                    control={registrationForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between">Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage className="flex justify-between" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between">Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage className="flex justify-between" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registrationForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between">Password </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} type={show ? "text" : "password"} autoComplete='new-password' className="w-full" />
                            {
                              show ?
                                <EyeOff onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                :
                                <Eye onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                            }
                          </div>
                        </FormControl >
                        <FormMessage className="flex justify-between" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            <div className="space-y-5">
              <div>
                {isLoading ?
                  <Button className="w-full py-[0.625rem] px-[0.875rem]">
                    <Loader className="h-6 animate-spin" />
                  </Button> :
                  <Button className="w-full py-[0.625rem] px-[0.875rem]"
                    onClick={handleSubmitClick}
                  >
                    Register
                  </Button>}
              </div>
              <div className="text-[0.875rem] leading-[1.3125rem] font-normal">
                <p className="text-muted-foreground">
                  By signing up, you agree to Radian's{" "}
                  <span className="text-foreground">Terms of Service</span> and{" "}
                  <span className="text-foreground">Privacy Policy</span>
                </p>
              </div>
              <div className="flex items-center justify-center w-full">
                <hr className="flex-1 border-t" />
                <span className="mx-[0.625rem] text-muted-foreground">or</span>
                <hr className="flex-1 border-t" />
              </div>
              {/* <div className="">
                <Google />
              </div>
              <div className="">
                <Github />
              </div> */}
            </div>
          </div>
        </div>
      </div> :
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold">Check your email</h1>
                <p className="text-muted-foreground text-sm font-medium">We've sent the email verification link to <span className="font-semibold">{email}</span></p>
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
        </div>}
    </>
  )
}

export default SignUp