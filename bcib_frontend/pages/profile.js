import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from 'next/head';
import { useAuth } from '../components/authContext';

export default function Profile() {
    const router = useRouter();
    const { clientName, setClientName } = useAuth();

    useEffect(() => {
        // Actualizar el estado con el nombre del cliente al cargar la página
        if (clientName) {
          setClientName(clientName);
        }
      }, [clientName, setClientName]);

    return (
        <>
            <Head>
                <title>BCIB - Cuenta</title>
                <meta
                    name="description"
                    content="Cuenta dentro de Banco Capital ITBA"
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className="pb-10">
                <div>
                    <h1 className="mt-5 mb-12 text-3xl text-center">Bienvenido, {clientName}! </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-20">
                    <div className="bg-gray-300 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Cuenta</h2>
                        <p className="text-gray-600">454-875454/2</p>
                        <div className="pt-2">
                            <p className="font-bold text-2xl">$ 100.000</p>
                            <p className="font-bold text-2xl">U$S 1.000</p>
                        </div>
                    </div>
                    <div className="bg-blue-300 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Tarjeta Visa</h2>
                        <p className="text-gray-600">Termina en: 7807</p>
                        <p className="pt-2">Últimos consumos:</p>
                        <div className="pt-2">
                            <p className="font-bold text-2xl">$ 5200,65</p>
                            <p className="font-bold text-2xl">U$S 0,0</p>
                        </div>
                    </div>
                    <div className="bg-orange-300 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Tarjeta Mastercard</h2>
                        <p className="text-gray-600">Termina en: 4825</p>
                        <p className="pt-2">Últimos consumos:</p>
                        <div className="pt-2">
                            <p className="font-bold text-2xl">$ 7566,41</p>
                            <p className="font-bold text-2xl">U$S 15,0</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
