import { urlFor } from "../../sanity/lib/image";
import { cn } from "../../lib/utils";
import { FadeIn } from "../FadeIn";
import { Button } from "../ui/button";

export default function BlogsCard({ blog, ...props }) {
  return (
    blog && (
      <FadeIn>
        <article className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-gray-600 line-clamp-2">
            {blog?.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 max-h-[400px]">
            <div className="grid-cols-1 md:col-span-3 row-span-1 md:row-span-2 ">
              <img
                src={urlFor(blog?.mainImage)?.url() || "/bg.jpeg"}
                alt="blog_image"
                width="600"
                height="400"
                className="w-full aspect-auto h-full rounded-lg object-cover object-center hover:opacity-80"
              />
            </div>
            <div className="w-full h-full flex flex-row row-span-2 md:flex-col gap-4 ">
              <div className="w-full h-full">
                <img
                  src={urlFor(blog?.photos[0])?.url() || "/bg.jpeg"}
                  alt="blog_image"
                  width="600"
                  height="400"
                  className="w-full aspect-auto h-full rounded-lg object-cover object-center  hover:opacity-80"
                />
              </div>
              <div className="w-full h-full">
                <img
                  src={urlFor(blog?.photos[1])?.url() || "/bg.jpeg"}
                  alt="blog_image"
                  width="600"
                  height="400"
                  className="w-full h-full rounded-lg object-cover object-center  hover:opacity-80"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 items-center font-medium">
            <h3>Hotel rating:{blog?.averageRating}</h3>
            <h3>Rooms: {blog?.rooms}</h3>
            <h3>Stars: {blog?.stars}</h3>
            <h3>Price: {blog?.price} (2 nights)</h3>
          </div>
          <article className="line-clamp-5 text-sm text-gray-600 font-medium my-3">
            {blog?.description}
          </article>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-center text-left font-normal bg-sky-800 text-white"
            )}
          >
            <a href={blog?.url || ""} target="_blank">
              Room From {blog?.price} USD
            </a>
          </Button>
        </article>
      </FadeIn>
    )
  );
}
