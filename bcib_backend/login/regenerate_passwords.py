from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

def regenerate_password_for_user(username, new_password):
    User = get_user_model()
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        print(f"Usuario con el nombre de usuario {username} no encontrado.")
        return
    user.password = make_password(new_password)
    user.save()
    print(f"Contraseña regenerada para el usuario {username}.")

if __name__ == "__main__":
    nueva_contraseña = '123456'
    regenerate_password_for_user('moses', nueva_contraseña)
