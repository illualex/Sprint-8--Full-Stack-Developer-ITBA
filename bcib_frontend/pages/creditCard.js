import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import creditCardsData from './creditCards/creditCardData';
import Head from 'next/head';

function CreditCard({ initialData }) {
    const [selectedCard, setSelectedCard] = useState(null);
    const router = useRouter();

    const handlePayment = async () => {
        if (selectedCard) {
            alert('El pago se realizó correctamente para ' + selectedCard.name);
        } else {
            alert('Selecciona una tarjeta antes de realizar el pago.');
        }
    };

    const handleLimitIncrease = async () => {
        if (selectedCard) {
            alert('Su solicitud fue ingresada correctamente. A la brevedad recibirá la respuesta');
        } else {
            alert('Selecciona una tarjeta antes de solicitar un aumento de límite.');
        }
    };

    const handleStopDebit = async () => {
        if (selectedCard) {
            alert('El stop debit se realizo correctamente.');
        } else {
            alert('Selecciona una tarjeta antes de realizar un stop debit.');
        }
    };

    return (
        <>
            <Head>
                <title>BCIB - Tarjetas de Crédito</title>
                <meta
                    name="description"
                    content="Pagina de tarjetas de tu cuenta dentro de Banco Capital ITBA"
                />
                <meta
                    name="robots"
                    content="noindex, nofollow"
                />
            </Head>
            <div className='grid place-items-center pb-5'>
                <h1 className='text-3xl p-5'>Tarjetas de Crédito</h1>
                <div className="flex mb-4">
                    {initialData.map((card) => (
                        <div key={card.id} className={`creditCard-border ${selectedCard === card ? 'selected-card' : ''}`}>
                            <p className='font-bold text-xl'>{card.name}</p>
                            <div className="credit-card-image pb-5" onClick={() => setSelectedCard(card)}>
                                <Image
                                    src={`/images/creditCards/${card.imagen}`}
                                    alt={`Tarjeta ${card.name}`}
                                    width={250}
                                    height={150}
                                    loading='lazy'
                                />
                            </div>
                            <button className='btnInicioSesion'><Link href={`/creditCards/${card.id}`}>Ver detalle</Link></button>
                        </div>
                    ))}
                </div>
                <div className='flex'>
                    <button className='btnRegistrarse' onClick={handlePayment}>Realizar Pago</button>
                    <button className='btnRegistrarse' onClick={handleLimitIncrease}>Solicitar Aumento</button>
                    <button className='btnRegistrarse' onClick={handleStopDebit}>Stop Debit</button>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const initialData = creditCardsData;

    return {
        props: {
            initialData,
        },
    };
}

export default CreditCard;
