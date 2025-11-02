from dataclasses import dataclass


@dataclass
class User:
    username: str
    password: str


@dataclass
class RegisterUser:
    id_user_type: int
    name: str
    password: str
    last_name: str
    email: str
    phone: str
    dni: str
