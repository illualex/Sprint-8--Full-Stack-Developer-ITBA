import React, { useState } from 'react';
import ClientTab from './clientTab';
import LendingTab from './lendingTab';

const PantallaTabs = () => {
  const [pestañaActiva, setPestañaActiva] = useState('Clientes');
  const cambiarPestaña = (nuevaPestaña) => {
    setPestañaActiva(nuevaPestaña);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <h1 className='mt-5 mb-6 text-2xl sm:text-3xl text-center'>Panel Administrador</h1>
      <div className="flex items-center justify-center my-4">
        <div className="flex space-x-4">
          <button
            className={`btnRegistrarse ${pestañaActiva === 'Clientes' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => cambiarPestaña('Clientes')}
          >
            Clientes
          </button>
          <button
            className={`btnRegistrarse ${pestañaActiva === 'Prestamos' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => cambiarPestaña('Prestamos')}
          >
            Préstamos
          </button>
        </div>
      </div>
      <hr className='border border-gray'></hr>
      <div className="mt-4">
        {pestañaActiva === 'Clientes' && <ClientTab />}
        {pestañaActiva === 'Prestamos' && <LendingTab />}
      </div>
    </div>
  );
};

export default PantallaTabs;