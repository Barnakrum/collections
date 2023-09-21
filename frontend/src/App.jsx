import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import routes from "./utilities/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex h-screen flex-col justify-around p-0">
          <header className="w-full bg-slate-600 text-yellow-300">
            HEADER
          </header>
          <main className="h-10 w-full flex-grow bg-gray-500 text-yellow-300">
            <Routes>
              <Route path="/" index element={<Home />} />
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
          <footer className="w-full bg-slate-600 text-yellow-300">
            FOOTER
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
