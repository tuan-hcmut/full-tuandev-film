import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import DetailMovies from "./pages/DetailFilm";
import Discovery from "./pages/Discovery";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import UserInfor from "./pages/UserInfor";
import Bookmark from "./pages/Bookmark";
import Recent from "./pages/Recent";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="search" element={<Search />} />
      <Route path="movie/:id" element={<DetailMovies />}></Route>
      <Route path="tv/:id" element={<DetailMovies />}></Route>
      <Route path="discovery" element={<Discovery />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="logout" element={<Logout />}></Route>
      <Route path="user/information" element={<UserInfor />}></Route>
      <Route path="bookmark" element={<Bookmark />}></Route>
      <Route path="recent" element={<Recent />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}

export default App;
