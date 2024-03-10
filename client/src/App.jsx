import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";
import AnimalsShelter from "./Pages/AnimalsShelter";
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
import { DeadEnd } from "./Pages/DeadEnd";
import { renderNavbar } from "./renderNavbar";
import AnimalsPawrent from "./Pages/AnimalsPawrent";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        {renderNavbar()}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          {/* TODO: Role Routing */}
          <Route path="/animals" element={<AnimalsShelter />} />
          <Route path="/animalsPawrent" element={<AnimalsPawrent />} />
          <Route path="/articles/" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/deadend" element={<DeadEnd />} />
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
