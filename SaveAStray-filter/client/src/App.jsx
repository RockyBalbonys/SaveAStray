import { Route, Routes, useLocation } from "react-router-dom";
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
import Verify from "./Pages/Verify";
import TermsOfServices from "./Pages/TermsOfServices";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Sheets from "./Pages/Sheets";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Articles from "./Pages/Articles";
import ArticlePage from "./Pages/ArticlePage";
import FAQ from "./Pages/FAQ";

function App() {
  const location = useLocation();

  const renderNavbar = () => {
    const { pathname } = location;
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/terms" ||
      pathname === "/policy" ||
      pathname === "/verify"
    ) {
      return null;
    }
    return <Navbar />;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {renderNavbar()}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/animals" element={<Animals />} />
          {/* <Route path="/learn" element={<Learn />} /> */}
          <Route path="/articles/" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfServices />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/uploadImage" element={<UploadImage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/api/sheets" element={<Sheets />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
