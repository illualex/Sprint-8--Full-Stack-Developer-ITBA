import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/authContext';
import LendingPopup from '../components/lendingPopup';
import AddressPopup from '../components/addressPopup';

const ClientTab = () => {
  const { authToken } = useAuth();
  const [dni, setDNI] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tarjetas, setTarjetas] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [limpiar, setLimpiar] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Token ${authToken}` };
      const response = await axios.get(`http://localhost:8000/clientes/buscar-por-dni/${dni}`, { headers });
      setClientData(response.data);
      setError(null);
      const tarjetasResponse = await axios.get(`http://localhost:8000/clientes/obtener-tarjetas/${response.data.customer_id}`, { headers });
      setTarjetas(tarjetasResponse.data);
      const prestamosResponse = await axios.get(`http://localhost:8000/clientes/prestamos/${response.data.customer_id}`, { headers });
      setPrestamos(prestamosResponse.data);
      setLimpiar(true);
    } catch (error) {
      console.error('Error al buscar el cliente:', error.message);
      setClientData(null);
      setTarjetas([]);
      setPrestamos([]);
      setError('Cliente no encontrado');
    }
  };
  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleBuscarClick = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error('Error al buscar el cliente:', error.message);
      setClientData(null);
      setTarjetas([]);
      setPrestamos([]);
      setError('Cliente no encontrado');
    }
  };
  const handleLimpiarClick = () => {
    setDNI('');
    setClientData(null);
    setTarjetas([]);
    setPrestamos([]);
    setError(null);
    setLimpiar(false);
  };
  const handleAnularPrestamo = async (prestamoId) => {
    try {
      const headers = { Authorization: `Token ${authToken}` };
      await axios.delete(`http://localhost:8000/clientes/anular-prestamo/${prestamoId}`, { headers });
      const updatedPrestamos = prestamos.filter((prestamo) => prestamo.loan_id !== prestamoId);
      setPrestamos(updatedPrestamos);
      await fetchData();
    } catch (error) {
      console.error('Error al anular el préstamo:', error.message);
      setError('Error al anular el préstamo');
    }
  };
  const handleSaveAddress = async (updatedAddress) => {
    try {
      console.log('Dirección actualizada:', updatedAddress);
      await fetchData();
    } catch (error) {
      console.error('Error al guardar la dirección:', error);
    }
  };
  const handleSolicitarPrestamo = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error('Error al solicitar el préstamo:', error);
      setError('Error al solicitar el préstamo');
    }
  };

  return (
    <div>
      <form className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2">Ingrese DNI del Cliente: </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={dni}
              onChange={(e) => setDNI(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleBuscarClick}
            className="bg-blue-500 text-white px-4 py-2 mt-4"
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={handleLimpiarClick}
            className="bg-gray-500 text-white px-4 py-2 mt-4"
          >
            Limpiar
          </button>
        </div>
      </form>

      {clientData && (
        <div>
          <h2 className="mb-2">Información del Cliente</h2>
          <div className="flex items-center mb-4">
            <p className="mr-2">Nombre:</p>
            <p className="mr-2">{clientData.customer_name}</p>
            <p>Apellido: {clientData.customer_surname}</p>
          </div>
          <div>
            <h3 className="mb-2">Domicilio</h3>
            <p>Calle: {clientData.direccion[0].calle}</p>
            <p>Número: {clientData.direccion[0].numero}</p>
            <p>Localidad: {clientData.direccion[0].localidad}</p>
            <p>Provincia: {clientData.direccion[0].provincia}</p>
            <p>Código Postal: {clientData.direccion[0].codigo_postal}</p>
            <button className='btnRegistrarse' onClick={() => setIsPopupOpen(true)}>Modificar Dirección</button>
          </div>
          <AddressPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={handleSaveAddress}
            initialData={clientData?.direccion[0] || {}}
            authToken={authToken}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {tarjetas.length > 0 && (
            <div>
              <h2>Tarjetas del Cliente</h2>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Número</th>
                  </tr>
                </thead>
                <tbody>
                  {tarjetas.map((tarjeta) => (
                    <tr key={tarjeta.id}>
                      <td>{tarjeta.tipo_tarjeta.nombre}</td>
                      <td>{tarjeta.numero}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div>
          {prestamos.length > 0 && (
            <div>
              <h2>Préstamos del Cliente</h2>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {prestamos.map((prestamo) => (
                    <tr key={prestamo.loan_id}>
                      <td>{prestamo.loan_type}</td>
                      <td>{prestamo.loan_date}</td>
                      <td>{prestamo.loan_total}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleAnularPrestamo(prestamo.loan_id)}
                          className='btnRegistrarse'
                        >
                          Anular
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {clientData && (
            <button
              type="button"
              onClick={handleShowPopup}
              className="bg-green-500 text-white px-4 py-2 mt-4"
            >
              Solicitar Préstamo
            </button>
          )}
          {showPopup && (
            <LendingPopup onClose={handleClosePopup} client={clientData} onLoanRequest={handleSolicitarPrestamo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientTab;