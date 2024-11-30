type LoginResponse = {
    message: string;
    token:string;
    key: string;
    user:string;
  };
  
  type LoginUserParams = {
    email: string;
    password: string;
  };

export const onLoginSubmit = async (
    { email, password }: LoginUserParams,
    setIsLoading: (isLoading: boolean) => void,
    navigate: (path: string) => void
): Promise<void> => {
    setIsLoading(true)
    const response = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data: LoginResponse = await response.json();

    if (response.ok) {
      console.log(data)
      localStorage.setItem("userToken", data.token)
      setIsLoading(false)
      navigate(`/${data.user}`)
    }

    if (response.status === 401) {
      alert(data.message);
      setIsLoading(false)
    }
  };