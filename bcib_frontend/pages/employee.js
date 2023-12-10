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
      <div className="flex space-x-4">
        <button
          className={`py-2 px-4 ${pestañaActiva === 'Clientes' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => cambiarPestaña('Clientes')}
        >
          Clientes
        </button>
        <button
          className={`py-2 px-4 ${pestañaActiva === 'Prestamos' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => cambiarPestaña('Prestamos')}
        >
          Préstamos
        </button>
      </div>
      <div className="mt-4">
        {pestañaActiva === 'Clientes' && <ClientTab />}
        {pestañaActiva === 'Prestamos' && <LendingTab />}
      </div>
    </div>
  );
};

export default PantallaTabs;