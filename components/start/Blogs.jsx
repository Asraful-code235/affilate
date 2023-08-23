"use client";
import { useQuery } from "@tanstack/react-query";
import BlogsCard from "./BlogsCard";
import { CheckBox } from "./CheckBox";
import axios from "axios";

async function getData() {
  const res = await axios.get("/api/Blogs/getBlogs");
  return (await res).data;
}

export default function Blogs() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getData,
    keepPreviousData: true,
  });
  console.log(data);
  if (isLoading) return "";
  if (isError) return "Something went wrong";
  return (
    <section className="max-w-7xl mx-auto grid grid-cols-7 gap-4 px-4">
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-600 text-lg font-semibold">City</h3>
          {Array.from({ length: 7 }).map((blog, key) => (
            <CheckBox key={key} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-600 text-lg font-semibold">
            Property Accessibility
          </h3>
          {Array.from({ length: 7 }).map((blog, key) => (
            <CheckBox key={key} />
          ))}
        </div>
      </div>
      <div className="col-span-5 flex flex-col gap-4">
        {data?.post?.map((blog, key) => (
          <BlogsCard key={key} blog={blog} />
        ))}
      </div>
    </section>
  );
}
