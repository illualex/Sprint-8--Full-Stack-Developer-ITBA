import Link from 'next/link';
import Image from "next/image";
import carousel1 from '../public/images/carousel/1.webp';
import carousel2 from '../public/images/carousel/2.webp';
import carousel3 from '../public/images/carousel/3.webp';
import carousel4 from '../public/images/carousel/4.webp';
import carousel5 from '../public/images/carousel/5.webp';
import card1 from '../public/images/cards/1.webp'
import card2 from '../public/images/cards/2.webp'
import card3 from '../public/images/cards/3.webp'
import card4 from '../public/images/cards/4.webp'
import card5 from '../public/images/cards/5.webp'
import card6 from '../public/images/cards/6.webp'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useState } from "react";
import Head from 'next/head';

const imageData = [
    {
        alt: "Pareja creando su cuenta en el banco",
        url: carousel1
    },
    {
        alt: "Persona atendiendo el teléfono",
        url: carousel2
    },
    {
        alt: "Grupo de personas sacando dinero en cajeros automáticos",
        url: carousel3
    },
    {
        alt: "Un lugar paradisíaco con playas blancas y mar azul",
        url: carousel4
    },
    {
        alt: "Imagen de monedas en escala representado un préstamo para una casa",
        url: carousel5
    }
];
const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
        <Image src={image.url} alt={image.alt} loading='lazy'/>
    </div>
));

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
        setCurrentIndex(index);
    }

    return (
        <>
            <Head>
                <title>BCIB - Inicio</title>
                <meta
                    name="description"
                    content="Banco Capital ITBA de Argentina, pagina inicial"
                />
                <meta
                    name="robots"
                    content="index, follow"
                />
            </Head>
            <div className='px-10 mx-5 w-full'>
                <Carousel
                    showArrows={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    selectedItem={imageData[currentIndex]}
                    onChange={handleChange}
                    showThumbs={false}
                    className="carousel-container"
                >
                    {renderSlides}
                </Carousel>
            </div>
            <div className="container-card">
                <div className="card">
                    <Image src={card1} loading='lazy' className="img-card" alt="Persona dando la mano a un mecánico" />
                </div>
                <div className="card">
                    <Image src={card2} loading='lazy' className="img-card" alt="Persona trabajando en una cafeteria" />
                </div>
                <div className="card">
                    <Image src={card3} loading='lazy' className="img-card" alt="Teléfono con gráficos de inversiones" />
                </div>
                <div className="card">
                    <Image src={card4} loading='lazy' className="img-card" alt="Aplicación de Mercado libre en celular" />
                </div>
                <div className="card">
                    <Image src={card5} loading='lazy' className="img-card" alt="Tienda de ropa" />
                </div>
                <div className="card">
                    <Image src={card6} loading='lazy' className="img-card" alt="Lugar de CineMark" />
                </div>
            </div>
        </>
    )
}
