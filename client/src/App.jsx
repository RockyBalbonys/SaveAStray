// react router imports
import { Navigate, Route, Routes } from "react-router-dom";

// import pages
import NotFound from "./Pages/NotFound";
import About from "./Pages/About";
import Donate from "./Pages/Donate";
import Contact from "./Pages/Contact";
import Articles from "./Pages/Articles";
import ArticlePage from "./Pages/ArticlePage";
import FAQ from "./Pages/FAQ";
import Questionnaire from "./Pages/Questionnaire";
import RequestShelter from "./Pages/RequestShelter";
import RequestPawrent from "./Pages/RequestPawrent";
import AnimalsShelter from "./Pages/Dashboard/AnimalsShelter";
import AccountPawrent from "./Pages/Account/AccountPawrent";
import AccountShelter from "./Pages/Account/AccountShelter";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import Home from "./Pages/Home";
import Verify from "./Pages/Redirect/Verify";
import DeadEnd from "./Pages/Redirect/DeadEnd";
import SocketPractice from "./Pages/UnusedPage/SocketPractice"

// import mui components, theme, functions
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";

// import render navbar logic
import { renderNavbar } from "./renderNavbar";

// import tools
import useAuth from "./hooks/useAuth";
import ScrollToTop from "./tools/scrollToTop";
import DeadEnd2 from "./Pages/Redirect/DeadEnd2";
import Messages from "./Pages/Messages";

function App() {
  const { isLoggedIn, role, user } = useAuth();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          {renderNavbar()}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/manage"
              element={
                isLoggedIn ? (
                  role === "Adoptive Pawrent" ? (
                    <AccountPawrent />
                  ) : role === "Rescue Shelter" ? (
                    <AccountShelter />
                  ) : (
                    <Navigate to="/login" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/manage/pawrent"
              element={
                isLoggedIn ? <AccountPawrent /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/manage/shelter"
              element={
                isLoggedIn ? <AccountShelter /> : <Navigate to="/login" />
              }
            />
            <Route path="/animals" element={<AnimalsShelter />} />
            <Route
              path="/questionnaire/:shelterId"
              element={<Questionnaire />}
            />
            {/* <Route path="/rescue/" element={<RequestShelter />} />
            <Route path="/reqpawrent" element={<RequestPawrent />} /> */}
            <Route
              path="/request/pawrent"
              element={
                isLoggedIn ? <RequestPawrent /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/request/shelter"
              element={
                isLoggedIn ? <RequestShelter /> : <Navigate to="/login" />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/articles/" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/deadend" element={<DeadEnd />} />
            <Route path="/adoptionSubmitted" element={<DeadEnd2 />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/socketPractice" element={<SocketPractice />} />
            <Route path="/messages/t/:roomId" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
