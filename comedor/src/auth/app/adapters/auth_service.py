from src.auth.app.ports.auth_repository import AuthRepository
from src.auth.app.ports.user_repository import UserRepository
from src.auth.domain.entities.auth import RegisterUser, User
from src.auth.domain.exceptions.exceptions import (
    AuthBaseError,
    AuthUserAlreadyExistError,
    AuthUserNotFoundError,
)


class AuthService:
    def __init__(self, auth_repo: AuthRepository, user_repo: UserRepository):
        self.auth_repo = auth_repo
        self.user_repo = user_repo

    async def login(self, user_auth: User):
        try:
            user = await self.user_repo.find_by_email(user_auth.email)
            if not user:
                raise AuthUserNotFoundError(
                    f"The user with email {user_auth.email} not found"
                )

            user_authenticated = await self.auth_repo.login(user_auth)
        except AuthUserNotFoundError:
            raise
        except Exception as e:
            print(e)
            raise AuthBaseError("Unexpected error")

    async def register(self, user_register: RegisterUser):
        try:
            user = await self.user_repo.find_by_email(user_register.email)

            if not user:
                user = None

            if user:
                raise AuthUserAlreadyExistError(
                    f"The user with email{user_register.email} already exists"
                )

            user_post = await self.auth_repo.register(user_register)

            return user_post

        except AuthUserAlreadyExistError:
            raise
        except Exception as e:
            print(e)
            raise AuthBaseError("Unexpected error")
