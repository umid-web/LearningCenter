// Database API Utility
// Handles all CRUD operations and db.json synchronization

const DB_KEY = 'learning_center_db';

// Get all database
export const getDatabase = () => {
  const stored = localStorage.getItem(DB_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return getDefaultDatabase();
};

// Save entire database
export const saveDatabase = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
  return Promise.resolve(data);
};

// Get default database structure
export const getDefaultDatabase = () => {
  return {
    homepage: {
      hero: {
        title: 'O\'zbekistonda Ingliz Tili Ta\'limi',
        subtitle: 'Professional va certified o\'qituvchilar bilan o\'rganing',
        ctaText: 'Kursni boshlash',
        backgroundImage: ''
      },
      about: {
        title: 'Biz haqimizda',
        description: 'Biz eng yaxshi ingliz tili ta\'lim markaziymiz',
        features: [
          { icon: 'certified', text: 'Sertifikatlangan o\'qituvchilar' },
          { icon: 'experienced', text: '10+ yillik tajriba' },
          { icon: 'students', text: '5000+ baxtli talaba' }
        ]
      },
      trust: {
        title: 'Nima uchun bizni tanlang?',
        values: [
          { number: '100+', label: 'Kurslar' },
          { number: '50+', label: 'O\'qituvchilar' },
          { number: '5000+', label: 'Talabalar' },
          { number: '95%', label: 'Muvaffaqiyat' }
        ]
      },
      consultation: {
        title: 'Bepul Konsultatsiya',
        description: 'Sizga mos kursni tanlash uchun bepul maslahat olish',
        buttonText: 'Konsultatsiya uchun so\'rov',
        image: ''
      },
      ieltsResults: {
        title: 'IELTS Natijalari',
        description: 'Bizning talabalarning o\'rtacha balli',
        score: '7.5',
        improvements: [
          { student: 'Ali Karim', from: '5.5', to: '7.8', course: 'IELTS Intensive' },
          { student: 'Fatima Abdullayeva', from: '6.0', to: '8.0', course: 'IELTS Advanced' }
        ]
      },
      footer: {
        company: 'O\'quv Markaz',
        description: 'Professional ingliz tili ta\'limi',
        quickLinks: ['Asosiy', 'Kurslar', 'O\'qituvchilar', 'Kontakt'],
        contact: {
          address: 'Toshkent, O\'zbekiston',
          phone: '+998 (90) 123-45-67',
          email: 'info@learningcenter.uz'
        },
        social: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com',
          linkedin: 'https://linkedin.com'
        }
      }
    },
    settings: {
      siteName: 'O\'quv Markaz',
      logo: '',
      favicon: '',
      contact: {
        phone1: '+998 (90) 123-45-67',
        phone2: '+998 (91) 123-45-67',
        email: 'info@learningcenter.uz',
        address: 'Toshkent, O\'zbekiston'
      },
      social: {
        facebook: 'https://facebook.com/learningcenter',
        instagram: 'https://instagram.com/learningcenter',
        twitter: 'https://twitter.com/learningcenter',
        youtube: 'https://youtube.com/learningcenter',
        linkedin: 'https://linkedin.com/company/learningcenter'
      },
      seo: {
        metaTitle: 'O\'quv Markaz - Professional Ingliz Tili',
        metaDescription: 'Professional o\'qituvchilar bilan ingliz tilini o\'rganing',
        keywords: 'ingliz tili, kurs, o\'qituvchi, IELTS, English'
      }
    },
    courses: [
      {
        id: 1,
        title: 'IELTS Preparation',
        level: 'B1-B2',
        duration: '3 oy',
        students: 45,
        price: '1200000',
        teacher: 'John Smith',
        description: 'IELTS imtihoniga tayyorgarlik',
        image: '',
        category: 'IELTS',
        status: 'active',
        createdAt: new Date().toISOString()
      }
    ],
    teachers: [
      {
        id: 1,
        name: 'John Smith',
        qualification: 'IELTS 8.5, CEFR C2',
        experience: '10 yil',
        email: 'john@example.com',
        phone: '+998 90 123 45 67',
        image: '',
        courses: ['IELTS Preparation'],
        rating: 4.8,
        reviews: 120,
        bio: 'Sertifikatlangan o\'qituvchi'
      }
    ],
    tests: [
      {
        id: 1,
        title: 'English Grammar Test',
        description: 'Grammatika bo\'yicha test',
        level: 'A1',
        passingScore: 70,
        duration: 30,
        questions: [],
        totalPoints: 100,
        createdAt: new Date().toISOString()
      }
    ],
    registrations: [
      {
        id: 1,
        userName: 'Test User',
        userEmail: 'test@example.com',
        userPhone: '+998 90 123 45 67',
        course: 'IELTS Preparation',
        message: 'Men bu kursni qabul qilmoqchiman',
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ],
    users: [],
    about: {
      title: 'Biz haqimizda',
      description: 'Biz o\'quv markaziyiz',
      mission: 'Har bir o\'quvchiga sifatli ta\'lim berish',
      vision: 'Butun dunyo bo\'ylab ta\'lim berish',
      directions: [
        { title: 'English for Beginners', description: 'Boshlang\'ichlar uchun' },
        { title: 'Business English', description: 'Biznes uchun' }
      ],
      image: '',
      stats: {
        students: 5000,
        teachers: 50,
        courses: 100,
        successRate: 95
      }
    }
  };
};

// Course Operations
export const getCourses = () => {
  const db = getDatabase();
  return db.courses || [];
};

export const addCourse = (course) => {
  const db = getDatabase();
  const newCourse = {
    id: Math.max(...db.courses.map(c => c.id), 0) + 1,
    ...course,
    createdAt: new Date().toISOString()
  };
  db.courses.push(newCourse);
  saveDatabase(db);
  return newCourse;
};

export const updateCourse = (id, updates) => {
  const db = getDatabase();
  const index = db.courses.findIndex(c => c.id === id);
  if (index !== -1) {
    db.courses[index] = { ...db.courses[index], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.courses[index];
  }
  return null;
};

export const deleteCourse = (id) => {
  const db = getDatabase();
  db.courses = db.courses.filter(c => c.id !== id);
  saveDatabase(db);
  return true;
};

// Teacher Operations
export const getTeachers = () => {
  const db = getDatabase();
  return db.teachers || [];
};

export const addTeacher = (teacher) => {
  const db = getDatabase();
  const newTeacher = {
    id: Math.max(...db.teachers.map(t => t.id), 0) + 1,
    ...teacher,
    createdAt: new Date().toISOString()
  };
  db.teachers.push(newTeacher);
  saveDatabase(db);
  return newTeacher;
};

export const updateTeacher = (id, updates) => {
  const db = getDatabase();
  const index = db.teachers.findIndex(t => t.id === id);
  if (index !== -1) {
    db.teachers[index] = { ...db.teachers[index], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.teachers[index];
  }
  return null;
};

export const deleteTeacher = (id) => {
  const db = getDatabase();
  db.teachers = db.teachers.filter(t => t.id !== id);
  saveDatabase(db);
  return true;
};

// Test Operations
export const getTests = () => {
  const db = getDatabase();
  return db.tests || [];
};

export const addTest = (test) => {
  const db = getDatabase();
  const newTest = {
    id: Math.max(...db.tests.map(t => t.id), 0) + 1,
    ...test,
    questions: test.questions || [],
    createdAt: new Date().toISOString()
  };
  db.tests.push(newTest);
  saveDatabase(db);
  return newTest;
};

export const updateTest = (id, updates) => {
  const db = getDatabase();
  const index = db.tests.findIndex(t => t.id === id);
  if (index !== -1) {
    db.tests[index] = { ...db.tests[index], ...updates, updatedAt: new Date().toISOString() };
    saveDatabase(db);
    return db.tests[index];
  }
  return null;
};

export const deleteTest = (id) => {
  const db = getDatabase();
  db.tests = db.tests.filter(t => t.id !== id);
  saveDatabase(db);
  return true;
};

export const addQuestion = (testId, question) => {
  const db = getDatabase();
  const test = db.tests.find(t => t.id === testId);
  if (test) {
    const newQuestion = {
      id: Math.max(...(test.questions?.map(q => q.id) || []), 0) + 1,
      ...question
    };
    if (!test.questions) test.questions = [];
    test.questions.push(newQuestion);
    saveDatabase(db);
    return newQuestion;
  }
  return null;
};

export const updateQuestion = (testId, questionId, updates) => {
  const db = getDatabase();
  const test = db.tests.find(t => t.id === testId);
  if (test && test.questions) {
    const qIndex = test.questions.findIndex(q => q.id === questionId);
    if (qIndex !== -1) {
      test.questions[qIndex] = { ...test.questions[qIndex], ...updates };
      saveDatabase(db);
      return test.questions[qIndex];
    }
  }
  return null;
};

export const deleteQuestion = (testId, questionId) => {
  const db = getDatabase();
  const test = db.tests.find(t => t.id === testId);
  if (test && test.questions) {
    test.questions = test.questions.filter(q => q.id !== questionId);
    saveDatabase(db);
    return true;
  }
  return false;
};

// Registration Operations
export const getRegistrations = () => {
  const db = getDatabase();
  return db.registrations || [];
};

export const addRegistration = (registration) => {
  const db = getDatabase();
  const newRegistration = {
    id: Math.max(...db.registrations.map(r => r.id), 0) + 1,
    ...registration,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  db.registrations.push(newRegistration);
  saveDatabase(db);
  return newRegistration;
};

export const updateRegistration = (id, updates) => {
  const db = getDatabase();
  const index = db.registrations.findIndex(r => r.id === id);
  if (index !== -1) {
    db.registrations[index] = { ...db.registrations[index], ...updates };
    saveDatabase(db);
    return db.registrations[index];
  }
  return null;
};

export const deleteRegistration = (id) => {
  const db = getDatabase();
  db.registrations = db.registrations.filter(r => r.id !== id);
  saveDatabase(db);
  return true;
};

// Homepage Manager
export const getHomepage = () => {
  const db = getDatabase();
  return db.homepage || getDefaultDatabase().homepage;
};

export const updateHomepage = (section, data) => {
  const db = getDatabase();
  if (db.homepage[section]) {
    db.homepage[section] = { ...db.homepage[section], ...data };
    saveDatabase(db);
    return db.homepage[section];
  }
  return null;
};

// Settings Manager
export const getSettings = () => {
  const db = getDatabase();
  return db.settings || getDefaultDatabase().settings;
};

export const updateSettings = (updates) => {
  const db = getDatabase();
  db.settings = { ...db.settings, ...updates };
  saveDatabase(db);
  return db.settings;
};

// About Manager
export const getAbout = () => {
  const db = getDatabase();
  return db.about || getDefaultDatabase().about;
};

export const updateAbout = (updates) => {
  const db = getDatabase();
  db.about = { ...db.about, ...updates };
  saveDatabase(db);
  return db.about;
};
