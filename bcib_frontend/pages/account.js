import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/authContext';
import Head from 'next/head';
import axios from 'axios';
import { format } from 'date-fns';
import AddressPopup from '../components/addressPopup';

const MyAccount = () => {
    const { client, authToken } = useAuth();
    const [clienteData, setClienteData] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const headers = { Authorization: `Token ${authToken}` };
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/clientes/obtener-datos-cliente/${client.customer_id}/`, { headers });
            setClienteData(response.data);
        } catch (error) {
            console.error('Error al obtener datos del cliente:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [authToken, client.customer_id]);
    const formattedDate = clienteData?.dob ? format(new Date(clienteData.dob), 'dd/MM/yyyy') : '';
    const handleSaveAddress = async (updatedAddress) => {
        try {
            console.log('Dirección actualizada:', updatedAddress);
            await fetchData();
        } catch (error) {
            console.error('Error al guardar la dirección:', error);
        }
    };

    return (
        <>
            <Head>
                <title>BCIB - Mi Perfil</title>
                <meta
                    name="description"
                    content="Detalle de tus tarjetas de crédito dentro del Banco Capital ITBA"
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className='grid place-items-center pb-5'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl p-2'>{clienteData?.customer_name} {clienteData?.customer_surname}</h1>
                <div className='grid gap-4 text-sm sm:text-lg m-5'>
                    <table className='bg-slate-200 rounded-lg m-10'>
                        <tbody>
                            <tr>
                                <td><label className='block font-bold p-1'>Fecha de Nacimiento:&nbsp;</label></td>
                                <td><p className='p-1'>{formattedDate}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>DNI:&nbsp;</label></td>
                                <td><p className='p-1'>{clienteData?.customer_dni}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>Dirección:&nbsp;</label></td>
                                <td><p className='p-1'>{clienteData?.direccion[0].calle} {clienteData?.direccion[0].numero} - {clienteData?.direccion[0].localidad} - {clienteData?.direccion[0].provincia}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>Mail:&nbsp;</label></td>
                                <td><p className='p-1'>{clienteData?.user.email}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>Teléfono:&nbsp;</label></td>
                                <td><p className='p-1'>{clienteData?.telefono}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mb-5">
                    <button className='btnRegistrarse'><Link className='text-white' href="profile/">Volver</Link></button>
                    <button className='btnRegistrarse' onClick={() => setIsPopupOpen(true)}>Modificar Dirección</button>
                </div>
            </div>
            <AddressPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSave={handleSaveAddress}
                initialData={clienteData?.direccion[0] || {}}
                authToken={authToken}
            />
        </>
    );
};

export default MyAccount;