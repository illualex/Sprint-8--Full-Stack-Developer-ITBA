import { useRouter } from 'next/router';
import Link from 'next/link';
import creditCardsData from './creditCards/creditCardData';
import Head from 'next/head';

function CreditCardDetail({ card }) {
    return (
        <>
            <Head>
                <title>BCIB - Detalle de la Tarjeta de Crédito</title>
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
                <h1 className='text-2xl md:text-3xl lg:text-4xl p-2'>Detalle de la Tarjeta de Crédito</h1>
                <div className='grid gap-4 text-sm sm:text-lg m-5'>
                    <table>
                        <tbody>
                            <tr>
                                <td><label className='block font-bold p-1'>Nombre de la Tarjeta:&nbsp;</label></td>
                                <td><p className='p-1'>{card.name}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>Número de Tarjeta:&nbsp;</label></td>
                                <td><p className='p-1'>{card.number}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>Fecha de Vencimiento Desde:&nbsp;</label></td>
                                <td><p className='p-1'>{card.dateFrom}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>Fecha de Vencimiento Hasta:&nbsp;</label></td>
                                <td><p className='p-1'>{card.dateTo}</p></td>
                            </tr>
                            <tr>
                                <td><label className='block font-bold p-1'>Límite de Crédito:&nbsp;</label></td>
                                <td><p className='p-1'>{card.limit}</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mb-5">
                    <button className='btnRegistrarse'><Link className='text-white' href="/creditCard">Volver</Link></button>
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const paths = creditCardsData.map((card) => ({
        params: { id: card.id },
    }));

    return {
        paths,
        fallback: false,
    };
}
export async function getStaticProps({ params }) {
    const cardId = params.id;
    const card = creditCardsData.find((c) => c.id === cardId);

    return {
        props: {
            card,
        },
    };
}

export default CreditCardDetail;
