import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import SearchResults from "./pages/searchResults/SearchResults";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/search"
          element={user ? <SearchResults /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
