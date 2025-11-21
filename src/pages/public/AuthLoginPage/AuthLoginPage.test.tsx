import {
  render,
  screen,
  waitFor,
  type RenderResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { server } from "./mocks/server";

import rootReducer from "../../../redux/root-reducer";
import { type RootState, store } from "../../../redux/store";

import AuthLoginPage from "./AuthLoginPage";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

  test("renders login page with essential UI elements", async () => {
    renderWithStore({
      auth: {
        loading: false,
        error: null,
        message: "",
        user: null,
        _persist: defaultPersist,
      },
    });

    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("displays validation error for invalid email input", async () => {
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

  test("displays required field error when password is empty", async () => {
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

  test("submits form and displays success message after API login", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthLoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Login successfully/i)).toBeInTheDocument();
    });
  });
});
