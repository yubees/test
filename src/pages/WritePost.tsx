import { Button } from "@/components/ui/button";
import { formats, modules } from "@/config/quillConfig";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Client, Storage, ID } from 'appwrite';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";



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
    }
  };

  return (
    <div className=" h-[100vh] w-[100vw] bg-black text-white flex justify-center items-center">
      <div className=" w-full p-5 sm:w-[35rem] mr-3 py-10 space-y-5">
        <div className=" flex justify-end">
          <Link to="/home">
            <Home className=" h-14 w-10 text-white" />
          </Link>
        </div>
        <Label htmlFor="title" className=" text-xl">Title</Label>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <Label htmlFor="image" className=" text-xl">Upload cover image</Label>

        <Input className=" bg-white text-black" type="file" id="uploader" accept="image/*" />
        <Button onClick={handleImageUpload}> {upload ? "Uploaded" : "Upload"}</Button>

        
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
      <br className=" md:hidden"/>

        <Button onClick={handlePost} disabled={isLoading}>
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default WritePost