import { useMemo } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { HomePage, LoginPage, ProfilePage } from "containers";
import { themeSettings } from "./theme";
import { NotFound } from "components";

function App() {

  const { mode, token } = useSelector(({ auth }) => auth);
  // only change the theme when the mode changes
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(token);
  console.log(isAuth);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={!isAuth ? <LoginPage /> : <NotFound />} />
          <Route path="home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path="profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
