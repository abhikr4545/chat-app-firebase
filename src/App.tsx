import { Routes, Route } from "react-router-dom";
import ChannelChatsContainer from "./components/ChannelChatsContainer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./pages/Signup";


const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/channel/:id" element={<ChannelChatsContainer />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
