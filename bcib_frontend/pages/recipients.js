import Link from 'next/link';
import accounts from './bankAccounts/accounts';
import Head from 'next/head';

function Recipients() {
    return (
        <>
            <Head>
                <title>BCIB - Agenda de Destinatarios</title>
                <meta
                    name="description"
                    content="Destinatarios agendados de anteriores operaciones en Banco Capital ITBA"
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className="grid place-items-center p-5">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-center p-2 mb-5">Agenda de Destinatarios</h1>
                    <p className="text-gray-700 text-lg text-center">Seleccione para ver el detalle:</p>
                    <ul>
                        {accounts.map((account) => (
                            <li key={account.id}>
                                <Link href={`/bankAccounts/${account.id}`}>
                                    <p className="text-xl md:text-2xl lg:text-3xl mb-2">{account.bank} - Titular {account.accountName} - N° {account.accountNumber}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="m-5 text-center">
                    <button className="btnRegistrarse">
                        <Link className="text-white" href="/transference">
                            Volver
                        </Link>
                    </button>
                </div>
            </div>

        </>
    );
}

export default Recipients;
