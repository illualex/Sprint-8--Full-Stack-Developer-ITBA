import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Input } from "../components/input";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import { useAuth } from '../components/authContext';
import axios from 'axios';
import NotificationPopup from '../components/notificationPopup';

export default function Login() {
  const methods = useForm();
  const { register, handleSubmit, control, setValue } = methods;
  const router = useRouter();
  const { setIsLoggedIn, setClient, setAuthToken, setIsEmployee } = useAuth();
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username: data.Usuario,
        password: data.Contraseña,
        isEmployee: data.isEmployee || false,
      }, { withCredentials: true });
      setAuthToken(response.data.token);
      setIsLoggedIn(true);
      if (data.isEmployee) {
        setIsEmployee(true);
        setClient(response.data.empleado);
        await router.push(`/employee`);
      } else {
        setIsEmployee(false);
        setClient(response.data.cliente);
        await router.push(`/profile`);
      }
      setError(null);
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        } else if (error.response.status === 404) {
          setError('Usuario no encontrado. Por favor, verifique sus credenciales.');
        } else {
          setError('Hubo un problema al procesar la solicitud. Por favor, inténtalo más tarde.');
        }
      } else if (error.request) {
        setError('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.');
      } else {
        setError('Hubo un problema al procesar la solicitud. Por favor, inténtalo más tarde.');
      }
    }
  };
  const isEmployee = useWatch({
    control,
    name: 'isEmployee',
    defaultValue: false,
  });
  const handleNotificationClose = () => {
    setError(null);
  };

  return (
    <>
      <Head>
        <title>BCIB - Iniciar Sesión</title>
        <meta
          name="description"
          content="Iniciar sesión en Banco Capital ITBA"
        />
        <meta
          name="robots"
          content="index, follow"
        />
      </Head>
      <div className="grid place-items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="text-center m-4 p-4 sm:p-10 w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-300 rounded-xl"
          >
            <div className="grid gap-4">
              <Input
                label="Usuario"
                type="text"
                id="username"
                name="Usuario"
                placeholder="Ingrese el usuario"
              />
              <Input
                label="Contraseña"
                type="password"
                id="password"
                name="Contraseña"
                placeholder="Ingrese la contraseña"
              />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="isEmployee"
                {...register('isEmployee')}
              />
              <label htmlFor="isEmployee" className="ml-2">¿Eres un empleado?</label>
            </div>
            <div className="grid place-content-center mt-4">
              <button
                type="submit"
                className="btnRegistrarse w-full"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </FormProvider>
        {error && (
          <NotificationPopup message={error} onClose={handleNotificationClose} />
        )}
      </div>
    </>
  );
}
