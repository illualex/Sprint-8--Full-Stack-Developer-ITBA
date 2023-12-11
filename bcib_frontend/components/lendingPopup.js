import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';
import axios from 'axios';

const LendingPopup = ({ onClose, onLoanRequest }) => {
  const { client, authToken } = useAuth();
  const [tipoPrestamo, setTipoPrestamo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [montoPreaprobado, setMontoPreaprobado] = useState('');
  const tiposClienteMapa = {
    1: 100000,
    2: 300000,
    3: 500000,
  };
  useEffect(() => {
    const montoPreaprobadoCliente = tiposClienteMapa[client.tipo_cliente] || '';
    setMontoPreaprobado(montoPreaprobadoCliente);
  }, [client.tipo_cliente]);
  const handleTipoPrestamoChange = (e) => {
    setTipoPrestamo(e.target.value);
  };
  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };
  const handleGuardarClick = async () => {
    try {
      const data = {
        loan_type: tipoPrestamo,
        loan_date: fechaInicio,
        loan_total: montoPreaprobado,
        customer_id: client.customer_id,
      };
      const headers = { Authorization: `Token ${authToken}` };
      await axios.post('http://localhost:8000/clientes/guardar-prestamo/', data, { headers });
      onLoanRequest(data);
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar el préstamo:', error);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Solicitar Préstamo</h2>
        <form className="grid gap-4">
          <label className="font-bold">Tipo de Préstamo:</label>
          <select
            name="tipoPrestamo"
            value={tipoPrestamo}
            onChange={handleTipoPrestamoChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccione un tipo</option>
            <option value="PERSONAL">Personal</option>
            <option value="PRENDARIO">Prendario</option>
            <option value="HIPOTECARIO">Hipotecario</option>
          </select>
          <label className="font-bold">Fecha de Inicio:</label>
          <input
            type="date"
            name="fechaInicio"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label className="font-bold">Monto Preaprobado:</label>
          <input
            type="text"
            name="montoPreaprobado"
            value={montoPreaprobado}
            className="w-full p-2 border border-gray-300 rounded"
            readOnly
          />
          <div className="flex justify-end mt-4">
            <button type="button" onClick={handleGuardarClick} className="btnRegistrarse">
              Solicitar
            </button>
            <button type="button" onClick={onClose} className="btnRegistrarse">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LendingPopup;