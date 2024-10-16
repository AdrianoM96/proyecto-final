'use client';

import { useEffect, useState } from 'react';
import { generateReport } from '@/actions/';

export default function ReportesPage() {
  const [tipoReporte, setTipoReporte] = useState('');
  const [periodoTipo, setPeriodoTipo] = useState('');
  const [año, setAño] = useState(new Date().getFullYear());
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const añoMinimo = 1900

  const generarReporte = async (type: string, año: number, fechaInicio: string, fechaFin: string) => {

    setIsLoading(true);
    setError(null);

    if (fechaInicio && fechaFin) {
      fechaInicio = fechaInicio ? new Date(fechaInicio).toISOString() : '';
      fechaFin = fechaFin ? new Date(fechaFin).toISOString() : '';
    }

    const reportResponse = await generateReport(type, año, fechaInicio, fechaFin);

    if (reportResponse.ok) {
      setPdfUrl(reportResponse.data);
      setIsLoading(false);
      setError('')
    } else {
      
      setError('Ocurrió un error al generar el PDF. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }


  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `reporte_${tipoReporte}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setPdfUrl('')
  };
  useEffect(() => {
    if (tipoReporte === "stock") {
      setPeriodoTipo("");
      setAño(0);
      setFechaInicio("");
      setFechaFin("");
    } else if (periodoTipo === 'anual') {
      setFechaInicio('');
      setFechaFin('');
    } else if (periodoTipo === 'rango') {
      setAño(0);
    }
  }, [tipoReporte, periodoTipo]);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generador de Reportes</h1>

      <div className="mb-4">
        <label htmlFor="tipoReporte" className="block mb-2 font-semibold">Tipo de Reporte</label>
        <select
          id="tipoReporte"
          value={tipoReporte}
          onChange={(e) => { setTipoReporte(e.target.value); setPdfUrl(''); }}
          className="w-full p-2 border rounded"
        >
          <option value="">Elige un reporte...</option>
          <option value="ventas">Reporte de Ventas</option>
          <option value="stock">Reporte de Stock</option>
          <option value="productos">Reporte de Productos</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="periodoTipo" className="block mb-2 font-semibold">Período</label>
        <select
          id="periodoTipo"
          value={tipoReporte === "stock" ? "" : periodoTipo}
          onChange={(e) => { setPeriodoTipo(e.target.value); setPdfUrl(''); }}
          className={`w-full p-2 border rounded ${tipoReporte === "stock" ? "bg-gray-400" : ""}`}
          disabled={tipoReporte === "stock"}
        >
          <option value="">Elegir periodo...</option>
          <option value="anual">Anual</option>
          <option value="rango">Elegir por fecha</option>
        </select>
      </div>

    
      {periodoTipo && (
        <>
          {periodoTipo === 'anual' ? (
            <div className="mb-4">
              <label htmlFor="año" className="block mb-2 font-semibold">Año</label>
              <input
                type="number"
                id="año"
                value={tipoReporte === "stock" ? "" : año}
                onChange={(e) => setAño(parseInt(e.target.value))}
                className={`w-full p-2 border rounded ${tipoReporte === "stock" ? "bg-gray-400" : ""}`}
                min="2000"
                max="2099"
                disabled={tipoReporte === "stock"}
              />
            </div>
          ) : (
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="fechaInicio" className="block mb-2 font-semibold">Fecha Inicio</label>
                <input
                  type="date"
                  id="fechaInicio"
                  value={tipoReporte === "stock" ? "" : fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className={`w-full p-2 border rounded ${tipoReporte === "stock" ? "bg-gray-400" : ""}`}
                  disabled={tipoReporte === "stock"}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="fechaFin" className="block mb-2 font-semibold">Fecha Fin</label>
                <input
                  type="date"
                  id="fechaFin"
                  value={tipoReporte === "stock" ? "" : fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className={`w-full p-2 border rounded ${tipoReporte === "stock" ? "bg-gray-400" : ""}`}
                  disabled={tipoReporte === "stock"}
                />
              </div>
            </div>
          )}
        </>
      )}

      <button
        onClick={() => generarReporte(tipoReporte, año, fechaInicio, fechaFin)}
        disabled={
          isLoading ||
          (tipoReporte !== "stock" &&
            (!periodoTipo ||
              (periodoTipo === 'anual' && año <= añoMinimo) ||
              (periodoTipo !== 'anual' &&
                (!fechaInicio || !fechaFin ||
                  (new Date(fechaInicio).getFullYear() <= añoMinimo) ||
                  (new Date(fechaFin).getFullYear() <= añoMinimo))
              )
            ))
        }
        className={`px-4 py-2 rounded mr-4 ${isLoading ||
          (tipoReporte !== "stock" &&
            (!periodoTipo ||
              (periodoTipo === 'anual' && año <= añoMinimo) ||
              (periodoTipo !== 'anual' &&
                (!fechaInicio || !fechaFin ||
                  (new Date(fechaInicio).getFullYear() <= añoMinimo) ||
                  (new Date(fechaFin).getFullYear() <= añoMinimo))
              )
            ))
          ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
          : 'bg-black text-white'
          }`}
      >
        Generar Reporte
      </button>

      <button
        onClick={handleDownload}
        className={`px-4 py-2 rounded ${pdfUrl
          ? 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        disabled={!pdfUrl}
      >
        Descargar Reporte
      </button>

      {isLoading && <p className="text-gray-600 mt-4">Generando reporte de {tipoReporte}...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {pdfUrl && <p className="text-green-500 mt-4">Reporte de {tipoReporte} generado con éxito. Haz clic en Descargar Reporte para obtenerlo.</p>}
    </div>
  );
}