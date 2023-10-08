import ProtectedRoute from "../components/auth/ProtectedRoute";

import Home from "../components/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import RegisterSucess from "../components/auth/RegisterSucess";
import VerifyEmail from "../components/auth/VerifyEmail";
import PostCollection from "../components/collection/PostCollection";
import CollectionPage from "../components/collection/CollectionPage";
import PostCollectionImage from "../components/collection/PostCollectionImage";
import UserProfile from "../components/user/UserProfile";

const routes = [
    //auth
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
    //collections
    {
        path: "/collection/:id",
        element: <CollectionPage />,
    },
    {
        path: "collection/postImage/:id",
        element: <PostCollectionImage />,
    },
    //user
    {
        path: "/user/:id",
        element: <UserProfile />,
    },
];

export default routes;
