"use client";

import { FaFacebook, FaInstagram, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 p-4 shadow-md flex justify-between items-center">
      {/* Footer Notes */}
      <p className="font-bold">
        Welcome to the official website of HOA DAO LION DANCE 2025.
      </p>

      {/* Social Media Links */}
      <div className="flex space-x-4">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=100063902301552"
          target="_blank"
          rel="noopener noreferrer"
          className="text-current hover:opacity-80 text-xl"
        >
          <FaFacebook />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/hoadaoliondance/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-current hover:opacity-80 text-xl"
        >
          <FaInstagram />
        </a>

        {/* Website */}
        <a
          href="https://www.2025hoadaoteam.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-current hover:opacity-80 text-xl"
        >
          <FaGlobe />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
