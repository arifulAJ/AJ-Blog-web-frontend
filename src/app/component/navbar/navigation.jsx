"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import ProfilePopup from "../profilePopUP/profilePopUp";

import { useRouter } from "next/navigation";

import {
  getTokenFromServer,
  getUserbyToken,
} from "../utils/tokenvarifay/tokenApi";

const NavigationBar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [isToken, setIsToken] = useState(null);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getTokenFromServer()
      .then((fetchedToken) => {
        if (fetchedToken) {
          setIsToken(fetchedToken);
        } else {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserbyToken();
        setAvatar(userData.avatar); // Set the avatar property in the state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
        `https://ar-blog-api.onrender.com/api/v1/articles?page=1&limit=5&sort_type=dec&sort_by=title&search=${searchQuery}`,
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
  console.log(isToken, "nabe bar");
  return (
    <header className="pl-2 md:px-14 bg-hover-effect">
      <nav className="p-2">
        <div className="">
          <div className="md:flex   md:items-center md:justify-between ">
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
              className={` md:flex flex-row md:flex-row items-center  md:space-y-0 font-semibold md:space-x-6 ${
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

              {isToken ? undefined : ( // </li> //   <Profile /> // <li className="hover:text-button-color">
                <li className="hover:text-button-color">
                  <Link href="/signup">Signup</Link>
                </li>
              )}

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
              {isToken !== null ? (
                <li className="w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    // className="rounded-full hover:border-r-white hover:border-2  hover:font-bold hover:border-solid"
                    className="rounded-full hover:border-r-white hover:border-2 hover:font-bold hover:border-solid"
                    src={
                      avatar ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/768px-OOjs_UI_icon_userAvatar-progressive.svg.png"
                    }
                    height={100}
                    width={100}
                    alt="profile"
                    onClick={() =>
                      setIsProfilePopupVisible(!isProfilePopupVisible)
                    }
                  />{" "}
                </li>
              ) : undefined}
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
      {isProfilePopupVisible && <ProfilePopup />}
    </header>
  );
};

export default NavigationBar;
