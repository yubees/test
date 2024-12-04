import { Button } from "@/components/ui/button";
import { formats, modules } from "@/config/quillConfig";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Client, Storage, ID } from 'appwrite';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "./components/Navbar";



const client = new Client()
  .setEndpoint(import.meta.env.VITE_WRITE)
  .setProject(import.meta.env.VITE_PROJECT);

const storage = new Storage(client);



const WritePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [upload, setUpload] = useState(false)

  const handlePost = async () => {
    const id = localStorage.getItem("userToken")

    try {
      setIsLoading(true);
      if (!title) {
        alert('Title is required')
        setIsLoading(false);
        
        return
      }
      if (title.length>20) {
        alert('Title should be less than 20 words')
        setIsLoading(false);
        
        return
      }
      if (!fileUrl) {
        alert('Cover Image is required')
        setIsLoading(false);
        return
      }
      if (desc.length<10) {
        alert('Description should be atleast 10 words')
        setIsLoading(false);
        return
      }

      const response = await fetch(
        `${import.meta.env.VITE_API}/post/create/${id}`, // Replace `id` with your actual dynamic value
        {
          method: "POST",
          body: JSON.stringify({ title, content: desc, image: fileUrl }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      alert(data.msg)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleImageUpload = async () => {
    const fileInput = document.getElementById('uploader') as HTMLInputElement;

    if (fileInput?.files?.length) {
      const file = fileInput.files[0];


      try {
        const response = await storage.createFile(
          import.meta.env.VITE_BUCKET,
          ID.unique(),
          file
        );

        const fileURL = `${import.meta.env.VITE_WRITE}/storage/buckets/${import.meta.env.VITE_BUCKET}/files/${response.$id}/view?project=${import.meta.env.VITE_PROJECT}`;

        setFileUrl(fileURL); // Set the file URL in the state
        setUpload(true)
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
      }
    } else {
      console.log('No file selected');
      alert('No file selected')
    }
  };

  return (
    <div className="flex text-white justify-center sm:px-4 w-[100vw] bg-black min-h-[100vh]">
      <div className="max-w-[1200px] w-full py-4 px-4 sm:px-0 space-y-2">
        <Navbar />
        <div className=" space-y-4 sm:space-y-6 md:px-20 lg:px-52">
          <Label htmlFor="title" className=" text-xl">Blog Title</Label>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <Label htmlFor="image" className=" text-xl">Upload cover image</Label>

          <Input className=" bg-white text-black" required type="file" id="uploader" accept="image/*" />
          <Button className=" w-full" onClick={handleImageUpload}> {upload ? "Uploaded" : "Upload"}</Button>


          <ReactQuill
            theme="snow"
            className=" w-full h-20 md:h-56"
            modules={modules}
            formats={formats}
            value={desc}
            onChange={setDesc}
          />
          <br />
          <br />
          <br className=" md:hidden" />

          <Button className=" w-full" onClick={handlePost} disabled={isLoading}>
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritePost