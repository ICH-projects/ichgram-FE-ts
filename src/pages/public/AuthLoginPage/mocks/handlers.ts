import { http } from "msw";

export const email = "test@example.com";
export const id = 1;

export const handlers = [
  http.post("/api/auth/login", () => {
    return new Response(JSON.stringify({ id, email }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
