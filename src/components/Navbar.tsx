"use client";
import React, { useEffect } from "react";
import Container from "./Container";
import Image from "next/image";
import logo from "../../public/logo.png";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { Search } from "./Search";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCart } from "@/redux/features/cart/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartLength = useSelector((state: RootState) => state.cart.items.length);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);
  return (
    <div className="bg-[#0F172A] py-4 text-white">
      <Container>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Falcon Logo" width={30} height={30} />
              <span className="text-xl font-bold">FALCON</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="flex items-center w-full bg-white rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search for anything...."
                className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
              />
              <button className="bg-teal-500 hover:bg-teal-600 p-2">
                <FiSearch className="text-white text-xl" />
              </button>
            </div>
          </div>

          {/* Cart & User */}
          <div className="flex items-center gap-5">
            <div className="md:hidden block">
              <Search />
            </div>
            <Link href="/cart">
              <div className="relative">
                <HiOutlineShoppingCart className="text-2xl" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartLength}
                </span>
              </div>
            </Link>
            <CiUser className="text-2xl cursor-pointer" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
