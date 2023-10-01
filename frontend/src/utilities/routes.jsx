import ProtectedRoute from "../components/auth/ProtectedRoute";

import Home from "../components/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import RegisterSucess from "../components/auth/RegisterSucess";
import VerifyEmail from "../components/auth/VerifyEmail";
import PostCollection from "../components/collection/PostCollection";

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
    {
        path: "/email-activation",
        element: <RegisterSucess />,
    },
    {
        path: "/collection/post",
        element: (
            <ProtectedRoute>
                <PostCollection />
            </ProtectedRoute>
        ),
    },
];

export default routes;
