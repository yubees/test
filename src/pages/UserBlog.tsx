import { Home } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Card from './components/Card';


interface Post {
    id: number;
    title: string;
    content: string;
    image: string;
    authorName: string;
    createdAt: string;
    isUpdated: boolean;
    authorAvatar: string;
    authorId: number
}

const UserBlog: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    const [userPost, setUserPost] = useState<boolean>(false)
    const [loading, setIsLoading] = useState<boolean>(false)


    const location = useLocation();
    const { authorId, author } = location.state || {};

    const handleData = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API}/post/getUserPost/${authorId}`, {
                method: "GET"
            })

            const data = await response.json();
            setPosts(data);

        } catch (error) {
            console.log(error)
        }
    
    }

    useEffect(() => {
        handleData()
        setIsLoading(true)
        const getUserId = async () => {
            const userId = localStorage.getItem("userToken");
            const response = await fetch(`${import.meta.env.VITE_API}/user/singleUser/${userId}`, {
                method: "GET",
            });
            const data = await response.json();
            const userIds = data.user[0].id
            setIsLoading(true)
            if (userIds === authorId) {
                setUserPost(true)
                setIsLoading(false)
            }
            setIsLoading(false)
        }
        getUserId()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(userPost)

    return (
        <div className='p-4 w-full text-white flex justify-center items-center'>
            <div className="max-w-[1200px] w-full">
                <div className='my-4 md:my-16 flex items-center justify-between'>
                    <h1 className='text-[2rem] md:text-[3.5rem] text-white'>
                        {author}'s  Blog
                    </h1>
                    <Link to="/home">
                        <Home className=" h-14 w-8 md:w-10 text-white" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                    {loading ? <p className=' text-xl md:text-3xl'>Loading .....</p> : <>
                        {posts.length > 0 ? (
                            posts.reverse().map((post, index) => (
                                <Card
                                    key={index}
                                    title={post.title}
                                    author={post.authorName}
                                    date={post.createdAt}
                                    imgSrc={post.image}
                                    authorsrc={post.authorAvatar}
                                    content={post.content}
                                    authorId={post.authorId}
                                    isAuthorPost={userPost}
                                    postId={post.id}
                                    handleData={handleData}
                                />
                            ))
                        ) : (
                            <p className=" text-gray-500 text-sm md:text-2xl col-span-full">
                                No posts available. Please check back later!
                            </p>
                        )}</>}
                </div>

            </div>

        </div>
    )
}

export default UserBlog