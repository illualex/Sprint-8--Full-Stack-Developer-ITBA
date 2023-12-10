import Link from 'next/link';
import Image from "next/image";
import Head from 'next/head';
import nosotros from '../public/images/about-us/nosotros.webp';

export default function About() {
  return (
    <>
      <Head>
        <title>BCIB - Nosotros</title>
        <meta
          name="description"
          content="Información del Banco Capital ITBA"
        />
        <meta
          name="robots"
          content="index, follow"
        />
      </Head>
      <div className="pb-5">
        <div className="px-4 sm:px-8">
          <Image loading='lazy' className='w-full' src={nosotros} alt="Edificio de la empresa BCIB" />
          <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl m-4 sm:m-5">
            Nos distinguimos por orientar nuestra vocación hacia el cliente. Por ello, en los últimos años, hemos trabajado en: la construcción de nuevos centros de atención; la implementación de tecnología de avanzada; la capacitación constante de nuestro personal; y la innovación continua en la variedad de productos y servicios. Así llegamos a cubrir en la actualidad todas las áreas de negocios y segmentos del mercado: Personas, Empresas, Pymes, Emprendedores, y lideramos la posición en Planes Sueldo del sistema financiero. Estas características sumadas a una atención personalizada nos permiten dar respuestas efectivas a las necesidades de nuestros clientes, garantizándoles: calidad, discreción, solvencia, transparencia y un acceso rápido y eficaz a toda la Información requerida. Porque nuestra misión es ser un banco universal, cercano a sus clientes, con presencia nacional y vocación de crecimiento, en constante búsqueda de creación de valor para sus accionistas, colaboradores y la sociedad en su conjunto.
          </p>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl text-center mt-4 sm:mt-5">¡SÉ PARTE DE NUESTRO EQUIPO!</h1>
        <div className='grid place-content-center mt-4 sm:mt-5 mx-4 sm:mx-5'>
          <button className="btnRegistrarse w-full "><p className='text-sm'>Oportunidades de empleo</p></button>
        </div>
      </div>
    </>
  )
}