import { Route, Routes, useLocation } from "react-router-dom";
// import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Animals from "./Pages/Animals";
import Learn from "./Pages/Learn";
import Donate from "./Pages/Donate";
import Contact from "./Pages/Contact";
import UploadImage from "./Pages/UploadImage";
import Login from "./Pages/Login";

function App() {
  const location = useLocation();

  const renderNavbar = () => {
    const { pathname } = location;
    if (pathname === "/login" || pathname === "/signup") {
      return null;
    }
    return <Navbar />;
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/uploadImage" element={<UploadImage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
