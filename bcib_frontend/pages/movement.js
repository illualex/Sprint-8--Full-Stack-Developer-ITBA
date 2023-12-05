import Link from 'next/link';
import React, { useState } from 'react';
import Head from 'next/head';

export default function Movement() {
    const [movimientos, setMovimientos] = useState([
        { fecha: '2023-08-25', descripción: 'Compra en tienda', monto: -600.00 },
        { fecha: '2023-08-24', descripción: 'Transferencia', monto: 780.00 },
        { fecha: '2023-08-23', descripción: 'Retiro en cajero', monto: -3000.00 }
    ]);
    const [mostrarDetalleIndex, setMostrarDetalleIndex] = useState(null);
    const toggleDetalle = (index) => {
        setMostrarDetalleIndex(mostrarDetalleIndex === index ? null : index);
    };
    return (
        <>
            <Head>
                <title>BCIB - Actividad</title>
                <meta
                    name="description"
                    content="Actividad de tu perfil dentro del banco"
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className="container mx-auto px-4">
                <h1 className="mt-5 mb-5 text-3xl text-center">Actividad de la Cuenta</h1>
                <section id="movement">
                    <div className="overflow-x-auto mb-10 text-left">
                        <table className="min-w-full border-collapse border">
                            <thead>
                                <tr>
                                    <th className="border p-3">Fecha</th>
                                    <th className="border p-3">Descripción</th>
                                    <th className="border p-3">Monto</th>
                                    <th className="border p-3">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movimientos.map((movimiento, index) => (
                                    <tr key={index}>
                                        <td className="border p-3">{movimiento.fecha}</td>
                                        <td className="border p-3">{movimiento.descripción}</td>
                                        <td className="border p-3">{movimiento.monto > 0 ? '+' : '-'}$ {Math.abs(movimiento.monto).toFixed(2)}</td>
                                        <td className="border p-3 text-sm">
                                            <button className='btnRegistrarse' onClick={() => toggleDetalle(index)}>Ver Detalle</button>
                                            {mostrarDetalleIndex === index && (
                                                <div className="dropdown mt-4">
                                                    <ul className="detalle-list">
                                                        <li>Sucursal: 000 - Casa Central</li>
                                                        <li>Referencia: 165215</li>
                                                        <li>Fecha: {movimiento.fecha} | 15:25 hs</li>
                                                        <li>Descripción: {movimiento.descripción}</li>
                                                        <li>Monto: {movimiento.monto > 0 ? '+' : '-'}$ {Math.abs(movimiento.monto).toFixed(2)}</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}