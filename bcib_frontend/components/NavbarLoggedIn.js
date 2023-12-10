import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import Profile from "../pages/profile";
import Movement from "../pages/movement";
import Price from "../pages/price";
import Lending from "../pages/lending";
import Contact from "@/pages/contact";
import Transference from "@/pages/transference";
import Payment from "@/pages/payment";
import CreditCard from "@/pages/creditCard";

const Navbar = () => {
    return (
        <>
            <div id="menuToggle" className="block relative px-30 z-1 select-none">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                    <div className="pl-30 overflow-hidden transition max-h-full delay-200 ease-out text-xl">
                        <li><Link href="/profile">Cuentas</Link></li>
                        <li><Link href="/creditCard">Tarjetas de Crédito</Link></li>
                        <li><Link href="/transference">Transferencia</Link></li>
                        <li><Link href="/payment">Pagos</Link></li>
                        <li><Link href="/movement">Actividad</Link></li>
                        <li><Link href="/price">Cotización</Link></li>
                        <li><Link href="/lending">Préstamos</Link></li>
                        <li><Link href="/contact">Contacto</Link></li>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default Navbar;