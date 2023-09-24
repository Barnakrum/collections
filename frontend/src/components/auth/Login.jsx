import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div className="flex flex-col max-w-lg gap-4 p-4 m-auto text-xl border rounded-lg bg-text/5 border-text/30">
                <div className="text-3xl text-center text-primary">Login</div>
                <div className="flex flex-col gap-4">
                    <input className="" type="email" placeholder="Email" name="" id="email" />
                    <div>
                        <input className="w-full" type="password" placeholder="Password" name="" id="password" />
                        <div>
                            {/* TODO: forgot password needs implementation both frontend and backend */}
                            <Link to={"/forgot-password"} className="pl-1 m-0 text-sm underline text-accent">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button className="w-1/2 rounded-l-lg form-button bg-primary">Login</button>
                    <Link className="w-1/2 text-center rounded-r-lg form-button bg-primary/80" to={"/register"}>
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
};
export default Login;
