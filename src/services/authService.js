import { generateId } from '../utils/helpers';
import { createLog } from './auditService';

export const login = (emailOrPhone, password) => {
  const users = JSON.parse(localStorage.getItem('library_users') || '[]');
  const user = users.find(u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password);
  
  if (user) {
    if (user.status !== 'active') throw new Error('Account deactivated. Contact admin.');
    localStorage.setItem('library_current_user', JSON.stringify(user));
    createLog('User Logged In', user.id, `User ${user.email} logged in`);
    return user;
  }
  throw new Error('Invalid credentials');
};

export const register = (data) => {
  const users = JSON.parse(localStorage.getItem('library_users') || '[]');
  if (users.some(u => u.email === data.email)) throw new Error('Email already registered');
  if (users.some(u => u.phone === data.phone)) throw new Error('Phone already registered');
  
  const newUser = { ...data, id: generateId(), role: 'student', status: 'active', createdAt: Date.now() };
  users.push(newUser);
  localStorage.setItem('library_users', JSON.stringify(users));
  createLog('Student Registered', newUser.id, `New registration: ${newUser.email}`);
  return newUser;
};

export const logout = () => {
  const user = getCurrentUser();
  if (user) {
    createLog('User Logged Out', user.id, `User ${user.email} logged out`);
  }
  localStorage.removeItem('library_current_user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('library_current_user'));
};
