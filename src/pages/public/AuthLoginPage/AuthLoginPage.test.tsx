import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import rootReducer from "../../../redux/root-reducer";
import { type RootState } from "../../../redux/store";

import AuthLoginPage from "./AuthLoginPage";

// Мокаем loginUser, чтобы не было сетевых запросов
vi.mock("../../../redux/auth/auth-thunks", () => {
  const createAsyncThunkMock = (type: string) => ({
    pending: { type: `${type}/pending` },
    fulfilled: { type: `${type}/fulfilled` },
    rejected: { type: `${type}/rejected` },
  });

  return {
    loginUser: createAsyncThunkMock("auth/loginUser"),
    getCurrentUser: createAsyncThunkMock("auth/getCurrentUser"),
    refreshTokens: createAsyncThunkMock("auth/refreshTokens"),
    logoutUser: createAsyncThunkMock("auth/logoutUser"),
    signupUser: createAsyncThunkMock("auth/signupUser"),
    confirmEmail: createAsyncThunkMock("auth/confirmEmail"),
    resetPassword: createAsyncThunkMock("auth/resetPassword"),
    updatePassword: createAsyncThunkMock("auth/updatePassword"),
  };
});

describe("AuthLoginPage", () => {
  function renderWithStore(preloadedState?: Partial<RootState>) {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState,
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthLoginPage />
        </MemoryRouter>
      </Provider>
    );
  }

  test("renders without crashing", async () => {
    const defaultPersist = { version: -1, rehydrated: true };
    renderWithStore({
      auth: {
        loading: false,
        error: null,
        message: "",
        user: null,
        _persist: defaultPersist,
      },
    });

    // Тестируем что страница рендерится и есть ключевые элементы
    expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    await userEvent.type(
      screen.getByRole("textbox", { name: "email" }),
      "wrong_email"
    );
    expect(
      await screen.findByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    await userEvent.type(screen.getByPlaceholderText(/password/i), "some");
    await userEvent.clear(screen.getByPlaceholderText(/password/i));
    expect(
      await screen.findByText("password is a required field")
    ).toBeInTheDocument();
  });
});
