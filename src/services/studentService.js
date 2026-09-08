import { createLog } from './auditService';

export const getStudents = () => {
  const users = JSON.parse(localStorage.getItem('library_users') || '[]');
  return users.filter(u => u.role === 'student');
};

export const updateStudentStatus = (adminId, studentId, newStatus) => {
  const users = JSON.parse(localStorage.getItem('library_users') || '[]');
  const index = users.findIndex(u => u.id === studentId);
  if (index !== -1) {
    users[index].status = newStatus;
    localStorage.setItem('library_users', JSON.stringify(users));
    createLog('Student Status Updated', adminId, `Student ${users[index].email} status set to ${newStatus}`);
  }
};

export const updateProfile = (studentId, updates) => {
  const users = JSON.parse(localStorage.getItem('library_users') || '[]');
  const index = users.findIndex(u => u.id === studentId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem('library_users', JSON.stringify(users));
    
    const currentUser = JSON.parse(localStorage.getItem('library_current_user') || '{}');
    if (currentUser.id === studentId) {
      localStorage.setItem('library_current_user', JSON.stringify(users[index]));
    }
    
    createLog('Profile Updated', studentId, `Student updated profile`);
    return users[index];
  }
  throw new Error('User not found');
};
