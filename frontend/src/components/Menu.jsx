import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "./utility/ThemeSelector";
import { logout } from "../app/slices/session";
import { useSelector, useDispatch } from "react-redux";
import { useLazyLogoutQuery } from "../services/backend";

const Menu = () => {
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);

    const menuLinks = [
        { to: "/", text: "Home", callback: () => {} },
        isLoggedIn
            ? {
                  to: "/",
                  text: "Logout",
                  callback: () => {
                      dispatch(logout());
                      triggerLogout();
                  },
              }
            : {
                  to: "/login",
                  text: "Login",
                  callback: () => {},
              },
        isLoggedIn
            ? {
                  to: "/collection/post",
                  text: "Add collection",
                  callback: () => {},
              }
            : "",
    ];

    const [triggerLogout] = useLazyLogoutQuery();

    const navigate = useNavigate();

    const [menuContent, setMenuContent] = useState(document.getElementById("menu-content"));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setMenuContent(document.getElementById("menu-content"));
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen((isMenuOpen) => !isMenuOpen);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    toggleMenu();
                }}
                className="md:invisible">
                <span className={(isMenuOpen ? "rotate-90" : "") + " ease-linear material-symbols-outlined text-primary text-3xl transition-transform"}>menu</span>
            </button>
            <div
                id="menu-content"
                className={
                    (isMenuOpen ? "" : "translate-x-full") +
                    " bg-background right-0 ease-linear transition-transform absolute top-[var(--topbar-height)] h-[calc(100%-var(--topbar-height))] w-[70%]  md:visible md:static md:right-0 md:top-0 md:-m-4  md:h-[var(--topbar-height)] md:translate-x-0 md:w-fit md:bg-transparent"
                }>
                <div className="flex flex-col w-full h-full text-2xl text-right bg-text/20 md:flex-row md:items-center md:bg-transparent md:text-lg">
                    {menuLinks.map((link, index) => {
                        return link === "" ? (
                            <></>
                        ) : (
                            <Link
                                className="p-2 hover:bg-text/50 md:hover:bg-transparent md:hover:text-primary md:h-full md:flex md:items-center md:px-6 "
                                onClick={() => {
                                    link.callback();
                                    toggleMenu();
                                }}
                                key={index}
                                to={link.to}>
                                {link.text}
                            </Link>
                        );
                    })}

                    <div className="w-full p-2 md:px-6 md:h-full md:flex md:items-center md:hover:bg-transparent hover:bg-text/50">
                        <ThemeSelector />
                    </div>
                    <button
                        onClick={() => {
                            console.log(menuLinks);
                        }}>
                        conosle
                    </button>
                </div>
            </div>
        </>
    );
};

export default Menu;
