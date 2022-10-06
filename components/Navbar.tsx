import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { createOrGetUser } from "../utils";
import Logo from "../public/streamy.svg";

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full border-b-2 border-gray-200 py-2 px-4">
      <div className="max-w-7xl m-auto flex justify-between items-center">
        <Link href="/">
          <div className="w-[100px] md:w-[129px]">
            <Image
              className="cursor-pointer"
              src={Logo}
              alt="logo"
              layout="responsive"
            />
          </div>
        </Link>

        <div className="relative hidden md:block">
          <form
            onSubmit={handleSearch}
            className="absolute md:static top-10 -left-20 bg-white"
          >
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="bg-primary p-3 md:text-md border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[300px] rounded-full  md:top-0"
              placeholder="Search accounts and videos"
            />
            <button
              onClick={handleSearch}
              className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-xl text-gray-400"
            >
              <BiSearch />
            </button>
          </form>
        </div>
        <div>
          {user ? (
            <div className="flex gap-5 md:gap-10 items-center">
              <Link href="/upload">
                <button className="border-2 px-2 md:px-4 py-2 text-md font-semibold flex items-center gap-2 rounded-full">
                  <IoMdAdd className="text-xl" />{" "}
                  <span className="hidden md:block">Upload </span>
                </button>
              </Link>
              {user.image && (
                <Link href={`/profile/${user._id}`}>
                  <div className="flex">
                    <Image
                      className="rounded-full cursor-pointer"
                      src={user.image}
                      alt="user"
                      width={42}
                      height={42}
                    />
                  </div>
                </Link>
              )}
              <button
                type="button"
                className=" border-2 p-3 rounded-full cursor-pointer outline-none shadow-md"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              >
                <AiOutlineLogout color="red" fontSize={16} />
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={response => createOrGetUser(response, addUser)}
              onError={() => console.log("Login Failed")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
