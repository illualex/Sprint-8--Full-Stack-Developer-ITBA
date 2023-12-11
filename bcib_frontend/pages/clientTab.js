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
    fetchData()
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
        <table className='flex items-center justify-center border-collapse'>
          <tbody>
            <tr>
              <td>
                <label className="block mb-2 text-lg font-bold">Ingrese DNI del Cliente: </label>
              </td>
              <td>
                <input
                  type="text"
                  className="p-2 border rounded"
                  value={dni}
                  onChange={(e) => setDNI(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={handleBuscarClick}
                  className="btnRegistrarse"
                >
                  Buscar
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={handleLimpiarClick}
                  className="btnInicioSesion"
                >
                  Limpiar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {clientData && (
        <div className="flex flex-col items-center mx-auto text-lg">
          <h1 className="underline">Información del Cliente</h1>
          <div className="flex items-center mb-4">
            <p className="mr-2 font-bold">Nombre:</p>
            <p className="mr-2">{clientData.customer_name}</p>
            <p className='mr-2 font-bold'>Apellido: </p>
            <p className='mr-2'>{clientData.customer_surname}</p>
          </div>
          <h1 className="text-center underline">Domicilio</h1>
          <table className='my-4'>
            <tbody>
              <tr>
                <td className="font-bold">Calle:</td>
                <td>{clientData.direccion[0].calle}</td>
              </tr>
              <tr>
                <td className="font-bold">Número:</td>
                <td>{clientData.direccion[0].numero}</td>
              </tr>
              <tr>
                <td className="font-bold">Localidad:</td>
                <td>{clientData.direccion[0].localidad}</td>
              </tr>
              <tr>
                <td className="font-bold">Provincia:</td>
                <td>{clientData.direccion[0].provincia}</td>
              </tr>
              <tr>
                <td className="font-bold">Código Postal:</td>
                <td>{clientData.direccion[0].codigo_postal}</td>
              </tr>
            </tbody>
          </table>
          <button className='btnRegistrarse' onClick={() => setIsPopupOpen(true)}>Modificar Dirección</button>
          <AddressPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onSave={handleSaveAddress}
            initialData={clientData?.direccion[0] || {}}
            authToken={authToken}
          />
        </div>
      )}
      <hr className='border border-gray my-5'></hr>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {tarjetas.length > 0 && (
            <div>
              <h1 className='text-center underline my-4'>Tarjetas del Cliente</h1>
              <table className="min-w-full border-collapse border table-auto">
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
              <h1 className='text-center underline my-4'>Préstamos del Cliente</h1>
              <table className="min-w-full border-collapse border table-auto my-4">
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
                      <td className='flex justify-center'>
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
            <div className='flex justify-center'>
              <button
                type="button"
                onClick={handleShowPopup}
                className="btnRegistrarse"
              >
                Solicitar Préstamo
              </button>
            </div>
          )}
          {showPopup && (
            <LendingPopup onClose={handleClosePopup} client={clientData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientTab;