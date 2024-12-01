
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  fullName: string;
  avatarLink: string;
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
      console.log(data)


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <div className="flex text-white justify-center w-[100vw] bg-black min-h-[100vh]">
      <div className="w-full p-5 lg:w-[60rem] mr-3 py-10 space-y-5">
        <div className=' my-2 md:my-16 flex items-center justify-between'>
          <h1 className='  text-[2rem] md:text-[3.5rem] text-white'>
            User
          </h1>

        </div>
        <Table className=" text-sm sm:text-xl">
          <TableHeader>
            <TableRow >
              <TableHead className=" w-max sm:[w-20rem] md:w-[25rem] lg:w-[35rem] text-white">Full Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" h-auto">
            {
              (users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <Link
                      className="link-style"
                      to={`/posts/${user.fullName}`}
                      state={{ authorId: user.id, author: user.fullName }}>
                      <TableCell className=" font-light flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatarLink} alt="" />
                          <AvatarFallback className="text-sm bg-black font-bold">{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        {user.fullName}
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
    </div>)
}

export default Profile