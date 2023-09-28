import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../services/backend";
import { useEffect, useState } from "react";
import Spinner from "../utility/Spinner";
import { login as loginReducer } from "../../App/slices/session";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const [login, result] = useLoginMutation();

    const { isLoggedIn, username, id } = useSelector((state) => state.session);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [response, setResponse] = useState({});

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setResponse(await login({ email, password }));
    };

    useEffect(() => {
        if (result.isError) {
            setError(response.error.data.message);
        } else if (result.isSuccess) {
            dispatch(loginReducer({ id: response.data.id, username: response.data.username, isLoggedIn: true }));
            navigate("/");
        }
    }, [response]);

    return (
        <>
            <form onSubmit={(event) => handleLogin(event)} className="flex flex-col max-w-lg gap-4 p-4 m-auto text-xl border rounded-lg bg-text/5 border-text/30">
                <div className="text-3xl text-center text-primary">Login</div>
                <div className="flex flex-col gap-4">
                    <input
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                        className=""
                        type="email"
                        placeholder="Email"
                        name=""
                        id="email"
                    />
                    <div>
                        <input
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            value={password}
                            className="w-full"
                            type="password"
                            placeholder="Password"
                            name=""
                            id="password"
                        />
                        <div>
                            {/* TODO: forgot password needs implementation both frontend and backend */}
                            <Link to={"/forgot-password"} className="m-0 text-sm underline text-accent">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="p-0 mb-4 text-lg empty:m-0 text-error">{error}</div>
                    <div className="flex justify-between">
                        <button type="submit" disabled={result.isLoading} className="w-1/2 rounded-l-lg form-button bg-primary">
                            {result.isLoading ? <Spinner /> : "Login"}
                        </button>
                        <Link className="w-1/2 text-center rounded-r-lg form-button bg-primary/80" to={"/register"}>
                            Register
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Login;
