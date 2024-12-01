import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className="flex items-center justify-center w-[100vw] bg-black min-h-[100vh]">
      <Outlet />
    </div>
  );
};

export default BlogLayout;