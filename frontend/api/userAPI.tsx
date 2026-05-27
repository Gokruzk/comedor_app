"use server";
import { jwtVerify } from "jose";
import { Balance, Card, CardUser, User, UserLogin } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);

const userAPI = axios.create({
  baseURL: API_URL,
});

export const auth = async (user: UserLogin) => {
  try {
    const data = await userAPI.post("/login", user);
    console.log(data)
    if (data.data.status != 401) {
      const token = data.data.access_token;
      cookies().set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
      return { status: 200, token: token };
    } else {
      return { status: 404, error: "Usuario o contraseña incorrecta" };
    }
  } catch (error) {
    console.log(error)
    console.error("Error during authentication");
  }
  return { status: 404, error: "Usuario o contraseña incorrecta" };
};

export const logout = () => {
  try {
    cookies().set({
      name: COOKIE_NAME,
      value: "",
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    return { status: 200 };
  } catch (error) {
    console.error("Error during authentication", error);
  }
  return { status: 404, error: "Invalid username or password" };
};

// get user

export const getUser = async (email: string) => {
  const token = cookies().get(COOKIE_NAME)?.value;
  try {
    const res = await userAPI.get(`/users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "The user does not exist" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "The user does not exist" };
};

//add user
export const addUser = async (user: User) => {
  try {
    const res = await userAPI.post("/users", user);
    if (res.status == 200) {
      const userlogin = { email: user.email, password: user.hash_password };
      const res = await userAPI.post("/login", userlogin);
      cookies().set({
        name: COOKIE_NAME,
        value: res.data.access_token,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
      return { status: 200 };
    } else {
      return { status: 401, error: "Error en el registro del usuario" };
    }
  } catch (error) {
    console.error("Error en el registro del usuario", error);
  }
  return { status: 401, error: "Error en el registro del usuario" };
};

//add user
export const recoverPassword = async (user: UserLogin) => {
  try {
    const res = await userAPI.post("/recoverys", user);
    if (res.status == 200) {
      return { status: 200, detail: res.data.detail };
    } else {
      return { status: 401, detail: res.data.detail };
    }
  } catch (error) {
    console.error("Error cambiando contraseña", error);
  }
  return {
    data: "Error cambiando contraseña",
    detail: "Error cambiando contraseña",
  };
};

// export const updateUser = async (usuario: string, user: User) => {
//   try {
//     console.log(user);
//     const res = await userAPI.put(`/usuarios/${usuario}`, user);
//     if (res.data.status_code != 400) {
//       const au_res = await auth({
//         usuario: user.usuario,
//         contrasena: user.contrasena,
//       });
//       if (au_res.status == 200) {
//         // updateSessionLocal(au_res.token);
//         // return { status: 200, token: au_res.token };
//       }
//       return { status: 200 };
//     } else {
//       return {
//         status: 401,
//         error: `Error while updating user. Detail: ${res.data.detail}`,
//       };
//     }
//   } catch (error) {
//     console.error("Error during updating", error);
//   }
//   return { status: 401, error: "Error while updating user" };
// };

export const addCard = async (card: CardUser) => {
  const token = cookies().get(COOKIE_NAME)?.value;
  try {
    const user = await userAPI.get(`/users/email/${card.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const car: Card = {
      id_user: user.data.user.id_user,
      card_number: card.card_number,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
    };

    const res = await userAPI.post("/cards", car);
    if (res.status == 200) {
      console.log(res);
      return { status: 200 };
    } else {
      return { status: 401, error: "Error agregando la tarjeta" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        error: error.response?.data.detail,
        detail: error.response?.data.detail,
      };
    }
  }
  return { status: 401, error: "Error agregando la tarjeta" };
};

export const getUserBalance = async (email: string) => {
  const token = cookies().get(COOKIE_NAME)?.value;
  try {
    const user = await userAPI.get(`/users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await userAPI.get(`/users/balance/${user.data.user.id_user}`);
    if (res.status == 200) {
      return { status: 200, data: res.data.balance };
    } else {
      return { status: 401, error: "Error obteniendo saldo" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        error: error.response,
        detail: error.response?.data.detail,
      };
    }
  }
  return { status: 401, error: "Error obteniendo saldo" };
};

export const setUserBalance = async (balance: Balance) => {
  try {
    const res = await userAPI.post(`/users/balance`, balance);
    if (res.status == 200) {
      return { status: 200 };
    } else {
      return {
        status: 401,
        error: "Error actualizando el saldo de tu tarjeta",
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      return {
        status: error.response?.status,
        errors: error.response,
        detail: error.response?.data.detail,
      };
    }
  }
  return { status: 401, error: "Error actualizando el saldo de tu tarjeta" };
};

export const getUserCard = async (email: string) => {
  try {
    const user = await getUser(email);
    const res = await userAPI.get(`/cards/user_id/${user.data.user.id_user}`);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 401, error: "Error cargando la tarjeta" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        errors: error.response,
        detail: error.response?.data.detail,
      };
    }
  }
  return { status: 401, error: "Error cargando la tarjeta" };
};

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(COOKIE_NAME)?.value;
  if (!session) return;

  const res = NextResponse.next();
  res.cookies.set({
    name: COOKIE_NAME,
    value: session,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
  return res;
}

export async function updateSessionLocal(cookie: string) {
  cookies().set({
    name: COOKIE_NAME,
    value: cookie,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
}
