
import React, { useEffect, useState } from 'react'
import HeaderCard from './components/HeaderCard';
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

const Home: React.FC = () => {


    const [posts, setPosts] = useState<Post[]>([]);


    const handleData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/post/getAllPost`, {
                method: "GET"
            })

            const data = await response.json();
            console.log(data)
            setPosts(data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleData()
    }, [])

    return (
        <div className='p-4 w-full text-white flex justify-center items-center'>
            <div className="max-w-[1200px] w-full">
                <div className=' my-2 md:my-16 flex items-center'>
                    <h1 className='  text-[2rem] md:text-[3.5rem] text-white'>
                        Blog
                    </h1>
                    
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full my-10 md:my-12'>
                    {posts.sort((a, b) => b.id - a.id).slice(0,2).map((post, index) => (
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
                    {posts.sort((a, b) => b.id - a.id).map((post, index) => (
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
    )
}

export default Home