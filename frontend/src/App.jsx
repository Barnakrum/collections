import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import routes from "./utilities/routes";
import ThemeSelector from "./components/utility/ThemeSelector";
import Topbar from "./components/Topbar";
import Menu from "./components/Menu";
import DisplayUser from "./components/auth/DisplayUser";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="flex flex-col justify-between h-full p-0 overflow-y-auto text-text bg-background">
                    <header className="w-full">
                        <Topbar>
                            <div>Logo/Name</div>
                            <div className="flex items-center gap-4">
                                <DisplayUser />
                                <Menu />
                            </div>
                        </Topbar>
                    </header>
                    <main className="w-full mx-auto md:w-5/6">
                        <Routes>
                            <Route path="/" index element={<Home />} />
                            {routes.map((route, index) => (
                                <Route key={index} path={route.path} element={route.element} />
                            ))}
                        </Routes>
                    </main>
                    <footer className="w-full ">FOOTER</footer>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
