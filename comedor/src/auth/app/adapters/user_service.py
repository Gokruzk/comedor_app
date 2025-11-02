from auth.app.ports.user_repository import UserRepository
from auth.domain.exceptions.exceptions import AuthBaseError, AuthUserNotFoundError
from src.auth.domain.entities.auth import RegisterUser, User
from src.auth.domain.entities.user import UserOut


class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def find_all(self) -> list[UserOut]:
        try:
            users = await self.user_repo.find_all()
            if not users:
                raise AuthUserNotFoundError("No users")

            return users
        except AuthUserNotFoundError:
            raise
        except Exception as e:
            print(e)
            raise AuthBaseError("Unexpected Error")

    async def find_by_email(self, email: str) -> UserOut:
        try:
            user = await self.user_repo.find_by_email(email)
            if not user:
                raise AuthUserNotFoundError(f"User with email {email} not exists")

            return user

        except AuthUserNotFoundError:
            raise
        except Exception as e:
            print(e)
            raise AuthBaseError("Unexpected Error")

    async def update(self, data: RegisterUser) -> userout:
        try:
            user = await self.user_repo.find_by_email(email)
            if not user:
                raise AuthUserNotFoundError(f"User with email {email} not exists")

            user_updated = await self.user_repo.update(data)

            return user_updated
        except AuthUserNotFoundError:
            raise
        except Exception as e:
            print(e)
            raise AuthBaseError("Unexpected Error")

    async def delete(self, email: str):
        try:
            user = await self.user_repo.find_by_email(email)
            if not user:
                raise AuthUserNotFoundError(f"User with email {email} not exists")

            await self.user_repo.delete(email)

        except AuthUserNotFoundError:
            raise
        except Exception as e:
            print(e)
            raise AuthBaseError("Unexpected Error")
