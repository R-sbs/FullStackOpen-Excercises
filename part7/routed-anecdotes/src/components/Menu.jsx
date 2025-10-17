import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export const Menu = () => {
  const location = useLocation();
  const [isSelected, setIsSelected] = useState("");

  const MENU_ITEMS = [
    {
      name: "anecdotes",
      link: "/anecdotes",
    },
    {
      name: "create new",
      link: "/create-new",
    },
    {
      name: "about",
      link: "/about",
    },
  ];

  useEffect(() => {
    const highlightedMenuItem = MENU_ITEMS.find(
      (e) => e.link === location.pathname
    );

    if (highlightedMenuItem) {
      setIsSelected(highlightedMenuItem.link);
    } else {
      setIsSelected("");
    }
  }, [location]);

  return (
    <div className="flex gap-4 capitalize">
      {MENU_ITEMS.map((e) => (
        <Link
          key={e.name}
          to={e.link}
          className={e.link === isSelected ? "font-semibold" : ""}
        >
          {e.name}
        </Link>
      ))}
    </div>
  );
};
