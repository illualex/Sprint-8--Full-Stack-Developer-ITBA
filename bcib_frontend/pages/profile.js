import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import { useAuth } from '../components/authContext';
import axios from 'axios';

export default function Profile() {
    const router = useRouter();
    const { client, setClient, authToken } = useAuth();
    const [cuenta, setCuenta] = useState(null);
    const hasFetchedData = useRef(false);
    const [tarjetas, setTarjetas] = useState([]);

    useEffect(() => {
        if (!authToken || hasFetchedData.current) {
            return;
        }
        if (client) {
            setClient(client);
        }
        const headers = { Authorization: `Token ${authToken}` };
        axios.get(`http://localhost:8000/clientes/obtener-balance/${client.customer_id}/`, { headers })
            .then(response => {
                setCuenta(response.data);
                hasFetchedData.current = true;
            })
            .catch(error => {
                console.error('Error al obtener la cuenta:', error);
            });
        axios.get('http://localhost:8000/tarjetas/obtener-tarjetas/', { headers })
            .then(response => {
                setTarjetas(response.data.resultados);
            })
            .catch(error => {
                console.error('Error al obtener las tarjetas:', error);
            });
    }, [client, setClient, authToken, router, client.customer_id]);

    const getTarjetaInfo = (tipoTarjeta) => {
        const tarjetaInfo = tarjetas.find(tarjeta => tarjeta.tipo_tarjeta === tipoTarjeta);
        return tarjetaInfo || {};
    };
    const getLast4Digits = (tarjetaNumero) => {
        return tarjetaNumero ? tarjetaNumero.slice(-4) : '';
    };

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
                    <h1 className="mt-5 mb-12 text-3xl text-center">Bienvenido, {client.customer_name}! </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-20">
                    <div className="bg-gray-300 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Cuenta</h2>
                        {cuenta !== null && (
                            <>
                                <p className="text-gray-600">{cuenta.numero_cuenta}</p>
                                <div className="pt-2">
                                    <p className="font-bold text-2xl">$ {parseFloat(cuenta.balance).toLocaleString()}</p>
                                    <p className="font-bold text-2xl">U$S 0,0</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="bg-blue-300 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Tarjeta Visa</h2>
                        {tarjetas.length > 0 && (
                            <>
                                <p className="text-gray-600">Termina en: {getLast4Digits(getTarjetaInfo(2).tarjeta_numero)}</p>
                                <p className="pt-2">Últimos consumos:</p>
                                <div className="pt-2">
                                    <p className="font-bold text-2xl">$ {parseFloat(getTarjetaInfo(2).saldo_pendiente).toLocaleString()}</p>
                                    <p className="font-bold text-2xl">U$S 0,0</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="bg-orange-300 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Tarjeta Mastercard</h2>
                        {tarjetas.length > 0 && (
                            <>
                                <p className="text-gray-600">Termina en: {getLast4Digits(getTarjetaInfo(1).tarjeta_numero)}</p>
                                <p className="pt-2">Últimos consumos:</p>
                                <div className="pt-2">
                                    <p className="font-bold text-2xl">$ {parseFloat(getTarjetaInfo(1).saldo_pendiente).toLocaleString()}</p>
                                    <p className="font-bold text-2xl">U$S 0,0</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}