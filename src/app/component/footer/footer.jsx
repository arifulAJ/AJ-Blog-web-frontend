import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-alice-blue  md:px-32 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Links */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-button-color hover:text-hover-effect">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-button-color hover:text-hover-effect">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-button-color hover:text-hover-effect">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-button-color hover:text-hover-effect">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl mb-2">Contact Us</h2>
          <p className="text-gray-600">Email: info@example.com</p>
        </div>

        {/* Email Subscription */}
        <div className="px-4">
          <h2 className="text-xl mb-2">Subscribe to our Newsletter</h2>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="border rounded-l px-4 py-2 w-16  focus:outline-none focus:ring-2 focus:ring-button-color flex-grow"
            />
            <button className="bg-button-color  text-white sm:px-4 py-2 rounded-r hover:bg-hover-effect focus:outline-none focus:ring-2 focus:ring-button-color">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* Copyright Notice */}
      <div className="text-center mt-4 text-gray-600">
        &copy; {new Date().getFullYear()} AJ Tech Company. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
