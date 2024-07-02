import { AxiosError } from "axios";

export interface User {
  id_user?: number;
  id_user_type: number;
  user_name: string;
  user_last_name: string;
  cedula: string;
  email: string;
  hash_password?: string;
  cellphone: string;
  balance: number;
  created_date: string;
  user_type?: UserType;
  card?: Card;
  dining_reservations?: DiningReservation;
}

export interface UserType {
  id_user_type: number;
  description: string;
  percent_discount: number;
}

export interface Card {
  id_card?: number;
  id_user: number;
  card_number: string;
  exp_month: string;
  exp_year: string;
}

export interface Suggest {
  id_suggest?: number;
  suggestion: string;
  created_date: string;
}

export interface DiningReservation {
  id_reservation: number;
  id_menu: number;
  id_user: number;
  id_status: number;
  reservation_date: string;
  reservation_hour: string;
  created_date: string;
  total_cost: number;
  menu: Menu;
  reserve_status: ReserveStatus;
}

export interface Menu {
  id_menu: number;
  id_menu_type: number;
  id_meal_time: number;
  menu_title: string;
  menu_description: string;
  status: boolean;
  price: number;
}

export interface MenuType {
  id_menu_type: number;
  menu_type: string;
}

export interface MealTime {
  id_meal_time: number;
  meal_time: string;
  init_hour: string;
  end_hour: string;
}

export interface MenuItem {
  menu: Menu;
  menu_type: MenuType;
  meal_time: MealTime;
}

export interface ReserveStatus {
  id_status: number;
  reserve_status: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserName {
  user_name: string;
}

export interface UserResponse {
  user?: UserName;
  error: AxiosError | null;
}

export interface UserSt {
  username: UserName | null;
  authUser: (user: UserName) => void;
  removeSession: () => void;
}

export interface UserState {
  user: User | null;
  authUser: (user: User) => void;
  removeSession: () => void;
}

export interface Params {
  params: {
    labId: string;
  };
}

export interface ButtonProps {
  title: string;
  style: string;
  onClick: () => void;
}

export interface LinkButtonProps {
  title: string;
  href: string;
  style: string;
}
