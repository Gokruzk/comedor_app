from dataclasses import dataclass


@dataclass(frozen=True)
class Username:
    value: str

    def __post_init__(self):
        if not (1 <= len(self.value) <= 100):
            raise ValueError("Username length must be between 1 and 100")


@dataclass(frozen=True)
class Lastname:
    value: str

    def __post_init__(self):
        if not (1 <= len(self.value) <= 100):
            raise ValueError("Lastname length must be between 1 and 100")


@dataclass(frozen=True)
class Email:
    value: str

    def __post_init__(self):
        if not (1 <= len(self.value) <= 100):
            raise ValueError("Lastname length must be between 1 and 100")


@dataclass(frozen=True)
class Dni:
    value: str

    def __post_init__(self):
        if not (len(self.value) <= 10):
            raise ValueError("Lastname length must be between 1 and 100")


@dataclass(frozen=True)
class Password:
    value: str

    def __post_init__(self):
        if not (1 <= len(self.value) <= 200):
            raise ValueError("Password length must be between 1 and 100")


@dataclass(frozen=True)
class Phone:
    value: str

    def __post_init__(self):
        if not (len(self.value) == 10):
            raise ValueError("Phone length must be between 1 and 100")
