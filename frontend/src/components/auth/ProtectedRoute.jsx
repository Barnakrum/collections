import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    });

    return <>{children}</>;
};

export default ProtectedRoute;
