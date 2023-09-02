import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import axios from "axios"; // Don't forget to import axios

const FilterContext = createContext();

export function useFilter() {
  return useContext(FilterContext);
}

async function getData() {
  const res = await axios.get("/api/Blogs/getBlogs");
  return (await res).data;
}

export function FilterProvider({ children }) {
  const [filterCriteria, setFilterCriteria] = useState({
    selectedState: "",
    selectedCity: "",
    selectedGuests: "",
    checkIn: null,
    checkOut: null,
  });

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getData,
    keepPreviousData: true,
  });
  console.log("blog", blogs);
  if (isLoading) return "";
  if (isError) return "Something went wrong";
  return (
    <FilterContext.Provider
      value={{ filterCriteria, setFilterCriteria, blogs }}
    >
      {children}
    </FilterContext.Provider>
  );
}
