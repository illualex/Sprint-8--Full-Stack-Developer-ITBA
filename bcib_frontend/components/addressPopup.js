import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressPopup = ({ isOpen, onClose, onSave, initialData, authToken }) => {
    const [formData, setFormData] = useState({
        calle: '',
        numero: '',
        localidad: '',
        provincia: '',
        codigo_postal: '',
        ...initialData,
    });

    useEffect(() => {
        setFormData({ ...formData, ...initialData });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSave = async () => {
        const headers = { Authorization: `Token ${authToken}` };
        try {
            const response = await axios.post('http://localhost:8000/clientes/modificar-direccion-cliente/', formData, {
                headers,
                withCredentials: true,
            });
            onSave(response.data);
            onClose();
        } catch (error) {
            console.error('Error al guardar la dirección:', error);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Editar Dirección</h2>
                        <form className="grid gap-4">
                            <label className="font-bold">Calle:</label>
                            <input
                                type="text"
                                name="calle"
                                value={formData.calle}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <label className="font-bold">Número:</label>
                            <input
                                type="text"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <label className="font-bold">Localidad:</label>
                            <input
                                type="text"
                                name="localidad"
                                value={formData.localidad}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <label className="font-bold">Provincia:</label>
                            <input
                                type="text"
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <label className="font-bold">Código Postal:</label>
                            <input
                                type="text"
                                name="codigo_postal"
                                value={formData.codigo_postal}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <div className="flex justify-end mt-4">
                                <button type="button" onClick={handleSave} className="btnRegistrarse">
                                    Guardar
                                </button>
                                <button type="button" onClick={onClose} className="btnRegistrarse">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddressPopup;
