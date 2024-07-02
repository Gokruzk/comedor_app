import { Menu, User } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const foodAPI = axios.create({
  baseURL: API_URL,
});

//get menus

export const getMenus = async () => {
  try {
    const res = await foodAPI.get(`/menus`);
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

export const addMenu = async (menu: Menu) => {
  console.log(menu)
  try {
    const res = await foodAPI.post("/menus", menu);
    if (res.status == 200) {
      return { status: 200 };
    } else {
      return { status: 401, error: "Error en la creación del menú" };
    }
  } catch (error) {
    console.error("Error en la creación del menú", error);
  }
  return { status: 401, error: "Error en la creación del menú" };
};

// export const updateUser = async (usuario: string, user: User) => {
//   try {
//     console.log(user);
//     const res = await foodAPI.put(`/usuarios/${usuario}`, user);
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

export const deleteFood = async (id_menu: string) => {
  try {
    const res = await foodAPI.delete(`/menus/${id_menu}`);
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
