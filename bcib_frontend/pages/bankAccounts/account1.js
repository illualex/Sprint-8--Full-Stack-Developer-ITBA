import { useRouter } from 'next/router';
import accounts from './accounts';
import Link from 'next/link';
import Head from 'next/head';

function Account1() {
    const router = useRouter();
    const { id } = router.query;
    const account = accounts.find((acc) => acc.id === 'account1');

    return (
        <>
            <Head>
                <title>BCIB - Detalle de la Cuenta Bancaria</title>
                <meta
                    name="description"
                    content="Detalle de la cuenta del destinatario de tu perfil en Banco Capital ITBA"
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className="grid place-items-center p-5">
                <h1 className="text-2xl md:text-3xl lg:text-4xl p-2">Detalles de la Cuenta Bancaria</h1>
                <div className="grid gap-4 text-sm sm:text-lg m-5">
                    <table>
                        <tbody>
                            <tr>
                                <td><label className="block font-bold p-1">Nombre del Titular:&nbsp;</label></td>
                                <td><p className="block p-1"> {account.accountName}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Nombre del Banco:&nbsp;</label></td>
                                <td><p className="block p-1"> {account.bank}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Número de Cuenta:&nbsp;</label></td>
                                <td><p className="block p-1"> {account.accountNumber}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">CUIL/CUIT:&nbsp;</label></td>
                                <td><p className="block p-1"> {account.cuil}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">CBU/CVU:&nbsp;</label></td>
                                <td><p className="block p-1"> {account.cbu}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">E-mail:&nbsp;</label></td>
                                <td><p className="block p-1"> {account.mail}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mb-4 text-center">
                    <button className="btnRegistrarse">
                        <Link className="text-white" href="/recipients">
                            Volver
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Account1;
