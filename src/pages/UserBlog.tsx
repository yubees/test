import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Card from './components/Card';
import { CardSkeleton } from '@/skeleton/CardSkeleton';
import Navbar from './components/Navbar';


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
        <div className="flex text-white justify-center sm:px-4 w-[100vw] bg-black min-h-[100vh]">
            <div className="max-w-[1200px] w-full py-4 px-4 sm:px-0 space-y-2">
                <Navbar />
                <div className='pt-10 md:pt-2 pb-4 md:pb-10 md:my-16 flex items-center justify-between'>
                    <h1 className='text-[2rem] md:text-[3.5rem] text-white'>
                        {author}  Blog
                    </h1>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                    {loading ? Array(6)
                        .fill(null)
                        .map((_, index) => <CardSkeleton key={index} />) : <>
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