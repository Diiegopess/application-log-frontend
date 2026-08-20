import React, { useState } from 'react';
import type { AuditLog } from './audit.types';
import { formatDate } from '../../shared/utils/formatDate';
import { AuditDetailModal } from './AuditDetailModal';

interface AuditLogsTableProps {
  logs: AuditLog[];
}

export const AuditLogsTable: React.FC<AuditLogsTableProps> = ({ logs }) => {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  if (!logs || logs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No se encontraron registros de auditoría.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600 font-semibold">
            <tr>
              <th className="px-4 py-3">Fecha y Hora</th>
              <th className="px-4 py-3">Tipo de Evento</th>
              <th className="px-4 py-3">Usuario (ID)</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Detalles / Payload</th>
              <th className="px-4 py-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                  {formatDate ? formatDate(log.occurred_at) : log.occurred_at}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                    {log.event_type}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-mono text-gray-600">
                  {log.user_id}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {log.ip_address || '—'}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-xs truncate font-mono">
                  {log.payload ? JSON.stringify(log.payload) : '—'}
                </td>
                <td className="px-4 py-3 text-xs text-center whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLog(log);
                    }}
                    className="px-2.5 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium rounded transition-colors"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AuditDetailModal
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </>
  );
};

export default AuditLogsTable;