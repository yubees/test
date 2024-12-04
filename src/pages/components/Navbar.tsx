import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


interface Post {
    fullName: string;
    avatarLink: string;
}

const Navbar: React.FC = () => {

    const [user, setUser] = useState<boolean>(false)
    const [posts, setPosts] = useState<Post | null>(null);
    const navigate = useNavigate()


    const handleSignOut = () => {
        localStorage.removeItem("userToken");
        navigate("/signin")

    }



    useEffect(() => {
        const userId = localStorage.getItem("userToken");
        if (userId) {
            setUser(true);
            const handledata = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API}/user/singleUser/${userId}`, {
                        method: "GET"
                    })

                    const data = await response.json();
                    setPosts(data.user[0]);

                } catch (error) {
                    console.log(error)
                }
            }
            handledata()
        }
    }, [])

    return (
<div className='text-white sticky top-0 z-10 bg-black bg-opacity-50 backdrop-blur-md flex justify-between text-2xl py-2 sm:py-6'>
<div className='space-x-4 sm:space-x-10 flex items-center'>
                <Link className=' link-style' to="/"><Home className=' h-8 w-8'/></Link>
                <Link className=' link-style' to="/profile">Profile</Link>
            </div>
            <div className=' flex items-center justify-center space-x-4 sm:space-x-6'>
                {
                    !user ?
                        <>
                            <Link className=' link-style' to="/signin">
                                <Button className=' bg-white text-black hover:text-white'>Sign In</Button>
                            </Link>
                            <Link className=' link-style' to="/signup">
                                <Button className=' bg-white text-black hover:text-white'>Sign Up</Button>
                            </Link>
                        </> :
                        <>

                            {
                                posts ? <>
                                    <Link to={`/${posts.fullName}`}>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={posts.avatarLink} alt="" />
                                            <AvatarFallback className="text-sm">Y</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                </> : <>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="" alt="" />
                                        <AvatarFallback className="text-sm">Y</AvatarFallback>
                                    </Avatar></>
                            }
                            <Button
                                onClick={handleSignOut}
                                className=' bg-white text-black hover:text-white'>Sign Out</Button>

                        </>
                }
            </div>
        </div>
    )
}

export default Navbar