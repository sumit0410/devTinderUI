import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./pages/Feed";
import { Toaster } from "react-hot-toast";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
