"use client";

import { BiPackage } from "react-icons/bi";
import { FiHeadphones, FiShoppingBag } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "./Container";
import { useGetCategoriesQuery } from "@/redux/features/product/productApi";
import { Category } from "./Category";
import { ICategory } from "@/types/types";
import { useRef } from "react";

const CategoriesBar = () => {
  const { data, error, isLoading } = useGetCategoriesQuery(undefined);
  const categories = data?.data;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load</p>;

  return (
    <div className="bg-white py-3 text-sm text-[#1E293B] shadow-md">
      <Container>
        <div className="flex gap-5 items-center">
          {/* Categories */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-semibold text-black">
              <Category />
              <span>Categories</span>
            </div>
            <span className="text-gray-300">|</span>

            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="cursor-pointer text-gray-600"
              >
                <FaChevronLeft size={14} />
              </button>

              <div
                ref={scrollRef}
                className="max-w-[600px] overflow-x-auto scrollbar-hide scroll-smooth"
              >
                <ul className="flex items-center gap-5 font-medium text-slate-700 whitespace-nowrap">
                  {categories?.map((category: ICategory) => (
                    <li
                      key={category.id}
                      className="cursor-pointer hover:text-teal-600"
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => scroll("right")}
                className="cursor-pointer text-gray-600"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Others */}
          <div className="flex items-center lg:gap-5 gap-2 font-medium text-slate-600 overflow-x-auto">
            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <BiPackage className="lg:text-xl text-sm" />
              <span className="lg:text-base text-xs whitespace-nowrap">
                TRACK ORDER
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <FiHeadphones className="lg:text-xl text-sm" />
              <span className="lg:text-base text-xs whitespace-nowrap">
                HELP CENTER
              </span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              <FiShoppingBag className="lg:text-xl text-sm text-teal-500" />
              <span className="lg:text-base text-xs whitespace-nowrap">
                SELL WITH US
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoriesBar;
