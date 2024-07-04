import { UserResponse } from "@/types";
import axios, { AxiosError } from "axios";

export async function getUserSession(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/me");
    return {
      user: data.usuario,
      error: null,
      type: data.type
    };
  } catch (e) {
    return {
      error: e as AxiosError,
    };
  }
}
