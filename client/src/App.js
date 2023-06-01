import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { HomePage, LoginPage, ProfilePage } from "containers";
import { themeSettings } from "./theme";

function App() {

  const mode = useSelector(({ auth }) => auth.mode);
  // only change the theme when the mode changes
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
