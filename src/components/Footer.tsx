import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import Image from "next/image";
import google from "../../public/google.png";
import apple from "../../public/apple.png";
import payment from "../../public/payment.png";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white text-sm">
      <Container>
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.png" alt="Falcon Logo" width={30} height={30} />
              <span className="text-xl font-bold">FALCON</span>
            </div>
            <p className="text-gray-300 mb-4">
              Experience our new platform & enjoy exciting deals and offers on
              your day to day
            </p>
            {/* Contact Info */}
            <ul className="text-gray-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="bg-white text-[#0F172A] p-1 rounded-full">
                  <GoLocation />
                </span>
                <p className="text-sm leading-snug">
                  House #64, Road 13, ASA Center,
                  <br />
                  Uttara, Dhaka-1402
                </p>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white text-[#0F172A] p-1 rounded-full">
                  <HiOutlinePhone />
                </span>
                01729-1497201
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-white text-[#0F172A] p-1 rounded-full">
                  <HiOutlineMail />
                </span>
                falcon@gmail.com
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-5">
              <p>Follow us on</p>
              <span className="bg-white text-[#0F172A] p-1 rounded-full cursor-pointer">
                <FaFacebookF />
              </span>
              <span className="bg-white text-[#0F172A] p-1 rounded-full cursor-pointer">
                <FaInstagram />
              </span>
              <span className="bg-white text-[#0F172A] p-1 rounded-full cursor-pointer">
                <FaTwitter />
              </span>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Cancellation & Returns</li>
              <li>Terms of Use</li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">HELP</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Payments</li>
              <li>Shipping</li>
              <li>My Orders</li>
              <li>FAQs</li>
              <li>Terms of Use</li>
              <li>Security</li>
              <li>Privacy</li>
            </ul>
          </div>

          {/* Support & App Download */}
          <div>
            {/* Support */}
            <h3 className="text-white font-semibold mb-4">Need Support?</h3>
            <div className="mb-4">
              <div className="flex items-center border text-white px-4 py-2 rounded w-max font-medium">
                <HiOutlinePhone className="mr-2 text-teal-600" />
                10724-7814XX
              </div>
            </div>

            {/* App Download Links */}
            <h3 className="text-gray-200 font-semibold mb-4">DOWNLOAD APP</h3>
            <div className="space-y-3">
              <Image src={google} alt="Google Play" width={140} height={40} />
              <Image src={apple} alt="App Store" width={140} height={40} />
            </div>
          </div>
        </div>

        {/* Payments Accepted */}
        <div className="text-center text-gray-400 text-xs">
          <div className="flex justify-center items-center gap-2 mb-2">
            <p className="text-white font-medium">PAYMENTS ACCEPTED</p>
            <Image src={payment} alt="Visa" width={200} height={200} />
          </div>
          {/* Copyright */}
          <p className="border-t border-slate-700 py-5">
            Falcon ©2025. Design by xyz
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
