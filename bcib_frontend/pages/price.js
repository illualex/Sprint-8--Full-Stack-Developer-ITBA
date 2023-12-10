import Link from 'next/link';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Head from 'next/head';

export default function Price() {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [amount, setAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    useEffect(() => {
        fetch("https://v6.exchangerate-api.com/v6/caed938467e0116fc0f6a437/latest/ARS")
            .then((response) => response.json())
            .then((data) => {
                const currenciesList = Object.keys(data.conversion_rates);
                setCurrencies(currenciesList);
            })
            .catch((error) => {
                console.error("Error fetching currency list:", error);
            });
    }, []);
    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/caed938467e0116fc0f6a437/pair/ARS/${selectedCurrency}`)
            .then((response) => response.json())
            .then((data) => {
                const rate = data.conversion_rate;
                setExchangeRate(rate);
            })
            .catch((error) => {
                console.error("Error fetching exchange rate:", error);
            });
    }, [selectedCurrency]);
    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    return (
        <>
            <Head>
                <title>BCIB - Cotización</title>
                <meta
                    name="description"
                    content="Cotizador virtual de monedas"
                />
                <meta
                    name="robots"
                    content="noindex, follow"
                />
            </Head>
            <h1 className="mt-5 text-3xl text-center">Cotización de Monedas</h1>
            <div className="flex justify-center items-center m-14">
                <div className="w-full max-w-md bg-gray-300 rounded-lg">
                    <section id="left-column" className="w-full p-4">
                        <label className="block text-lg">Ingresa el monto deseado a cambiar</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Cantidad en pesos"
                            className="w-full border p-2 rounded"
                        />
                        <section id="ops" className="mt-4">
                            <select
                                id="moneda"
                                value={selectedCurrency}
                                onChange={handleCurrencyChange}
                                className="w-full border p-2 rounded"
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </section>
                    </section>
                    <section id="right-column" className="w-full p-4">
                        <label className="block text-lg">El cambio final es de:</label>
                        <p className="bg-white p-2 rounded">
                            {exchangeRate ? (amount * exchangeRate).toFixed(2) : "Cargando..."} {selectedCurrency}
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}