import { AxiosError } from "axios";

export interface User {
  id_usuario?: string;
  usuario: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  celular: string;
  id_tipo: string;
}

export interface LinkButtonProps {
  title: string;
  href: string;
  style: string;
}

export interface UserLogin {
  usuario: string;
  contrasena: string;
}

export interface UserName {
  usuario: string;
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

export interface Labo {
  id_laboratorio?: number;
  nombre_lab: string;
  capacidad: number;
  equipos: number;
}

export interface ButtonProps {
  title: string;
  style: string;
  onClick: () => void;
}

export interface Params {
  params: {
    labId: string;
  };
}

export interface UpdateLabFormProps {
  labId: string;
}

export interface BookL {
  id_laboratorio: number;
  id_usuario: number;
  id_estado: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  id_reserva?: string;
}

export interface BookList extends BookL {
  laboratorio: Labo;
}
