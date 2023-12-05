import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const facturasPendientes = [
  { id: 'light', tipo: 'Luz', monto: 12550.00, pagada: false },
  { id: 'water', tipo: 'Agua', monto: 5660.00, pagada: false },
  { id: 'gas', tipo: 'Gas', monto: 25660.00, pagada: true },
];

function Payment() {
  const [facturas, setFacturas] = useState(facturasPendientes);
  const handlePagoFactura = async (id) => {
    setFacturas(prevFacturas => prevFacturas.map(factura => {
      if (factura.id === id) {
        factura.pagada = true;
      }
      return factura;
    }));
    alert('Pago exitoso');
  }

  return (
    <>
      <Head>
        <title>BCIB - Facturas Pendientes</title>
        <meta
          name="description"
          content="Facturas pendientes de tu cuenta en Banco Capital ITBA"
        />
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <h1 className="col-span-3 text-3xl m-5 text-center">Panel de Facturas Pendientes</h1>
          <table className="col-span-3 w-full table-auto mb-10">
            <thead>
              <tr>
                <th className="border px-4 py-2">Tipo</th>
                <th className="border px-4 py-2">Monto</th>
                <th className="border px-4 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map(factura => (
                <tr key={factura.id}>
                  <td className="border px-4 py-2">{factura.tipo}</td>
                  <td className="border px-4 py-2">${factura.monto.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    {factura.pagada ? (
                      <span>Pagada</span>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href={`/payment/${factura.id}`}>
                          <p className="text-blue-500 hover:underline hover:text-blue-700">Ver Detalle</p>
                        </Link>
                        {!factura.pagada && (
                          <button className='btnRegistrarse' onClick={() => handlePagoFactura(factura.id)}>Pagar</button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  );
}

export default Payment;
