import { useState, useEffect, useCallback } from 'react';
import type { AuditLog, LogFilter } from './audit.types';
import { fetchLogs, exportLogs } from './auditService';

export const useAuditLogs = (initialFilter?: LogFilter) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<LogFilter | undefined>(initialFilter);

  const loadLogs = useCallback(async (currentFilter?: LogFilter) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLogs(currentFilter);
      setLogs(data);
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.message || 'Error al cargar los logs de auditoría';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs(filter);
  }, [loadLogs, filter]);

  const applyFilter = (newFilter: LogFilter) => {
    setFilter(newFilter);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await exportLogs(filter);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.message || 'Error al exportar logs';
      setError(msg);
    } finally {
      setExporting(false);
    }
  };

  return {
    logs,
    loading,
    exporting,
    error,
    filter,
    applyFilter,
    refetch: () => loadLogs(filter),
    handleExport,
  };
};