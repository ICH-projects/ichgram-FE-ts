import type { JSX } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

export default function TemplateName(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
