"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import getAllArticle from "../libs/getAllArticle";

const NavigationBar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    // Implement your search logic here using the searchQuery state
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/articles?page=1&limit=5&sort_type=dec&sort_by=title&search=${searchQuery}`,
        { cache: "no-cache" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();

      // Handle the search results (e.g., update state with results)
      setSearchResults(data.articles);
    } catch (error) {
      console.error("Error searching articles:", error);
    }
    console.log("Search query:", searchQuery);
    setSearchQuery("");
  };

  return (
    <header className="pl-2 md:px-14 bg-hover-effect">
      <nav className="p-2">
        <div className="">
          <div className="md:flex  md:items-center md:justify-between ">
            <div className="flex justify-between items-center text-white font-bold text-xl mb-2 md:mb-0">
              <Link href="/">
                <Image
                  className="rounded w-full md:w-16"
                  src="/aj-logo-design_811396-284.jpg"
                  width={40}
                  height={40}
                  alt="AJ.Tech logo"
                />
              </Link>
              <div className="md:hidden">
                {!isMenuVisible ? (
                  <button
                    className="bg-button-color hover:bg-hover-effect text-white text-lg font-bold py-2 px-4 rounded"
                    onClick={toggleMenu}
                  >
                    <GiHamburgerMenu />
                  </button>
                ) : (
                  <button
                    className="bg-button-color hover:bg-hover-effect text-white  py-2 px-4 rounded"
                    onClick={toggleMenu}
                  >
                    <ImCross />
                  </button>
                )}
              </div>
            </div>

            <ul
              className={` md:flex flex-row md:flex-row  md:space-y-0 font-semibold md:space-x-6 ${
                isMenuVisible ? "block" : "hidden"
              }`}
            >
              <li className="hover:text-button-color">
                <Link href="/home">Home</Link>
              </li>
              <li className="hover:text-button-color">
                <Link href="/tags">Tags</Link>
              </li>
              <li className="hover:text-button-color">
                <Link href="/article">Articles</Link>
              </li>
              <li className="hover:text-button-color">
                <Link href="/contact">Contact</Link>
              </li>

              <li className="hover:text-button-color">
                <Link href="/signup">Signup</Link>
              </li>
              <li>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    className="px-2 py-1 rounded  "
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />{" "}
                  {/* <button type="submit">Submit</button> */}
                </form>
              </li>
            </ul>
          </div>
          {/* Display search results */}
          {/* <div>
        <h2>Search Results:</h2>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div> */}
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
