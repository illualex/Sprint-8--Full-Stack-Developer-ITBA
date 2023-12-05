import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/logo/logo-1.png';
import instagram from '../public/images/redes-app/instagram.png'
import facebook from '../public/images/redes-app/facebook.png'
import twitter from '../public/images/redes-app/twitter.png'
import google from '../public/images/redes-app/google-play.png'
import apple from '../public/images/redes-app/apple-store.png'

export default function Footer() {
    return (
        <>
            <hr className='bg-black h-0.4' />
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center md:col-span-1 lg:col-span-1">
                    <div className="space-y-2">
                        <a href="#" className="block text-xs">Política y Privacidad</a>
                        <a href="#" className="block text-xs">Términos y Condiciones</a>
                        <Link className='mt-4 text-xs' href="/creditCard">Contacto</Link>
                    </div>
                </div>
                <div className="text-center md:col-span-1 lg:col-span-1">
                    <Image loading="lazy" src={logo} alt="Logo Banco Nacional ITBA" className="w-20 mx-auto pb-1" />
                    <p className="text-xs">© 2023 Banco Capital ITBA <br /> Todos los derechos Reservados.</p>
                </div>
                <div className="text-center md:col-span-1 lg:col-span-1">
                    <div className="flex justify-center items-center gap-2">
                        <a href="https://instagram.com/" target="_blank" className="block w-10"><Image loading="lazy" src={instagram} alt="Logo Instagram" /></a>
                        <a href="https://es-la.facebook.com/" target="_blank" className="block w-10"><Image loading="lazy" src={facebook} alt="Logo Facebook" /></a>
                        <a href="https://twitter.com/" target="_blank" className="block w-10"><Image loading="lazy" src={twitter} alt="Logo Twitter" /></a>
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <a href="https://play.google.com/store/" target="_blank" className="block w-10"><Image loading="lazy" src={google} alt="Logo Google PlayStore" /></a>
                        <a href="https://www.apple.com/la/app-store/" target="_blank" className="block w-10"><Image loading="lazy" src={apple} alt="Logo Apple Store" /></a>
                    </div>
                </div>
            </div>

        </>
    )
}
