import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className="flex items-center justify-center w-[100vw] bg-black h-full">
      <Outlet />
    </div>
  );
};

export default BlogLayout;