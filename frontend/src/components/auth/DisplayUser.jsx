import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetRefreshTokenQuery, useLazyLogoutQuery } from "../../services/backend";
import { login, logout } from "../../App/slices/session";

const DisplayUser = () => {
    const { username, isLoggedIn } = useSelector((state) => state.session);
    const { data, error, isFetching, isLoading, isSuccess, isError } = useGetRefreshTokenQuery();
    const [triggerLogout] = useLazyLogoutQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                dispatch(login({ id: data.id, username: data.username, isLoggedIn: true }));
            } else {
                triggerLogout();
                dispatch(logout());
            }
        }
    }, [isLoading]);

    return (
        <div>
            <div className={isLoggedIn ? "" : "hidden"}>Hello, {username}</div>
        </div>
    );
};

export default DisplayUser;
