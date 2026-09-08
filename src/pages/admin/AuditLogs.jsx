import React, { useState, useEffect } from 'react';
import { getLogs } from '../../services/auditService';
import { formatDateTime } from '../../utils/helpers';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">System Audit Logs</h1>
      
      <div className="bg-white border border-zinc-200 rounded-md overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200 text-sm">
              <th className="p-4 font-medium text-zinc-600">Timestamp</th>
              <th className="p-4 font-medium text-zinc-600">Action</th>
              <th className="p-4 font-medium text-zinc-600">User ID</th>
              <th className="p-4 font-medium text-zinc-600">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-zinc-500">No logs found.</td></tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} className="border-b border-zinc-100 text-sm">
                  <td className="p-4 text-zinc-500 whitespace-nowrap">{formatDateTime(log.timestamp)}</td>
                  <td className="p-4 font-medium text-zinc-900">{log.action}</td>
                  <td className="p-4 font-mono text-xs text-zinc-500">{log.userId}</td>
                  <td className="p-4 text-zinc-600">{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
