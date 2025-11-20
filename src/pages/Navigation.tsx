import { Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";

// Other pages
import CopyrightPage from "./other/CopyrightPage/CopyrightPage";
import LearnMorePage from "./other/LearnMorePage/LearnMorePage";
import TermsPage from "./other/TermsPage/TermsPage";
import PrivacyPolicyPage from "./other/PrivacyPolicyPage/PrivacyPolicyPage";
import CookiePolicyPage from "./other/CookiePolicyPage/CookiePolicyPage";
import NotFoundPage from "./other/NotFoundPage/NotFoundPage";

// Public pages
import PublicPageWrapper from "./public/PublicPageWrapper/PublicPageWrapper";
import AuthLoginPage from "./public/AuthLoginPage/AuthLoginPage";
import AuthSignupPage from "./public/AuthSignupPage/AuthSignupPage";
// import AuthResetPasswordPage from "/src/pages/AuthResetPasswordPage/AuthResetPasswordPage";
// import AuthConfirmPage from "/src/pages/AuthConfirmPage/AuthConfirmPage";

// Private pages
import PrivatePageWrapper from "./private/PrivatePageWrapper/PrivatePageWrapper";
import HomePage from "./private/HomePage/HomePage";
import ExplorePage from "./private/ExplorePage/ExplorePage";
import ChatPage from "./private/ChatPage/ChatPage";
import ProfilePage from "./private/ProfilePage/ProfilePage";

// Routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

export default function Navigation(): ReactNode {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<PrivatePageWrapper />}>
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
          <Route path="signup" element={<AuthSignupPage />} />
          {/* <Route path="reset" element={<AuthResetPasswordPage />} /> */}
          {/* <Route path="verify" element={<AuthConfirmPage />} /> */}
        </Route>
      </Route>

      <Route path="/learn-more" element={<LearnMorePage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/cookies-policy" element={<CookiePolicyPage />} />
      <Route path="/copyright" element={<CopyrightPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
