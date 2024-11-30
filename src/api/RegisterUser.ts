type RegisterResponse = {
    msg: string;
    key: string;
  };
  
  type RegisterUserParams = {
    fullName: string;
    email: string;
    password: string;
  };
  
  export const onRegisterSubmit = async (
    { fullName, email, password }: RegisterUserParams,
    setIsLoading: (isLoading: boolean) => void,
    setIsRegistered: (isRegistered: boolean) => void,
    navigate: (path: string) => void
  ): Promise<void> => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ fullName, email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data: RegisterResponse = await response.json();
  
      if (response.status === 400) {
        alert(data.msg);
        setIsLoading(false);
        return;
      }
  
      if (data.msg === "Oauth User added Sucessfully!") {
        setIsLoading(false);
        navigate("/signin");
      } else if (data.msg === "User added Sucessfully!") {
        setIsLoading(false);
        setIsRegistered(true);
        console.log(data);
      } else {
        // Handle any unexpected message
        setIsLoading(false);
        console.error("Unexpected response message:", data.msg);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during registration:", error);
    }
  };