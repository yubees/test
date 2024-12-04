
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

interface User {
  userId: number;
  fullName: string;
  avatarLink: string;
  postCount: number
}


const Profile = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleData = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/user/allUser`, {
        method: "GET"
      })

      const data = await response.json();
      setUsers(data.users);


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <div className="flex text-white sm:px-4 justify-center w-[100vw] bg-black min-h-[100vh]">
      <div className="max-w-[1200px] w-full py-4 px-4 sm:px-0 space-y-2">
        <Navbar />
        <div className=' pt-8 md:pt-2 pb-4 md:pb-10 md:my-16 flex w-full justify-center'>
          <h1 className='  text-[2rem] md:text-[3.5rem] text-white'>
            User
          </h1>

        </div>
        <div className=" rounded-md border md:mx-20 lg:mx-40">
          <Table className=" font-semibold text-xl">

            <TableBody className=" h-auto">
              {
                (users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.userId}>
                      <Link
                        className="link-style"
                        to={`/posts/${user.fullName}`}
                        state={{ authorId: user.userId, author: user.fullName }}>
                        <TableCell className=" font-light flex justify-between p-4">
                          <div className=" flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatarLink} alt="" />
                              <AvatarFallback className="text-sm bg-black font-bold">{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <p className="truncate overflow-hidden whitespace-nowrap"> {user.fullName}</p>
                          </div>
                          <p>{user.postCount} post</p>

                        </TableCell>
                      </Link>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center font-medium">
                      No posts available
                    </TableCell>
                  </TableRow>
                ))

              }

            </TableBody>

          </Table>
        </div>


      </div>
    </div>)
}

export default Profile