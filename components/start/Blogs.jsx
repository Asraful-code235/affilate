"use client";

import { useEffect, useState } from "react";
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
} from "../../components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../..//components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

async function getData() {
  const res = await axios.get("/api/Blogs/getBlogs");
  return (await res).data;
}

async function getCity() {
  const res = await axios.get("/api/city/getCity");
  return (await res).data;
}

async function getAccessibility() {
  const res = await axios.get("/api/accessibility/getAccessibility");
  return (await res).data;
}

async function getStates() {
  const res = await axios.get("/api/city/getState");
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
  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
    keepPreviousData: true,
  });

  const { data: city } = useQuery({
    queryKey: ["city"],
    queryFn: getCity,
    keepPreviousData: true,
  });
  const { data: accessibility } = useQuery({
    queryKey: ["accessibility"],
    queryFn: getAccessibility,
    keepPreviousData: true,
  });

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState(null);
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
  function formatDateToLong(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1); // Subtract 1 day to get September 2nd
    return date.toLocaleDateString(undefined, options);
  }

  const filteredBlogs = blogs?.post?.filter((blog) => {
    const cityMatches =
      selectedCitySlugs.length === 0 ||
      blog.cities.some((city) => selectedCitySlugs.includes(city.slug.current));
    const accessibilityMatches =
      selectedAccessibilitySlugs.length === 0 ||
      blog.accessibility.some((access) =>
        selectedAccessibilitySlugs.includes(access.slug.current)
      );

    const stateMatches =
      !selectedState ||
      blog?.states?.some((state) => state.slug.current === selectedState);
    const guestMatches =
      !selectedGuests || blog.rooms >= parseInt(selectedGuests, 10);
    const checkInMatches =
      !checkIn ||
      (blog.checkInDate >= checkIn &&
        blog.formatDateToLong(checkInDate) <= formatDateToLong(checkOut));
    const checkOutMatches =
      !checkOut ||
      (blog.checkOutDate >= checkIn &&
        blog.formatDateToLong(checkOutDate) <= formatDateToLong(checkOut));

    const cityFilterMatches =
      !selectedCity ||
      blog.cities.some((city) => city.slug.current === selectedCity);

    return (
      cityMatches &&
      accessibilityMatches &&
      stateMatches &&
      checkInMatches &&
      checkOutMatches &&
      cityFilterMatches &&
      guestMatches
    );
  });

  const filteredStates = states?.states?.find(
    (state) => state?.slug.current === selectedState
  );

  const filteredCities = filteredStates?.cities;

  const handleResetFilters = () => {
    setSelectedCitySlugs([]);
    setSelectedAccessibilitySlugs([]);
    setSelectedState("");
    setCheckIn(null);
    setCheckOut(null);
  };

  if (isLoading) return "";
  if (isError) return "Something went wrong";
  return (
    <>
      <section className="grid w-full md:w-fit  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6 px-4 md:px-8 bg-white md:-mt-24 z-50 border border-transparent rounded-md shadow-md">
        <Select onValueChange={(e) => setSelectedState(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select State here" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>States</SelectLabel>
              {states?.states?.map((state, key) => (
                <SelectItem key={key} value={state?.slug?.current}>
                  {state?.cityname}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(e) => setSelectedCity(e)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select City here" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>City</SelectLabel>
              {selectedState ? (
                <>
                  {filteredCities?.map((city, key) => (
                    <SelectItem key={key} value={city?.slug?.current}>
                      {city?.cityname}
                    </SelectItem>
                  ))}
                </>
              ) : (
                <>
                  {city?.city?.map((city, key) => (
                    <SelectItem key={key} value={city?.slug?.current}>
                      {city?.cityname}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(e) => setSelectedGuests(e)}>
          <SelectTrigger className="w-w-full">
            <SelectValue placeholder="Select Number of guest" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>No. of Guest</SelectLabel>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="14">14</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="18">18</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : <span>Check In</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : <span>Check Out</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={handleResetFilters}
            variant={"outline"}
            className={cn(
              "w-[240px] justify-center text-left font-normal bg-sky-800 text-white"
            )}
          >
            Reset
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto grid w-full grid-cols-1 md:grid-cols-7 gap-4 px-4">
        <div className=" col-span-7 md:col-span-2 flex flex-col  mb-8 md:mb-0 gap-10 w-full bg-white p-4 rounded-md shadow-md h-fit">
          <div className="flex flex-col gap-6">
            <h3 className="text-sky-700 border-b-2 border-sky-700 text-xl font-semibold font-serif">
              Property Features
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

            <div className="block w-full md:hidden">
              <Select onValueChange={handleAccessibilityCheckboxChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select accessibility here" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Property Accessibility</SelectLabel>
                    {accessibility?.accessibility?.map((accessibility, key) => (
                      <SelectItem
                        key={key}
                        value={accessibility?.slug?.current}
                      >
                        {accessibility?.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full">
            <h3 className="text-sky-700 border-b-2 border-sky-700 text-xl font-semibold font-serif">
              City
            </h3>
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
              <Select onValueChange={(e) => setSelectedCitySlugs(e)}>
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
    </>
  );
}
