import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Contact() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
      alert('Por favor, complete todos los campos.');
    } else {
      alert('Mensaje enviado con éxito.');
      setNombre('');
      setEmail('');
      setMensaje('');
      setEnviado(true);
    }
  };

  return (
    <>
      <Head>
        <title>BCIB - Contacto</title>
        <meta
          name="description"
          content="Ponerse en contacto con el Banco Capital ITBA a través de un mensaje directo al soporte/ayuda."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <div>
        <h1 className="text-2xl sm:text-3xl text-center m-3 sm:m-5">Contacto</h1>
        <div className="bg-gray-100 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mx-2 sm:mx-auto w-full max-w-md">
            {enviado ? (
              <div className="text-green-600 font-semibold text-center mb-2 sm:mb-4">
                ¡Mensaje enviado con éxito!
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="mb-2 sm:mb-4">
                <label htmlFor="nombre" className="block text-gray-700 font-semibold">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2 sm:mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2 sm:mb-4">
                <label htmlFor="mensaje" className="block text-gray-700 font-semibold">
                  Mensaje:
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Tu mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="grid place-content-center mb-2 sm:mb-4">
                <button type="submit" className="btnRegistrarse">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}
