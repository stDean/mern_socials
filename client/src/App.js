import { Routes, Route } from "react-router-dom";

import { HomePage, LoginPage, ProfilePage } from "containers";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="profile/:userId" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
