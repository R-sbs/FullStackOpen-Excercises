import React from "react";
import { useUser } from "../hooks/useUser";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const MENU_ITEMS = [
  { name: "Blogs", link: "/" },
  { name: "Users", link: "/users" },
];

const Header = () => {
  const { user } = useUser();
  return (
    <div className="w-full my-4 flex justify-between items-center">
      <div className="text-start">
        <h2 className="text-3xl font-semibold">
          Hi <span className="">{user && user.name}</span>, Welcome to{" "}
          <span className="text-blue-500">Blog Buddy</span>
        </h2>
        <p>Add the blogs you like and read them whenever you want.</p>
      </div>
      <div className="flex gap-4 items-center">
        {MENU_ITEMS.map((each) => {
          return (
            <Link
              key={each.name}
              to={each.link}
              className="p-1 px-4 rounded-sm hover:bg-black hover:text-white font-semibold"
            >
              {each.name}
            </Link>
          );
        })}
        <Logout />
      </div>
    </div>
  );
};

export default Header;
