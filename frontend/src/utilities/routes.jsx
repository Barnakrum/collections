import Home from "../components/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyEmail from "../components/auth/VerifyEmail";

const routes = [
    {
        path: "/",
        index: true,
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/verify-email/:token/:email",
        element: <VerifyEmail />,
    },
];

export default routes;
