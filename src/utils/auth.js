// src/utils/auth.js
// Simple auth utility for admin panel

const ADMIN_USERS = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Administrator', email: 'admin@example.com' },
  { id: 2, username: 'teacher', password: 'teacher123', name: 'Teacher Manager', email: 'teacher@example.com' }
];

export const isAdmin = () => {
  return !!localStorage.getItem('adminToken');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('adminToken');
  const userId = localStorage.getItem('userId');
  if (!token || !userId) return null;
  
  const user = ADMIN_USERS.find(u => u.id == userId);
  return user || null;
};

export const login = (username, password) => {
  const user = ADMIN_USERS.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('adminToken', `token_${user.id}_${Date.now()}`);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('userName', user.name);
    return { success: true, user };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
};

export const getInitialData = () => {
  const stored = localStorage.getItem('adminData');
  if (stored) {
    return JSON.parse(stored);
  }
  
  const initialData = {
    users: [
      { id: 1, name: 'Abdullayev Akmal', email: 'akmal@example.com', phone: '+998901234567', status: 'active', registeredDate: '2024-01-15', courseLevel: 'B2' },
      { id: 2, name: 'Rashidova Nilufar', email: 'nilufar@example.com', phone: '+998902345678', status: 'active', registeredDate: '2024-02-20', courseLevel: 'A2' },
      { id: 3, name: 'Karimov Jasur', email: 'jasur@example.com', phone: '+998903456789', status: 'inactive', registeredDate: '2023-12-10', courseLevel: 'C1' }
    ],
    teachers: [
      { id: 1, name: 'Sarvar Akramov', qualification: 'IELTS 8.5', experience: '10 yil', courses: ['IELTS Academic', 'General English'], email: 'sarvar@example.com', phone: '+998901111111' },
      { id: 2, name: 'Dilnoza Rahimova', qualification: 'CEFR C2', experience: '8 yil', courses: ['Business English', 'General English'], email: 'dilnoza@example.com', phone: '+998902222222' },
      { id: 3, name: 'Jasur Qodirov', qualification: 'IELTS 8.0', experience: '6 yil', courses: ['IELTS General', 'Reading'], email: 'jasur@example.com', phone: '+998903333333' }
    ],
    courses: [
      { id: 1, title: 'General English', level: 'A1-B1', duration: '3 oy', students: 45, price: '1200000', teacher: 'Sarvar Akramov', status: 'active' },
      { id: 2, title: 'IELTS Preparation', level: 'B2-C1', duration: '4 oy', students: 32, price: '1800000', teacher: 'Dilnoza Rahimova', status: 'active' },
      { id: 3, title: 'Business English', level: 'B1-C1', duration: '2.5 oy', students: 18, price: '1500000', teacher: 'Jasur Qodirov', status: 'active' }
    ],
    registrations: [
      { id: 1, userName: 'Abdullayev Akmal', course: 'IELTS Preparation', registeredDate: '2024-03-01', status: 'pending', phone: '+998901234567' },
      { id: 2, userName: 'Rashidova Nilufar', course: 'General English', registeredDate: '2024-03-05', status: 'approved', phone: '+998902345678' },
      { id: 3, userName: 'Karimov Jasur', course: 'Business English', registeredDate: '2024-03-10', status: 'pending', phone: '+998903456789' }
    ]
  };
  
  localStorage.setItem('adminData', JSON.stringify(initialData));
  return initialData;
};

export const saveData = (data) => {
  localStorage.setItem('adminData', JSON.stringify(data));
};
