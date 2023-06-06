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


  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={!isAuth ? <LoginPage /> : <NotFound />} />
          <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
