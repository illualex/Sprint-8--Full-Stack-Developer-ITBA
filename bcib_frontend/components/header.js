import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/images/logo/logo-1.png';
import NavbarLoggedIn from './NavbarLoggedIn';
import NavbarLoggedOut from './NavbarLoggedOut';
import { useAuth } from '../components/authContext';

export default function Header() {
    const router = useRouter();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const handleLogout = async () => {
        setIsLoggedIn(false);
        await router.push('/');
    };

    return (
        <div className="grid grid-cols-3 shadow-lg shadow-gray-500/5">
            <div className="m-1">
                {isLoggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
            </div>
            <div className="flex m-1 justify-center">
                <Link href="/">
                    <Image className="w-28" loading="lazy" src={logo} alt="logo de banco BCIB" />
                </Link>
            </div>
            <div className="m-1">
                <div className="buttonMenu justify-end">
                    {isLoggedIn ? (
                        <>
                            <button className="btnRegistrarse" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signup">
                                <button className="btnInicioSesion">
                                    Iniciar Sesión
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="btnRegistrarse">
                                    Hacerte Cliente
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
