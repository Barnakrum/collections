import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../../services/backend";
import Spinner from "../utility/Spinner";

const Register = () => {
    const navigate = useNavigate();

    const [register, result] = useRegisterMutation();
    const [response, setResponse] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        setError("");
        if (!(passwordConfirm === password)) {
            setError("Passwords do not match");
            return;
        }
        setResponse(await register({ password, username, email }));
    };

    useEffect(() => {
        if (result.isError) {
            setError(response.error.data.message);
        } else if (result.isSuccess) {
            navigate("/email-activation");
        }
    }, [response]);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [error, setError] = useState("");

    return (
        <>
            <form
                onSubmit={(event) => {
                    handleRegister(event);
                }}
                className="flex flex-col max-w-lg gap-4 p-4 m-auto text-xl border rounded-lg bg-text/5 border-text/30">
                <div className="text-3xl text-center text-primary">Register</div>
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
                    <input
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        value={username}
                        className="w-full"
                        type="text"
                        placeholder="Username"
                        name=""
                        id="username"
                    />
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
                    <input
                        onChange={(event) => {
                            setPasswordConfirm(event.target.value);
                        }}
                        value={passwordConfirm}
                        className="w-full"
                        type="password"
                        placeholder="Confirm password"
                        name=""
                        id="confirm-password"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="p-0 mb-4 text-lg empty:m-0 text-error">{error}</div>
                    <div className="flex justify-between">
                        <button type="submit" disabled={result.isLoading} className="w-1/2 rounded-l-lg form-button bg-primary">
                            {result.isLoading ? <Spinner /> : "Register"}
                        </button>
                        <Link className="w-1/2 text-center rounded-r-lg form-button bg-primary/80" to={"/login"}>
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Register;
