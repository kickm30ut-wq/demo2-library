export const generateId = () => Math.random().toString(36).substr(2, 9);
export const generateBookingRef = () => `ABL-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${generateId().toUpperCase().substring(0, 5)}`;

export const formatDateTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
};

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit'
  });
};

// Check if reqStart and reqEnd overlap with any existing booking
export const hasOverlap = (reqStart, reqEnd, existingStart, existingEnd) => {
  return reqStart < existingEnd && reqEnd > existingStart;
};

// Calculate time remaining in human-readable format
export const getTimeRemaining = (endTime) => {
  const diff = endTime - Date.now();
  if (diff <= 0) return 'Expired';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  return `${hours}h ${mins}m`;
};
