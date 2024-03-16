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
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Articles from "./Pages/Articles";
import ArticlePage from "./Pages/ArticlePage";
import FAQ from "./Pages/FAQ";
import { DeadEnd } from "./Pages/DeadEnd";
import { renderNavbar } from "./renderNavbar";
import Questionnaire from "./Pages/Questionnaire";
import { AccountPawrent } from "./Pages/AccountPawrent";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./tools/store";
import { AccountShelter } from "./Pages/AccountShelter";
import useAuth from "./hooks/useAuth";
import Test from "./Pages/Test";

function App() {
  const { isLoggedIn, role } = useAuth();
  // Reroute user to manage account depending on their role
  const isPawrent =
    isLoggedIn && role === "Adoptive Pawrent" ? (
      <AccountPawrent />
    ) : isLoggedIn && role === "Rescue Shelter" ? (
      <AccountShelter />
    ) : (
      <Login />
    );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          {renderNavbar()}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/manage" element={isPawrent} />
            <Route path="/animals" element={<AnimalsShelter />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/articles/" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/deadend" element={<DeadEnd />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
