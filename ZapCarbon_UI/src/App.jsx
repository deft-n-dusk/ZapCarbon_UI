import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Summary from "./pages/Summary";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute/>}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoute/>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
