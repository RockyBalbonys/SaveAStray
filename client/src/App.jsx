// create your assigned pages e.g. Login, Signup, Landing Page, and;
// import your created pages here in the app: `import LandingPage from './LandingPage.jsx';`

import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Animals from "./Pages/Animals";
import Learn from "./Pages/Learn";
import Donate from "./Pages/Donate";
import Contact from "./Pages/Contact";
import logo from "./assets/icons/SAS_Logo4.png";
import { pages } from "./constants/landingPage";
import UploadImage from "./Pages/UploadImage";



function App() {
  return (
    <>
      <Navbar pages={pages} logo={logo} />
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
