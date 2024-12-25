import { FormEvent } from "react";

export async function handleLoginSubmit(
  e: FormEvent,
  username: string,
  password: string,
  navigate: (path: string) => void,
) {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (res.status === 200) {
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/");
      return;
    }
    throw new Error(`Error status code of ${res.status}`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}

export async function handleLogout(navigate: (path: string) => void) {
  const res = await fetch("http://localhost:8080/logout", {
    method: "POST",
    credentials: "include",
  });
  if (res.status === 200) {
    sessionStorage.clear();
    navigate("/login");
  }
}
