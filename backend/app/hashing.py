from passlib.context import CryptContext


# create instance select algorithm, update old algo
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# hash password with selected algo, verify
class Hash:
    @staticmethod
    def bcrypt(password: str):
        return pwd_context.hash(password)

    @staticmethod
    def verify(hashed_password, plain_password):
        return pwd_context.verify(plain_password, hashed_password)
