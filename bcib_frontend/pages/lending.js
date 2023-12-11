import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authContext';
import LendingPopup from '../components/lendingPopup';

const LendingScreen = () => {
  const { client, authToken } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [prestamos, setPrestamos] = useState([]);
  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Token ${authToken}` };
        const response = await axios.get(`http://localhost:8000/clientes/prestamos/${client.customer_id}`, { headers });

        setPrestamos(response.data);
      } catch (error) {
        console.error('Error al obtener los préstamos:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid place-items-center">
      <h1 className="mt-5 mb-6 text-2xl sm:text-3xl text-center">Préstamos</h1>
      <div className="w-full sm:w-3/4">
        <div className="bg-gray-300 rounded-xl p-4 space-y-6 relative">
          <div className="grid place-content-center m-5">
            <p className="text-center mb-4">
              Usted cuenta con un préstamo preaprobado.
              <br />
              Haga clic para solicitarlo:
            </p>
            <button className="btnRegistrarse w-full" onClick={handleShowPopup}>
              Solicitar Préstamo
            </button>
          </div>
          {showPopup && (
            <LendingPopup onClose={handleClosePopup} />
          )}
        </div>
        <div className='my-5'>
          {prestamos.length > 0 && (
            <div className="overflow-x-auto mb-10 text-left">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Préstamos del Cliente</h2>
                <table className="min-w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Tipo</th>
                      <th className="border px-4 py-2">Fecha</th>
                      <th className="border px-4 py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prestamos.map((prestamo) => (
                      <tr key={prestamo.loan_id}>
                        <td className="border px-4 py-2">{prestamo.loan_type}</td>
                        <td className="border px-4 py-2">{prestamo.loan_date}</td>
                        <td className="border px-4 py-2">{prestamo.loan_total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LendingScreen;