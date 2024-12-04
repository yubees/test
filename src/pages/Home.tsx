import React, { useEffect, useState } from 'react'
import HeaderCard from './components/HeaderCard';
import Card from './components/Card';
import { HeaderCardSkeleton } from '@/skeleton/HeaderCardSkeleton';
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




const Home: React.FC = () => {


    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true)




    const handleData = async () => {
        setLoading(true)

        try {
            const response = await fetch(`${import.meta.env.VITE_API}/post/getAllPost`, {
                method: "GET"
            })

            const data = await response.json();
            setPosts(data);
            setLoading(false)


        } catch (error) {
            console.log(error)
            setLoading(true)
        }
    }

    useEffect(() => {
        handleData()
    }, [])

    return (
        <div className="flex items-center justify-center w-[100vw] bg-black min-h-[100vh]">
            <div className='p-4 w-full text-white flex justify-center items-center'>
                <div className="max-w-[1200px] w-full">
                    <Navbar />
                    <div className=' mt-16 md:my-4 flex items-center'>
                        <h1 className='  text-[2rem] md:text-[3.5rem] text-white'>
                            Featured Post
                        </h1>

                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full my-4 md:my-12'>
                        {loading
                            ? Array(2)
                                .fill(null)
                                .map((_, index) => <HeaderCardSkeleton key={index} />)
                            : posts
                                .sort((a, b) => b.id - a.id)
                                .slice(0, 2)
                                .map((post, index) => (
                                    <HeaderCard
                                        key={index}
                                        title={post.title}
                                        author={post.authorName}
                                        date={post.createdAt}
                                        imgSrc={post.image}
                                        authorsrc={post.authorAvatar}
                                        content={post.content}
                                        authorId={post.authorId}
                                    />
                                ))}

                    </div>
                    <p className=' my-9 text-2xl'>Latest Posts</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {loading
                            ? <>
                                <CardSkeleton />
                                <CardSkeleton />
                                <CardSkeleton />
                            </>
                            : posts.sort((a, b) => b.id - a.id).map((post, index) => (
                                <Card
                                    key={index}
                                    title={post.title}
                                    author={post.authorName}
                                    date={post.createdAt}
                                    imgSrc={post.image}
                                    authorsrc={post.authorAvatar}
                                    content={post.content}
                                    authorId={post.authorId}
                                    postId={post.id}
                                />
                            ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home