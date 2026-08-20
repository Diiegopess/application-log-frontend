import React, { useState } from 'react';
import type { LogFilter } from './audit.types';

interface AuditFilterBarProps {
  onFilter: (filter: LogFilter) => void;
  onReset: () => void;
}

export const AuditFilterBar: React.FC<AuditFilterBarProps> = ({ onFilter, onReset }) => {
  const [eventType, setEventType] = useState('');
  const [userId, setUserId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      event_type: eventType.trim() || undefined,
      user_id: userId.trim() || undefined,
      skip: 0,
      limit: 50,
    });
  };

  const handleClear = () => {
    setEventType('');
    setUserId('');
    onReset();
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Tipo de Evento
        </label>
        <input
          type="text"
          placeholder="Ej: user.login, file.download"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          ID de Usuario
        </label>
        <input
          type="text"
          placeholder="UUID o identificador"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default AuditFilterBar;