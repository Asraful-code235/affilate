"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import BlogsCard from "./BlogsCard";
import { CheckBox } from "./CheckBox";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

async function getData() {
  const res = await axios.get("/api/Blogs/getBlogs");
  return (await res).data;
}

async function getcity() {
  const res = await axios.get("/api/city/getCity");
  return (await res).data;
}
async function getAccessibility() {
  const res = await axios.get("/api/accessibility/getAccessibility");
  return (await res).data;
}

export default function Blogs() {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getData,
    keepPreviousData: true,
  });

  const { data: city } = useQuery({
    queryKey: ["city"],
    queryFn: getcity,
    keepPreviousData: true,
  });
  const { data: accessibility } = useQuery({
    queryKey: ["accessibility"],
    queryFn: getAccessibility,
    keepPreviousData: true,
  });

  const [selectedCitySlugs, setSelectedCitySlugs] = useState([]);
  const [selectedAccessibilitySlugs, setSelectedAccessibilitySlugs] = useState(
    []
  );

  const handleCityCheckboxChange = (slug) => {
    setSelectedCitySlugs((prevSlugs) =>
      prevSlugs.includes(slug)
        ? prevSlugs.filter((s) => s !== slug)
        : [...prevSlugs, slug]
    );
  };

  const handleAccessibilityCheckboxChange = (slug) => {
    setSelectedAccessibilitySlugs((prevSlugs) =>
      prevSlugs.includes(slug)
        ? prevSlugs.filter((s) => s !== slug)
        : [...prevSlugs, slug]
    );
  };

  const filteredBlogs = blogs?.post?.filter((blog) => {
    const cityMatches =
      selectedCitySlugs.length === 0 ||
      blog.cities.some((city) => selectedCitySlugs.includes(city.slug.current));
    const accessibilityMatches =
      selectedAccessibilitySlugs.length === 0 ||
      blog.accessibility.some((access) =>
        selectedAccessibilitySlugs.includes(access.slug.current)
      );
    return cityMatches && accessibilityMatches;
  });

  if (isLoading) return "";
  if (isError) return "Something went wrong";
  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 px-4">
      <div className=" col-span-7 md:col-span-2 flex flex-col  mb-8 md:mb-0 gap-4 w-full bg-white p-4 rounded-md shadow-md h-fit">
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-gray-600 text-lg font-semibold">City</h3>
          <div className="hidden md:flex md:flex-col gap-2">
            {city?.city?.map((city, key) => (
              <CheckBox
                key={key}
                title={city?.cityname}
                slug={city?.slug?.current}
                isChecked={selectedCitySlugs.includes(city?.slug?.current)}
                onCheckboxChange={handleCityCheckboxChange}
              />
            ))}
          </div>

          <div className="block md:hidden">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select city here" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>City</SelectLabel>
                  {city?.city?.map((city, key) => (
                    <SelectItem key={key} value={city?.slug?.current}>
                      {city?.cityname}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-gray-600 text-lg font-semibold">
            Property Accessibility
          </h3>
          <div className="hidden md:flex md:flex-col gap-2">
            {accessibility?.accessibility?.map((accessibility, key) => (
              <CheckBox
                key={key}
                title={accessibility?.title}
                slug={accessibility?.slug?.current}
                isChecked={selectedAccessibilitySlugs.includes(
                  accessibility?.slug?.current
                )}
                onCheckboxChange={handleAccessibilityCheckboxChange}
              />
            ))}
          </div>

          <div className="block md:hidden">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select accessibility here" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Property Accessibility</SelectLabel>
                  {accessibility?.accessibility?.map((accessibility, key) => (
                    <SelectItem key={key} value={accessibility?.slug?.current}>
                      {accessibility?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="col-span-7 md:col-span-5 flex flex-col gap-4">
        {filteredBlogs?.length > 0 ? (
          <>
            {filteredBlogs?.map((blog, key) => (
              <BlogsCard key={key} blog={blog} />
            ))}
          </>
        ) : (
          <div className="w-full text-xl font-medium text-center flex items-center justify-center">
            No Hotel found
          </div>
        )}
      </div>
    </section>
  );
}
