"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { IoIosArrowForward } from "react-icons/io";
import { TbCurrencyTaka } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox";
import { CiShop } from "react-icons/ci";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { CartItem } from "@/types/types";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);

  const handleUpdateQty = (item: CartItem, type: "inc" | "dec") => {
    dispatch(updateQuantity({ id: item.id, type }));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#F1F5F9] min-h-screen">
      <Container>
        <Breadcrumb className="pt-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/cart">My Cart</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10 pt-5">
          {/* Cart */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-5 rounded-md flex items-center justify-between">
              <h2 className="md:text-2xl font-bold">My Cart ({cart.length})</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 focus-visible:ring-teal-500" />
                  <label htmlFor="select-all">Select All</label>
                </div>
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.variationId}`}
                  className="bg-white p-4 rounded-md space-y-4"
                >
                  <div className="bg-[#F1F5F9] p-3 rounded-md flex items-center gap-2">
                    <Checkbox className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 focus-visible:ring-teal-500" />
                    <p className="flex items-center gap-2 font-semibold text-sm">
                      <CiShop size={20} />
                      BD FASHION HOUSE <IoIosArrowForward />
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <Image
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : item.image || "/placeholder.png"
                      }
                      alt={item.title}
                      width={100}
                      height={100}
                      className="rounded border"
                      unoptimized
                    />
                    <div className="flex-1 text-center md:text-left">
                      <div className="md:flex items-center justify-between">
                        <p className="font-medium">{item.title}</p>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center font-semibold text-lg">
                            <span className="flex items-center">
                              <TbCurrencyTaka size={20} />
                              {Number(item.price || 0).toLocaleString("en-BD")}
                            </span>
                            <span className="flex items-center text-gray-400 line-through text-sm ml-2">
                              <TbCurrencyTaka size={20} />
                              {Number(item.originalPrice || 0).toLocaleString(
                                "en-BD"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 py-1 mt-3">
                        <div className="flex items-center gap-3 border w-max p-1 rounded-full bg-white">
                          <button
                            onClick={() => handleUpdateQty(item, "dec")}
                            className="w-6 h-6 flex items-center justify-center text-xl text-gray-600 bg-gray-100 rounded-full cursor-pointer"
                          >
                            –
                          </button>
                          <span className="min-w-[24px] text-center font-medium text-sm">
                            {item.quantity.toString().padStart(2, "0")}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(item, "inc")}
                            className="w-6 h-6 flex items-center justify-center text-xl text-gray-600 bg-gray-100 rounded-full cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="text-red-500 cursor-pointer"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white p-5 rounded-md space-y-4">
              <h3 className="text-xl font-semibold">Order summary</h3>

              <div className="flex justify-between text-sm">
                <span>Price ({cart.length} items)</span>
                <span className="flex items-center">
                  <TbCurrencyTaka size={20} />
                  {totalPrice.toLocaleString("en-BD")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping fee</span>
                <span className="text-blue-500">To be added</span>
              </div>

              <div className="flex mt-4">
                <input
                  type="text"
                  placeholder="Store / Falcon coupon"
                  className="flex-1 border px-3 py-2 rounded-l text-sm"
                />
                <button className="px-4 rounded-r bg-teal-500 hover:bg-teal-600 text-white text-sm cursor-pointer">
                  Apply
                </button>
              </div>

              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Sub Total</span>
                <span className="flex items-center">
                  <TbCurrencyTaka size={20} />
                  {totalPrice.toLocaleString("en-BD")}
                </span>
              </div>

              <button className="w-full py-2 rounded bg-teal-500 hover:bg-teal-600 text-white text-base font-medium cursor-pointer">
                Proceed to Checkout
              </button>

              <div className="flex items-start gap-2 text-sm mt-2">
                <Checkbox className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500 focus-visible:ring-teal-500" />
                <label htmlFor="terms" className="leading-snug">
                  I have read and agree to the Terms and Conditions, Privacy
                  Policy and Refund and Return Policy
                </label>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
