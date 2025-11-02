from abc import ABC, abstractmethod

from src.auth.domain.entities.auth import RegisterUser, User
from src.auth.domain.entities.user import UserOut


class UserRepository(ABC):
    @abstractmethod
    async def find_all(self) -> list[UserOut]:
        pass

    @abstractmethod
    async def find_by_email(self, email: str) -> UserOut:
        pass

    @abstractmethod
    async def update(self, data: RegisterUser) -> UserOut:
        pass

    @abstractmethod
    async def delete(self, email: str):
        pass
