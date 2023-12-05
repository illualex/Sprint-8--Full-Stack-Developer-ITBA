import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import Dashboard from "../pages/dashboard";
import About from "../pages/about";
import Contact from "@/pages/contact";

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
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/contact">Contacto</Link></li>
                        <li><Link href="/about">Nosotros</Link></li>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default Navbar;