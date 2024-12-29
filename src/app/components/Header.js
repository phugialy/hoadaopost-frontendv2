"use client";

import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Image from "next/image";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = (event) => {
    setIsDarkMode(event.target.checked);
    if (event.target.checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
       <title>2025 HOA DAO Official</title>
       
      {/* Left Section: Logo Text */}
      <div className="text-xl font-bold">HOA DAO</div>

      {/* Center Section: Navigation Link */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <a
          href="#schedule"
          className="font-bold text-lg hover:text-orange-500 focus:outline-none"
        >
          Schedule
        </a>
      </div>

      {/* Right Section: Toggle and Logo */}
      <div className="flex items-center space-x-4 transform -translate-x-6">
        <div className="scale-90">
          <Switch
            checked={isDarkMode}
            onChange={toggleMode}
            inputProps={{ "aria-label": "Theme Toggle" }}
          />
        </div>

        {/* Logo */}
        <div className="relative w-14 h-14">
            <Image
                src="/logo.png"
                alt="Logo"
                className="object-contain"
                fill
            />
        </div>

      </div>
    </header>
  );
};

export default Header;
