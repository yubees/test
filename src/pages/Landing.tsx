import { Button } from "@/components/ui/button";
import { ChevronRight, Library, MoveRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./test.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full">
      <div className="flex gap-5 w-full items-center justify-center bg-[#DCDCDC] py-2">
        <p className="text-gray-800">Explore The Latest Blogs</p>
        <Link to="/blog" className="text-black flex gap-2">
          Get Started <MoveRight />
        </Link>
      </div>
      <nav className="flex gap-14 text-white items-center border-b border-white justify-center py-3">
        <span className="flex gap-1 items-center">
          <Library className="h-10 w-10" />
          <span className="text-3xl font-medium gradient-text">Blog CMS</span>
        </span>
        <div className="flex gap-4 gradient-text">
          <Link to="/blog">Blogs</Link>
          <Link to="#">Features</Link>
          <Link to="#">About</Link>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="link"
            className="gradient-text"
            onClick={() => {
              navigate("signin");
            }}
          >
            Signin
          </Button>
          <Button
            type="button"
            variant="default"
            className="rounded-full px-6 py-2 bg-white text-black hover:bg-black hover:text-white border hover:border-s-violet-200"
            onClick={() => navigate("signup")}
          >
            Signup
          </Button>
        </div>
      </nav>
      <div className="my-6 flex flex-col items-center ">
        <p className="gradient-text text-6xl uppercase font-bold md:w-[60%] text-center mt-16 tracking-wide">
          Effortless Blogging with Powerful{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text">
            Markdown Editing
          </span>
        </p>
        <p className="gradient-text mt-3 text-lg">
          Create, edit, and manage your blog posts effortlessly with our
          markdown-supported CMS
        </p>
        <Button
          className="flex gap-3 my-5 rounded-full pl-6"
          onClick={() => navigate("signup")}
        >
          Get Started <ChevronRight />
        </Button>
      </div>
      <div className="relative mb-[7rem]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      <div className="my-5 grid md:grid-cols-2">
        <div className="px-6 flex justify-center items-center">
          <p className="text-4xl font-bold gradient-text text-wrap w-[80%]">
            Manage your blog with intuitive tools
          </p>
        </div>
        <img src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/homepage/Publish.png" />
      </div>
      <div className="my-20 grid md:grid-cols-2">
        <img src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/homepage/Publish.png" />
        <div className="px-6 flex justify-center items-center">
          <p className="text-4xl font-bold gradient-text text-wrap w-[80%]">
            Deep dive into the world of technology and business
          </p>
        </div>
      </div>
      <div className="w-full border border-white my-8"></div>
      <div className="flex flex-col gap-2 items-center pb-10">
        <span className="flex gap-1 items-center">
          <Library className="h-10 w-10 text-white" />
          <span className="text-3xl font-bold gradient-text">Blog CMS</span>
        </span>
        <div className="flex justify-around gap-3 gradient-text">
          <div className="flex gap-2">
            <Link to="#" className="gradient-text">
              Terms
            </Link>
            <Link to="#">Policy</Link>
            <Link to="#">Support</Link>
            <Link to="#">About</Link>
          </div>
          <div></div>
        </div>
        <p className="text-muted-foreground">
          © 2024 blog, All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;