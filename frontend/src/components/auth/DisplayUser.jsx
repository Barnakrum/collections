import { useEffect } from "react";
import { useSelector } from "react-redux";

useEffect(() => {}, []);

const DisplayUser = () => {
    const { username, isLoggedIn } = useSelector((state) => state.session);

    return <div className={isLoggedIn ? "" : "hidden"}>Hello, {username}</div>;
};

export default DisplayUser;
