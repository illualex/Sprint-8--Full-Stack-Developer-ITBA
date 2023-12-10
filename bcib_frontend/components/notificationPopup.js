import React from 'react';

const NotificationPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg max-w-md">
        <p className="text-lg mb-4">{message}</p>
        <button className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;