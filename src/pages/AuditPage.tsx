import React from 'react';
import { useAuditLogs } from '../domains/audit/useAuditLogs';
import { AuditLogsTable } from '../domains/audit/AuditLogsTable';
import { AuditFilterBar } from '../domains/audit/AuditFilterBar';
import Spinner from '../shared/components/Spinner';

export const AuditPage: React.FC = () => {
  const {
    logs,
    loading,
    exporting,
    error,
    applyFilter,
    refetch,
    handleExport,
  } = useAuditLogs({ limit: 50, skip: 0 });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logs de Auditoría</h1>
          <p className="text-sm text-gray-500">
            Registro de eventos, actividad y trazabilidad del sistema
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refetch}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors disabled:opacity-50"
          >
            Refrescar
          </button>
          <button
            onClick={handleExport}
            disabled={exporting || loading || logs.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {exporting ? 'Exportando...' : 'Exportar CSV'}
          </button>
        </div>
      </div>

      <AuditFilterBar
        onFilter={applyFilter}
        onReset={() => applyFilter({ limit: 50, skip: 0 })}
      />

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
          <AuditLogsTable logs={logs} />
        </div>
      )}
    </div>
  );
};

export default AuditPage;