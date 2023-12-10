import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

const getInvoiceDetails = (id) => {
    return {
        id,
        tipo: 'Luz',
        monto: 12550.00,
        vencimiento: '2023-10-01',
        beneficiario: 'Compañía de Electricidad',
    };
};
export async function getServerSideProps({ params }) {
    const id = 'light';
    const factura = getInvoiceDetails(id);
    return {
        props: { factura },
    };
}

function Light({ factura }) {
    return (
        <>
            <Head>
                <title>BCIB - Detalle de la Factura</title>
                <meta
                    name="description"
                    content="Detalle de las facturas dentro de tu cuenta en Banco Capital ITBA"
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className="grid place-items-center p-5">
                <h1 className="text-2xl md:text-3xl lg:text-4xl m-2">Detalle de Factura</h1>
                <div className="grid gap-4 text-lg m-5">
                    <table>
                        <tbody>
                            <tr>
                                <td><label className="block font-bold p-1">Tipo:</label></td>
                                <td><p className="p-1">{factura.tipo}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Monto:</label></td>
                                <td><p className="p-1">$ {factura.monto.toFixed(2)}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Vencimiento:</label></td>
                                <td><p className="p-1">{factura.vencimiento}</p></td>
                            </tr>
                            <tr>
                                <td><label className="block font-bold p-1">Beneficiario:</label></td>
                                <td><p className="p-1">{factura.beneficiario}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mb-4 text-center">
                    <button className="btnRegistrarse">
                        <Link className="text-white" href="/payment">
                            Volver
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Light;