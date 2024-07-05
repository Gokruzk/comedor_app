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

export interface CreateDiningReservation {
  id_menu: number;
  email: string;
  reservation_date: string;
  reservation_hour: string;
}

export interface Menu {
  id_menu?: number;
  id_menu_type: number;
  id_meal_time: number;
  menu_title: string;
  menu_description: string;
  status?: boolean;
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
  email: string;
}

export interface UserResponse {
  user?: string;
  error: AxiosError | null;
  type?: number | null;
}

export interface UserSt {
  email: string | null;
  authUser: (email: string) => void;
  removeSession: () => void;
}

export interface UserState {
  user: User | null;
  authUser: (user: User) => void;
  removeSession: () => void;
}

export interface Params_Menu {
  params: {
    id_menu: string;
  };
}

export interface MenuForm {
  id_menu: string;
}

export interface ButtonProps {
  title: string;
  style: string;
  onClick: () => void;
}

export interface LinkButtonProps {
  title: string;
  href: string;
  style?: string;
}

export interface DeleteButtonProps {
  title: string;
  style: string;
  onClick(): void;
}
export interface BuyCardProps {
  menu: MenuItem;
  reservationMutation: Function
}
export interface NavBarProps {
  title: string;
  href: string;
  nbuttons?: number;
  linkbuttons?: LinkButtonProps[];
}
