import { generateId } from '../utils/helpers';

export const createLog = (action, userId, details) => {
  const logs = JSON.parse(localStorage.getItem('library_audit_logs') || '[]');
  logs.unshift({
    id: generateId(),
    action,
    userId,
    details,
    timestamp: Date.now()
  });
  localStorage.setItem('library_audit_logs', JSON.stringify(logs));
};

export const getLogs = () => {
  return JSON.parse(localStorage.getItem('library_audit_logs') || '[]');
};
