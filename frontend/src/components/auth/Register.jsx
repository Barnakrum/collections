import { Link } from "react-router-dom";

const Register = () => {
    return (
        <>
            <div className="flex flex-col max-w-lg gap-4 p-4 m-auto text-xl border rounded-lg bg-text/5 border-text/30">
                <div className="text-3xl text-center text-primary">Register</div>
                <div className="flex flex-col gap-4">
                    <input className="" type="email" placeholder="Email" name="" id="email" />
                    <input className="w-full" type="text" placeholder="Username" name="" id="username" />
                    <input className="w-full" type="password" placeholder="Password" name="" id="password" />
                    <input className="w-full" type="password" placeholder="Confirm password" name="" id="confirm-password" />
                </div>

                <div className="flex justify-between">
                    <button className="w-1/2 rounded-l-lg form-button bg-primary">Register</button>

                    <Link className="w-1/2 text-center rounded-r-lg form-button bg-primary/80" to={"/login"}>
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
};
export default Register;
