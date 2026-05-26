import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./Body";
// import Login from "./pages/Login";
import Profile from "./pages/Profile";
// import SignUp from "./pages/SignUp";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./pages/Feed";
import { Toaster } from "react-hot-toast";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import Chat from "./pages/Chat";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
