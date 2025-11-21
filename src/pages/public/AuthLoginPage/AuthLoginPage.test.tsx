import { render, screen, type RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import rootReducer from "../../../redux/root-reducer";
import { type RootState } from "../../../redux/store";
import { loginUser } from "../../../redux/auth/auth-thunks";

import AuthLoginPage from "./AuthLoginPage";

type MockAsyncThunk = ((
  args: unknown
) => (dispatch: unknown) => Promise<{ type: string; payload: unknown }>) & {
  pending: { type: string };
  fulfilled: { type: string };
  rejected: { type: string };
};
// Мокаем loginUser, чтобы не было сетевых запросов
vi.mock("../../../redux/auth/auth-thunks", () => {
  const createAsyncThunkMock = (type: string): MockAsyncThunk => {
    const thunk = vi.fn((args: unknown) => async (dispatch: unknown) => {
      return { type: `${type}/fulfilled`, payload: args };
    }) as unknown as MockAsyncThunk;

    thunk.pending = { type: `${type}/pending` };
    thunk.fulfilled = { type: `${type}/fulfilled` };
    thunk.rejected = { type: `${type}/rejected` };

    return thunk;
  };

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

interface RenderWithStoreResult extends RenderResult {
  store: ReturnType<typeof configureStore>;
}

function renderWithStore(
  preloadedState?: Partial<RootState>
): RenderWithStoreResult {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const utils = render(
    <Provider store={store}>
      <MemoryRouter>
        <AuthLoginPage />
      </MemoryRouter>
    </Provider>
  );
  return { ...utils, store };
}

describe("AuthLoginPage", () => {
  const defaultPersist = { version: -1, rehydrated: true };

  test("renders without crashing", async () => {
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
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("shows error message on invalid email", async () => {
    renderWithStore({
      auth: {
        loading: false,
        error: null,
        message: "",
        user: null,
        _persist: defaultPersist,
      },
    });

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(emailInput, "wrong_email");
    expect(
      await screen.findByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    await userEvent.type(emailInput, "correct@email.com");
    expect(
      screen.queryByText("Please enter a valid email address.")
    ).not.toBeInTheDocument();
  });

  test("shows error message on empty password", async () => {
    renderWithStore({
      auth: {
        loading: false,
        error: null,
        message: "",
        user: null,
        _persist: defaultPersist,
      },
    });

    const passwordInput = screen.getByPlaceholderText(/password/i);
    await userEvent.type(passwordInput, "somepassword");
    expect(
      screen.queryByText("password is a required field")
    ).not.toBeInTheDocument();
    await userEvent.clear(passwordInput);
    expect(
      await screen.findByText("password is a required field")
    ).toBeInTheDocument();
  });

  test("dispatches loginUser on valid form submission", async () => {
    renderWithStore({
      auth: {
        loading: false,
        error: null,
        message: "",
        user: null,
        _persist: defaultPersist,
      },
    });

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(loginUser).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
