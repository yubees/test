import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';


const Post: React.FC = () => {

    const location = useLocation();
    const { authorId, title, author, date, imgSrc, authorsrc, content } = location.state || {};
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className=' p-3 md:p-6 my-4 md:my-20 w-full text-white flex justify-center'>
            <div className="max-w-[1200px] space-y-2 md:space-y-4 w-full flex flex-col items-center ">
                <p className=' text-slate-300 text-sm font-semibold'>{format(new Date(date), "MMMM d, yyyy")}</p>
                <h1 className=' text-center text-md md:text-6xl'>
                    {title}</h1>
                {/* <p className=' text-center text-slate-300 text-xl'>A week of connection, strategy, and learning.</p> */}
                <Link to={`/posts/${author}`}
                    state={{ authorId, author }}>
                    <div className="flex gap-2 items-center font-semibold text-sm py-4">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={authorsrc}
                                alt="" />
                            <AvatarFallback className="text-sm">Y</AvatarFallback>
                        </Avatar>
                        <p className=" text-gray-400  ">{author}</p>
                    </div>
                </Link>
                <div className="w-full h-auto sm:h-[500px] md:h-[700px]">
                    <img
                        className="rounded-xl w-full h-full object-cover"
                        src={imgSrc}
                        alt=""
                    />
                </div>

                <div className='text-slate-400 space-y-6 font-semibold max-w-[700px] mr-2 w-full flex flex-col items-start justify-start'>
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>


        </div>
    )
}

export default Post