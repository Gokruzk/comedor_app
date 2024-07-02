import { Menu, User } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const foodAPI = axios.create({
  baseURL: API_URL,
});

//get menus for admin

export const getMenus = async () => {
  try {
    const res = await foodAPI.get(`/menus/all/`);
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

export const getMenusUser = async () => {
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

export const getMenu = async (id_menu: string) => {
  try {
    const res = await foodAPI.get(`/menus/${id_menu}`);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "El menú no existe" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "El menú no existe" };
};

export const addMenu = async (menu: Menu) => {
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

export const updateMenu = async (menu: Menu) => {
  try {
    const res = await foodAPI.put(`/menus/${menu.id_menu}`, menu);
    if (res.status == 200) {
      return { status: 200 };
    } else {
      return { status: 401, error: "Error en la actualización del menú" };
    }
  } catch (error) {
    console.error("Error en la actualización del menú", error);
  }
  return { status: 401, error: "Error en la actualización del menú" };
};

export const deleteFood = async (id_menu: string) => {
  try {
    const res = await foodAPI.delete(`/menus/${id_menu}`);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "El menú no existe" };
    }
  } catch (error) {
    console.log(error);
  }
  return { status: 400, error: "El menú no existe" };
};
