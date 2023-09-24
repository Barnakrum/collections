import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import routes from "./utilities/routes";
import ThemeSelector from "./components/utility/ThemeSelector";
import Topbar from "./components/Topbar";
import Menu from "./components/Menu";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="flex flex-col justify-around h-screen p-0 text-text bg-background">
                    <header className="w-full">
                        <Topbar>
                            <div>Logo/Name</div>
                            <Menu />
                        </Topbar>
                    </header>
                    <main className="flex-grow w-full h-10">
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
