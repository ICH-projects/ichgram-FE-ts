import type { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";

export default function TemplateName(): ReactNode {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<PrivatePageWrapper />}>
          <Route path="" element={<HomePage />} />
        </Route>
      </Route>
      <Route path="/auth" element={<PublicRoute />}>
        <Route path="*" element={<PublicPageWrapper />}>
          <Route path="login" element={<AuthLoginPage />} />
          <Route path="signup" element={<AuthSignupPage />} />
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
