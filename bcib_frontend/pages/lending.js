import Link from 'next/link';
import Image from "next/image";
import React, { useState } from 'react';
import Head from 'next/head';

export default function Lending() {
    const [monto, setMonto] = useState('');
    const [meses, setMeses] = useState('');
    const [resultadoTax, setResultadoTax] = useState(0);
    const [resultadoTotal, setResultadoTotal] = useState(0);
    const [cuotaMensual, setCuotaMensual] = useState(0);
    const calcularPorcentaje = (a, b) => {
        let interes;
        if (a <= 3) interes = 0.025; // 2.5%
        else if (a > 3 && a < 6) interes = 0.05; // 5% 
        else if (a >= 6 && a < 10) interes = 0.075; // 7.5% 
        else if (a >= 10 && a < 14) interes = 0.1; // 10%
        let operacion = b * a * interes;
        return operacion.toFixed(2);
    };
    const calcularTotal = (a, b) => {
        let number1 = parseInt(a);
        let number2 = parseInt(b);
        return (number1 + number2).toFixed(2);
    };
    const calcularCuota = (a, b) => {
        return (a / b).toFixed(2);
    };
    const handleCalcularClick = () => {
        if (monto === '' || meses === '') return;
        let taxResult = calcularPorcentaje(meses, monto);
        let final = calcularTotal(monto, taxResult);
        let taxMounth = calcularCuota(final, meses);
        setResultadoTotal(final);
        setResultadoTax(taxResult);
        setCuotaMensual(taxMounth);
    };
    const handleVerificacionClick = () => {
        if (monto === '') return;
        let confirmar = window.confirm("¿Estás seguro de realizar esta operación?");
        if (confirmar) {
            alert("Operación realizada con éxito, los fondos serán sumados a tu cuenta en los próximos días");
        } else {
            alert("Operación cancelada");
        }
    };

    return (
        <>
            <Head>
                <title>BCIB - Préstamos</title>
                <meta
                    name="description"
                    content="Calculadora de prestamos del Banco Capital ITBA"
                />
                <meta
                    name="robots"
                    content="noindex, follow"
                />
            </Head>
            <div className="grid place-items-center">
                <h1 className="mt-5 mb-6 text-2xl sm:text-3xl text-center">Préstamos</h1>
                <div className="w-full sm:w-3/4">
                    <div className="bg-gray-300 rounded-xl mx-5 p-4 space-y-6">
                        <section className="mb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-lg mt-2 mb-2 sm:mb-4">Ingrese su monto:</label>
                                    <input
                                        type="number"
                                        className="border rounded-lg p-2 sm:p-3"
                                        placeholder="Ingrese el Monto"
                                        value={monto}
                                        onChange={(e) => setMonto(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-lg mt-2 mb-2 sm:mb-4">Cantidad de meses:</label>
                                    <input
                                        type="number"
                                        className="border rounded-lg p-2 sm:p-3"
                                        placeholder="Ingrese los Meses"
                                        value={meses}
                                        onChange={(e) => setMeses(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid place-content-center m-5">
                                <button className="btnRegistrarse w-full" onClick={handleCalcularClick}>
                                    Simular
                                </button>
                            </div>
                        </section>
                        <hr />
                        <section className="grid place-content-center text-lg mt-4">
                            <p className="amount-result">Monto a devolver: ${resultadoTotal}</p>
                            <p className="month-tax">Cuota mensual: ${cuotaMensual}</p>
                            <p className="tax">Intereses: ${resultadoTax}</p>
                        </section>
                    </div>
                    <div className="bg-gray-300 rounded-xl p-4 my-5 mx-5 space-y-4">
                        <section className="text-center">
                            <h2 className="font-bold text-lg">Tabla de Intereses</h2>
                            <table className="table-auto mx-auto bg-white p-2 sm:p-4 rounded-2xl">
                                <tbody>
                                    <tr>
                                        <td className="w-1/2">Meses</td>
                                        <td className="w-1/2">Intereses</td>
                                    </tr>
                                    <tr>
                                        <td className="w-1/2">1-3</td>
                                        <td className="w-1/2">2.5%</td>
                                    </tr>
                                    <tr>
                                        <td className="w-1/2">4-5</td>
                                        <td className="w-1/2">5%</td>
                                    </tr>
                                    <tr>
                                        <td className="w-1/2">6-9</td>
                                        <td className="w-1/2">7.5%</td>
                                    </tr>
                                    <tr>
                                        <td className="w-1/2">10-14</td>
                                        <td className="w-1/2">7.5%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <div className="grid place-content-center">
                            <button className="btnRegistrarse w-full" id="verificacion" onClick={handleVerificacionClick}>
                                Solicitar Préstamo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}