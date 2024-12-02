import { Button } from "@/components/ui/button";
import React from "react"



const githubOAuthURL = `${import.meta.env.VITE_githubOAuthURL}?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&scope=user:email`;


const Github: React.FC = () => {


    const loginWithGithub = () => {
        window.location.assign(githubOAuthURL)
        localStorage.removeItem("accessToken")
    }

    return (
        <div>

            <Button variant={"outline"} className="w-full text-foreground gap-[0.375rem]  py-[0.625rem] px-[0.875rem]" onClick={loginWithGithub}>
                Continue with GitHub
            </Button>
        </div>
    )
}

export default Github