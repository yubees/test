import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pen, Trash } from "lucide-react";
import { format } from "date-fns";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formats, modules } from "@/config/quillConfig";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Navbar from "./components/Navbar";



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

const AdminPanel = () => {



  const [posts, setPosts] = useState<Post[]>([]);
  const [titleE, setTitle] = useState<string>("");
  const [descE, setDesc] = useState<string>("");
  const [idE, setId] = useState<number>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const totalPages = Math.ceil(posts.length / postsPerPage);


  // Calculate start and end indices for slicing posts
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Display posts for the current page
  const currentPosts = posts.sort((a, b) => b.id - a.id).slice(startIndex, endIndex);




  const handleEditClick = (post: Post) => {
    setTitle(post.title);
    setDesc(post.content);
    setId(post.id);
    setIsFormVisible(true);
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };


  // Calculate the page range to display
  const getDisplayedPages = () => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const displayedPages = getDisplayedPages();


  const handleData = async (userIds?: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/post/getUserPost/${userIds}`, {
        method: "GET"
      })

      const data = await response.json();
      setPosts(data);

    } catch (error) {
      console.log(error)
    }

  }

  const getUserData = async () => {
    const userId = localStorage.getItem("userToken");
    const response = await fetch(`${import.meta.env.VITE_API}/user/singleUser/${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    const userIds = data.user[0].id
    if (userIds) {
      handleData(userIds)
    }


  };

  useEffect(() => {

    try {

      getUserData();
    } catch (error) {
      console.log(error);

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deletePost = async (postId: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/post/deletePost/${postId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        console.log(`Post with id ${postId} deleted successfully.`);
        await getUserData();

      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  }

  const editPost = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/post/updatePost/${idE}`,
        {
          method: "PUT",
          body: JSON.stringify({ title: titleE, content: descE }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setIsFormVisible(false);
      getUserData()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex text-white justify-center w-[100vw] bg-black min-h-[100vh]">
      <div className="w-full p-5 lg:w-[60rem] mr-3 py-10 space-y-5">
        <Navbar/>
        <div className=' my-2 md:my-16 flex items-center justify-between'>
          <h1 className='  text-[2rem] md:text-[3.5rem] text-white'>
            Recent Posts
          </h1>
          <Link to="/write">
            <Button variant="secondary" className=' md:h-14 md:w-28 text-[1rem] text-center md:text-[1.5rem]'>Post</Button>
          </Link>
        </div>
        {isFormVisible && (
          <div className="fixed inset-0 z-10 bg-black text-black bg-opacity-70 flex justify-center items-center">
            <div className="w-full p-5 lg:w-[35rem] m-5 py-10 space-y-5 bg-white rounded-lg shadow-lg">
              <Label htmlFor="title" className="text-xl">Title</Label>
              <Input
                type="text"
                name="title"
                value={titleE}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <ReactQuill
                theme="snow"
                className="w-full"
                modules={modules}
                formats={formats}
                value={descE}
                onChange={setDesc}
              />
              <div className=' flex gap-4 justify-center items-center'>
                <Button onClick={editPost}>
                  Edit
                </Button>
                <Button
                  className="bg-gray-500 text-white "
                  onClick={() => setIsFormVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
        <Table className=" text-sm sm:text-xl">
          <TableHeader>
            <TableRow >
              <TableHead className=" w-max sm:[w-20rem] md:w-[25rem] lg:w-[35rem] text-white">Title</TableHead>
              <TableHead className=" text-white">Created</TableHead>
              <TableHead className="sm:w-[100px] text-white">Edit</TableHead>
              <TableHead className="sm:w-[100px] text-white">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" h-auto">
            {
              (currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className=" font-light">{post.title}</TableCell>
                    <TableCell className=" font-light">{format(new Date(post.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell
                      className="cursor-pointer pl-4"
                      onClick={() => handleEditClick(post)}
                    >
                      <Pen className=" text-blue-600" />
                    </TableCell>
                    <TableCell
                      className=" pl-6 cursor-pointer"
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash className=" text-red-500" />
                    </TableCell>
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className=" cursor-pointer" onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} />
            </PaginationItem>
            {(
              displayedPages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    className=" cursor-pointer"
                    isActive={page === currentPage}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))
            )
            }

            <PaginationItem>
              <PaginationNext className=" cursor-pointer" onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>
    </div>
  )
}

export default AdminPanel