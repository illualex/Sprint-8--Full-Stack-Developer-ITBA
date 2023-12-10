import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/authContext';
import axios from 'axios';

const LendingTab = () => {
    const { client, authToken } = useAuth();
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState('');
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        const obtenerSucursales = async () => {
            try {
                const response = await axios.get('http://localhost:8000/sucursales/listado');
                console.log(response.data)
                setSucursales(response.data);
            } catch (error) {
                console.error('Error al obtener las sucursales:', error.message);
            }
        };
        obtenerSucursales();
    }, []);

    const handleSucursalChange = (e) => {
        setSelectedSucursal(e.target.value);
    };
    const handleBuscarClick = async () => {
        try {
            const headers = { Authorization: `Token ${authToken}` };
            const response = await axios.get(`http://localhost:8000/sucursales/prestamos/${selectedSucursal}`, { headers });
            setPrestamos(response.data);
        } catch (error) {
            console.error('Error al obtener los préstamos:', error.message);
        }
    };

    return (
        <div>
            <h2>Obtener monto de préstamos de una sucursal</h2>
            <div>
                <table>
                    <tr>
                        <td>
                            <label className="block mb-2">Nombre de la sucursal</label>
                        </td>
                        <td>
                            <select
                                className="w-full p-2 border rounded mb-4"
                                value={selectedSucursal}
                                onChange={handleSucursalChange}
                            >
                                <option value="">Seleccione una sucursal</option>
                                {sucursales.map((sucursal) => (
                                    <option key={sucursal.branch_id} value={sucursal.branch_id}>
                                        {sucursal.branch_name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2" onClick={handleBuscarClick}>Buscar</button>
                        </td>
                    </tr>
                </table>
                <div className="border p-4 mt-4">
                    <h3>Préstamos de la sucursal seleccionada:</h3>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Tipo de Préstamo</th>
                                <th className="px-4 py-2">Cliente</th>
                                <th className="px-4 py-2">Fecha</th>
                                <th className="px-4 py-2">Monto Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamos.map((prestamo) => (
                                <tr key={prestamo.loan_id}>
                                    <td className="border px-4 py-2">{prestamo.loan_type}</td>
                                    <td className="border px-4 py-2">{prestamo.customer.customer_name} {prestamo.customer.customer_surname}</td>
                                    <td className="border px-4 py-2">{prestamo.loan_date}</td>
                                    <td className="border px-4 py-2">{prestamo.loan_total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LendingTab;