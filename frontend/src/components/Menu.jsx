import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelector from "./utility/ThemeSelector";
import { logout } from "../app/slices/session";
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
    const menuLinks = [{ to: "/", text: "Home" }];

    const navigate = useNavigate();

    const [menuContent, setMenuContent] = useState(document.getElementById("menu-content"));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
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
                        return (
                            <Link
                                className="p-2 hover:bg-text/50 md:hover:bg-transparent md:hover:text-primary md:h-full md:flex md:items-center md:px-6 "
                                onClick={() => {
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
                    <Link
                        className={(isLoggedIn ? "hidden" : "md:flex") + " p-2 hover:bg-text/50 md:hover:bg-transparent md:hover:text-primary md:h-full  md:items-center md:px-6"}
                        onClick={() => {
                            toggleMenu();
                        }}
                        to="/login">
                        Login
                    </Link>
                    <button
                        className={(isLoggedIn ? "md:flex" : "hidden") + " p-2 text-right hover:bg-text/50 md:hover:bg-transparent md:hover:text-primary md:h-full md:items-center md:px-6 "}
                        onClick={() => {
                            dispatch(logout());
                            navigate("/");
                            toggleMenu();
                        }}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Menu;
