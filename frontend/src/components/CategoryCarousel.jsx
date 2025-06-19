import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Web Designer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Explore by <span className="text-[#6A38C2]">Category</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
          Discover jobs tailored to your skills and interests. Just tap a
          category!
        </p>
      </div>

      <Carousel className="w-full max-w-5xl mx-auto mt-10">
        <CarouselContent className="px-2 sm:px-0">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="w-full rounded-full border-[#6A38C2] text-[#6A38C2] font-semibold py-3 px-6 text-sm sm:text-base shadow-md hover:bg-[#6A38C2] hover:text-white transition-colors"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-2" />
        <CarouselNext className="mr-2" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
