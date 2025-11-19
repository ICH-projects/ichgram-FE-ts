import { Routes, Route } from "react-router-dom";

import PublicPageWrapper from "./PublicPageWrapper/PublicPageWrapper.js";
import PrivatePageWrapper from "./PrivatePageWrapper/PrivatePageWrapper.js";

// import NotFoundPage from "/src/pages/NotFoundPage/NotFoundPage";

import AuthLoginPage from "./AuthLoginPage/AuthLoginPage";
// import AuthSignupPage from "/src/pages/AuthSignupPage/AuthSignupPage";
// import AuthResetPasswordPage from "/src/pages/AuthResetPasswordPage/AuthResetPasswordPage";
// import AuthConfirmPage from "/src/pages/AuthConfirmPage/AuthConfirmPage";

import HomePage from "./HomePage/HomePage";
import ExplorePage from "./ExplorePage/ExplorePage";
import ChatPage from "./ChatPage/ChatPage";
import ProfilePage from "./ProfilePage/ProfilePage";

import PublicRoute from "../routes/PublicRoute.js";
import PrivateRoute from "../routes/PrivateRoute.js";

export default function Navigation() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="*" element={<PrivatePageWrapper />}>
          <Route path="" element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="messages" element={<ChatPage />} />
          <Route path="messages/:member2Id" element={<ChatPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path="/auth" element={<PublicRoute />}>
        <Route path="*" element={<PublicPageWrapper />}>
          <Route path="login" element={<AuthLoginPage />} />
          {/* <Route path="signup" element={<AuthSignupPage />} /> */}
          {/* <Route path="reset" element={<AuthResetPasswordPage />} /> */}
          {/* <Route path="verify" element={<AuthConfirmPage />} /> */}
        </Route>
      </Route>

      {/* <Route path="/learn-more" element={<LearnMorePage />} /> */}
      {/* <Route path="/terms" element={<TermsPage />} /> */}
      {/* <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> */}
      {/* <Route path="/cookies-policy" element={<CookiePolicyPage />} /> */}

      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
