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
import PostItem from "../components/item/PostItem";
import ItemPage from "../components/item/ItemPage";

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
    //item
    {
        path: "/item/post/:id",
        element: <PostItem />,
    },
    {
        path: "/item/:id",
        element: <ItemPage />,
    },
];

export default routes;
