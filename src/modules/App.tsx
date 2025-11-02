import type { JSX } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux/store";

import Navigation from "../pages/Navigation";

import { getCurrentUser } from "../redux/auth/auth-thunks";

import "/src/shared/styles/styles.css";


export default function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return <Navigation />;
}
