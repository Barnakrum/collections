import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import routes from "./utilities/routes";
import ThemeSelector from "./components/utility/ThemeSelector";
import Topbar from "./components/Topbar";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="text-text bg-background flex h-screen flex-col justify-around p-0">
                    <header className=" w-full ">
                        <Topbar>
                            <div>Logo/Name</div>
                            <ThemeSelector />
                        </Topbar>
                    </header>
                    <main className=" h-10 w-full flex-grow ">
                        <Routes>
                            <Route path="/" index element={<Home />} />
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Routes>
                    </main>
                    <footer className=" w-full">FOOTER</footer>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
