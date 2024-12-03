import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { format } from 'date-fns';

interface HeaderCardProps {
    title: string;
    author: string;
    date: string;
    imgSrc: string;
    authorsrc: string
    content: string
    authorId: number
    postId?: number
}

const HeaderCard: React.FC<HeaderCardProps> = ({ authorId, title, author, date, imgSrc, authorsrc, content }) => {
    return (
        <div className=' flex flex-col'>
            <Link to="/post"
                state={{ authorId, title, author, date, imgSrc, authorsrc, content }}
                className='no-underline text-gray-200 hover:text-gray-200 pb-14 md:pb-16'>
                <div className="w-full h-[250px] sm:h-[200px] md:h-[350px]">
                    <img
                        className="rounded-lg w-full h-full object-cover"
                        src={imgSrc}
                        alt={title}
                    />
                    <h1 className="my-4 text-lg sm:text-1xl md:text-2xl lg:text-3xl leading-tight font-semibold">
                        {title}
                    </h1>
                </div>
            </Link>
            <Link to={`/posts/${author}`}
                state={{ authorId, author }}
            >
                <div className="flex gap-2 items-center font-semibold text-sm">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={authorsrc} referrerPolicy="no-referrer" alt={author} />
                        <AvatarFallback className="text-sm">Y</AvatarFallback>
                    </Avatar>
                    <p className="text-gray-200">{author} ·</p>
                    <p className="text-slate-400"> {format(new Date(date), "MMM d, yyyy")}</p>
                </div>
            </Link>
        </div>
    )
}

export default HeaderCard