import Home from "../components/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

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
];

export default routes;
