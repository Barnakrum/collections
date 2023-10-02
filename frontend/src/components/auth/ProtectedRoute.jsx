import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../utility/Spinner";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);

    if (isLoggedIn === undefined) {
        return (
            <div className="text-primary">
                <Spinner />
            </div>
        );
    }
    if (!isLoggedIn) {
        return <Navigate to={"/"} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
