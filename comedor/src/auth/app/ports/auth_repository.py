from abc import ABC, abstractmethod

from src.auth.domain.entities.auth import RegisterUser, User


class AuthRepository(ABC):
    @abstractmethod
    async def login(self, user_auth: User):
        pass

    @abstractmethod
    async def register(self, user_register: RegisterUser):
        pass
