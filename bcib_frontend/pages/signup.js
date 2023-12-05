import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../components/input";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import { useAuth } from '../components/authContext';
import axios from 'axios';

export default function Login() {
  const methods = useForm();
  const router = useRouter();
  const { setIsLoggedIn, setClientName } = useAuth();

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log("data", data);
    try {
      // Realizar la solicitud HTTP a tu backend Django utilizando Axios
      const response = await axios.post('http://localhost:8000/login/', {
        username: data.Usuario,
        password: data.Contraseña,
      }, { withCredentials: true });
      setIsLoggedIn(true);
      setClientName(response.data.cliente.customer_name);
      await router.push(`/profile`);
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      console.error('Error de inicio de sesión:', error);
    }
  });

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
        {console.log("Form renderizado")}
          <form
            onSubmit={onSubmit}
            noValidate
            className="text-center m-4 p-4 sm:p-10 w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-300 rounded-xl"
          >
            <div className="grid gap-4">
              <Input
                label="Usuario"
                type="text"
                id="username"
                name="username"
                placeholder="Ingrese el usuario"
              />
              <Input
                label="Contraseña"
                type="password"
                id="password"
                name="password"
                placeholder="Ingrese la contraseña"
              />
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
      </div>
    </>
  );
}
