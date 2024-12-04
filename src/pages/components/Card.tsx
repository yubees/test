import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns';
import { Link } from 'react-router-dom'


interface CardProps {
    title: string;
    author: string;
    date: string;
    imgSrc: string;
    authorsrc: string
    content: string
    authorId: number
    isAuthorPost?: boolean
    postId?: number
    handleData?: () => Promise<void>;
}

const Card: React.FC<CardProps> = ({
    postId,
    authorId, title, author,
    date, imgSrc,
    authorsrc, content }) => {

    return (
        <div className=' flex flex-col mb-8 relative group'>

            <Link to="/post"
                state={{ authorId, title, author, date, imgSrc, authorsrc, content }}
                className="no-underline text-gray-200 hover:text-gray-200 pb-14 md:pb-16">
                <div className="w-full h-[250px] sm:h-[200px] md:h-[250px] ">
                    <img
                        className="rounded-lg w-full h-full object-cover"
                        src={imgSrc}
                        alt={title}
                        loading='lazy'
                    />
                    <h1 className="mt-4 text-lg sm:text-lg md:text-1xl lg:text-2xl leading-tight font-semibold truncate overflow-hidden whitespace-nowrap">
                        {title}
                    </h1>

                </div>
            </Link>
            <Link to={`/posts/${author}`}
                state={{ authorId, author, postId }}
            >
                <div className="flex gap-2 items-center text-sm font-semibold">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={authorsrc} alt="" />
                        <AvatarFallback className="text-sm">Y</AvatarFallback>
                    </Avatar>
                    <p className=" text-gray-200 ">{author} ·</p>
                    <p className=" text-slate-400"> {format(new Date(date), "MMM d, yyyy")}</p>
                </div></Link>
        </div>

    )
}

export default Card