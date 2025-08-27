import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AUTH_ROUTES, ADMIN_ROUTES } from "./routes";
import MainLayout from "./layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {AUTH_ROUTES?.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={route.component}
            />
          ))}

          {ADMIN_ROUTES?.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={<MainLayout>{route.component}</MainLayout>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
