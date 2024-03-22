import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";
import AnimalsShelter from "./Pages/AnimalsShelter";
import Donate from "./Pages/Donate";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Verify from "./Pages/Verify";
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
import { AccountShelter } from "./Pages/AccountShelter";
import useAuth from "./hooks/useAuth";
import Test from "./Pages/UnusedPage/Test";
import { Home } from "./Pages/Home";
import { NewLogin } from "./Pages/NewLogin";
import RequestShelter from "./Pages/RequestShelter";
import RequestPawrent from "./Pages/RequestPawrent";
import ScrollToTop from "./tools/scrollToTop";
import NewSignup from "./Pages/NewSignup";

function App() {
  const { isLoggedIn, role, user } = useAuth();
  console.log("Logged in: " + isLoggedIn);
  console.log("Role: " + role);

  // Reroute user to manage account depending on their role
  // const isPawrent =
  //   isLoggedIn && role === "Adoptive Pawrent" ? (
  //     <AccountPawrent />
  //   ) : isLoggedIn && role === "Rescue Shelter" ? (
  //     <AccountShelter />
  //   ) : (
  //     <Login />
  //   );

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          {renderNavbar()}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newLogin" element={<NewLogin />} />
            <Route path="/newSignup" element={<NewSignup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/manage" element={<AccountPawrent />} />
            <Route path="/manage" element={<AccountShelter />} />
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
            <Route path="/reqshelter" element={<RequestShelter />} />
            <Route path="/reqpawrent" element={<RequestPawrent />} />
          </Routes>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
