import Link from 'next/link';
import Image from "next/image";
import React, { useState } from 'react';
import Head from 'next/head';
import accounts from './bankAccounts/accounts';

export default function Transference({ accountOptions }) {
    const [montoDeSaldoBancario, setMontoDeSaldoBancario] = useState(100000);
    const [toAccount, setToAccount] = useState('');
    const [amount, setAmount] = useState(0);

    const handleTransfer = () => {
        if (amount <= 0 || toAccount === '') {
            alert('Por favor, seleccione cuenta destino válida y una cantidad mayor que cero.');
            return;
        }
        if (montoDeSaldoBancario < amount) {
            alert('Saldo insuficiente');
            return;
        }
        const toAccountData = accounts.find((account) => account.id === toAccount);
        const validar = window.confirm('¿Seguro que quieres realizar esta transferencia?');
        if (validar) {
            setMontoDeSaldoBancario(montoDeSaldoBancario - amount);
            setAmount('');
            alert(`Se transfirieron $${amount} a la cuenta de ${toAccountData.accountName}.`);
        } else {
            alert('Tu operación ha sido cancelada');
        }
    };

    return (
        <>
            <Head>
                <title>BCIB - Transferencias</title>
                <meta
                    name="description"
                    content="..."
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className="grid place-items-center p-5">
                <h1 className="text-2xl md:text-3xl lg:text-4xl p-2">Transferencias entre Cuentas Bancarias</h1>
                <div className="grid gap-4 text-lg m-5">
                    <table>
                        <tbody>
                            <tr>
                                <td><label className="block font-bold p-1">Cuenta de origen:</label></td>
                                <td><p className="block p-1">245-5745454 - Saldo: ${montoDeSaldoBancario}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Cuenta de destino:</label></td>
                                <td><select
                                    className="w-full p-2 border rounded-lg text-sm"
                                    onChange={(e) => setToAccount(e.target.value)}
                                    value={toAccount}
                                >
                                    <option value="">Seleccionar cuenta de destino</option>
                                    {accountOptions.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.bank} - {account.accountName}
                                        </option>
                                    ))}
                                </select></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Monto a transferir:</label></td>
                                <td><input
                                    className="block p-1 border rounded-lg"
                                    type="number"
                                    placeholder="Monto a Transferir"
                                    value={amount}
                                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                                /></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Concepto:</label></td>
                                <td><select className="block p-1 border rounded-lg text-sm">
                                    <option>Varios</option>
                                    <option>Alquileres</option>
                                    <option>Cuota</option>
                                    <option>Expensas</option>
                                    <option>Facturas</option>
                                    <option>Honorarios</option>
                                </select></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col m-4 md:flex-row">
                    <button className="btnRegistrarse" onClick={handleTransfer}>
                        <p className='text-sm'>Realizar Transferencia</p>
                    </button>
                    <button className="btnRegistrarse">
                        <Link className="text-white text-sm" href="/recipients">
                            Agenda de destinatarios
                        </Link>
                    </button>
                </div>

            </div>
        </>
    )
}
export async function getStaticProps() {
    const accountOptions = accounts.map((account) => ({
        id: account.id,
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        bank: account.bank,
        cbu: account.cbu,
        cuil: account.cuil
    }));

    return {
        props: {
            accountOptions,
        },
    };
}
