import { initializeApp } from "firebase/app";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout";
import { ADMIN_ROUTES, AUTH_ROUTES } from "./routes";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyA4jGSvvsyvbzdOLuGr2kT_kQqu4c9oSxE",
    authDomain: "plan-a-9c87a.firebaseapp.com",
    databaseURL: "https://plan-a-9c87a-default-rtdb.firebaseio.com",
    projectId: "plan-a-9c87a",
    storageBucket: "plan-a-9c87a.firebasestorage.app",
    messagingSenderId: "384458740748",
    appId: "1:384458740748:web:c905aff03469dbbeff8a29",
  };

  const app = initializeApp(firebaseConfig);
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
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
      </SnackbarProvider>
    </>
  );
}

export default App;
