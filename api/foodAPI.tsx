"use server";
import { COOKIE_NAME } from "@/constants";
import { CreateDiningReservation, Menu } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";
import { getUser } from "./userAPI";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const foodAPI = axios.create({
  baseURL: API_URL,
});

//get menus for admin

export const getMenus = async () => {
  const token = cookies().get(COOKIE_NAME)?.value;
  try {
    const res = await foodAPI.get(`/menus/all/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error consultando menús" };
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
  return { status: 400, error: "Error consultando menús" };
};

export const getUserMenus = async () => {
  const token = cookies().get(COOKIE_NAME)?.value;
  try {
    const res = await foodAPI.get(`/menus`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error consultando menús" };
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
  return { status: 400, error: "Error consultando menús" };
};

export const getMenusUser = async () => {
  try {
    const res = await foodAPI.get(`/menus`);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "The user does not exist" };
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        errors: error.response,
        detail: error.response?.data.detail,
      };
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        errors: error.response,
        detail: error.response?.data.detail,
      };
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        error: error.response?.data.detail,
        detail: error.response?.data.detail,
      };
    }
  }
  return { status: 400, error: "El menú no existe" };
};

export const diningReservation = async (
  reservation: CreateDiningReservation
) => {
  try {
    const user = await getUser(reservation.email);
    const newReservation = {
      id_menu: reservation.id_menu,
      id_user: user.data.user.id_user,
      reservation_date: reservation.reservation_date,
      reservation_hour: reservation.reservation_hour,
    };
    const res = await foodAPI.post(`/dinings`, newReservation);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error creando la reservación" };
    }
  } catch (error: unknown) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        errors: error.response,
        detail: error.response?.data.detail,
      };
    }
  }
  return { status: 400, error: "Error creando la reservación" };
};

export const getDinings = async () => {
  const token = cookies().get(COOKIE_NAME)?.value;
  try {
    const res = await foodAPI.get(`/dinings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "Error consultando reservaciones" };
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
  return { status: 400, error: "Error consultando reservaciones" };
};

export const verifyQR = async (qrData: string) =>{
  try {
    const res = await foodAPI.post(`/qr_codes/validate_qr`, qrData);
    if (res.status == 200) {
      return { status: 200, data: res.data };
    } else {
      return { status: 400, error: "La reserva no existe" };
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
  return { status: 400, error: "La reserva no existe" };
}