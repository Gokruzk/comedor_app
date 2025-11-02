from dataclasses import dataclass
from datetime import datetime

from src.auth.domain.value_objects.value_objects import (
    Dni,
    Email,
    Lastname,
    Phone,
    Username,
)


@dataclass
class UserBase:
    id_user_type: int
    name: Username
    last_name: Lastname
    email: Email
    phone: Phone
    dni: Dni


@dataclass
class UserUpdate:
    balance: float


@dataclass
class UserOut(UserBase):
    id_user: int
    balance: float
    created_date: datetime

    class Config:
        from_attributes = True


@dataclass
class UserType:
    id_user_type: int
    description: str
    percent_discount: int

    class Config:
        from_attributes = True


@dataclass
class UserWithType:
    user: UserOut
    type: UserType
