"use client"; //! Note- Make this component client so we use gsap for animation

import gsap from "gsap"; //GSAP import
import Link from "next/link"; // here Link component part of next js here we don't need to use to like react
import { useEffect, useRef } from "react";

const Navigation = () => {
  const dropDownRef = useRef(null); // now pointing to actual dropdown UL
  const hoverTweenRef = useRef(null);

  //^ GSAP old Method (GSAP works only in client components)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // set
      gsap.set(".links", {
        opacity: 0,
        y: -20,
        scale: 0.8,
      });

      // to
      gsap.to(".links", {
        stagger: 0.3,
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // clean up fun.
    return () => ctx.revert(); // for clear animation
  }, []);

  const handleMouseEnter = () => {
    if (!dropDownRef.current) return;

    if (hoverTweenRef.current) {
      hoverTweenRef.current.kill(); // kill any previous animation
    }

    dropDownRef.current.style.display = "block"; // make visible before animating

    // hover animation for dropdown container
    hoverTweenRef.current = gsap.fromTo(
      dropDownRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  };

  const handleMouseLeave = () => {
    if (!dropDownRef.current) return;

    // kill any existing hover animation
    if (hoverTweenRef.current) {
      hoverTweenRef.current.kill();
    }

    hoverTweenRef.current = gsap.to(dropDownRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        dropDownRef.current.style.display = "none"; // hide after animation
      },
    });
  };

  return (
    <section className="container mx-auto">
      <header className="flex justify-between items-center fixed z-50 px-6 py-4 bg-white/60 backdrop-blur-sm rounded-md w-full max-w-7xl left-1/2 transform -translate-x-1/2 text-nowrap">
        <div>Logo</div>
        <nav>
          <ul className="flex gap-6 items-center">
            <li className="links">
              <Link
                href="/"
                className="relative transition duration-300 hover:text-yellow-500 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-yellow-500 hover:before:w-full before:transition-all before:duration-500 hover:scale-105 transform inline-block"
              >
                Home
              </Link>
            </li>
            <li className="links">
              <Link
                href="/about"
                className="hover:text-yellow-500 transition duration-300"
              >
                About
              </Link>
            </li>
            <li className="links">
              <Link
                href="/about/section"
                className="hover:text-yellow-500 transition duration-300"
              >
                Section
              </Link>
            </li>
            <li className="links">
              <Link
                href="/contact"
                className="hover:text-yellow-500 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li className="links">
              <Link
                href="/client-comp"
                className="hover:text-yellow-500 transition duration-300"
              >
                Client-Component
              </Link>
            </li>
            <li className="links">
              <Link
                href="/server-comp"
                className="hover:text-yellow-500 transition duration-300"
              >
                Server-Component
              </Link>
            </li>

            {/* Dropdown */}
            <li
              className="group relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300">
                Section Dropdown
              </button>

              <ul
                ref={dropDownRef} // moved ref here to point to actual dropdown list
                style={{ display: "none" }} // hide initially
                className="absolute left-0 pt-1 w-48 bg-gray-600 rounded-md shadow-lg z-10 border border-gray-200"
              >
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-200">
                  Data A
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-200">
                  Data B
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-200">
                  Data C
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Navigation;
