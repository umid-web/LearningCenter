# O'quv-Markaz Admin Panel - Foydalanuvchi Qo'llanmasi

## 📋 Umumiy Ma'lumot

Bu admin panel O'quv-Markaz o'quv markazining to'liq boshqaruvini amalga oshirish uchun mo'ljallangan professional tizimdir. Tizim foydalanuvchilar, o'qituvchilar, kurslar va ro'yxatlanishlarni boshqarish uchun zarur bo'lgan barcha funksiyalarni o'z ichiga oladi.

## 🔐 Kirish (Login)

### Test Hisoblar

Admin panelga kirish uchun quyidagi test hisoblardan foydalaning:

```
👨‍💼 ADMIN HISOBI:
   Foydalanuvchi nomi: admin
   Parol: admin123

👨‍🏫 O'QITUVCHI HISOBI:
   Foydalanuvchi nomi: teacher
   Parol: teacher123
```

**Kirish URL:** `http://localhost:5174/admin/login`

## 📊 Admin Panel Tuzilishi

### Asosiy Menyu

Admin panelning chap tarafidagi sidebar quyidagi bo'limlarga ajratilgan:

```
┌─────────────────────────────────────┐
│     O'QUV-MARKAZ ADMIN PANELI       │
├─────────────────────────────────────┤
│  📊 DASHBOARD                       │
├─────────────────────────────────────┤
│      BOSHQARUV                      │
│  👥  Foydalanuvchilar              │
│  👨‍🏫  O'qituvchilar               │
│  📚  Kurslar                        │
│  📋  Ro'yxatlanishlar              │
├─────────────────────────────────────┤
│      SOZLAMALAR                     │
│  🧑  Shaxsiy Kabinet               │
│  ⚙️   Sozlamalar                    │
├─────────────────────────────────────┤
│  🚪  CHIQISH                        │
└─────────────────────────────────────┘
```

## 🎯 Har bir Bo'limning Ta'rifi

### 1️⃣ Dashboard (Bosh Sahifa)

**Maqsadi:** Tizimning umumiy holati va statistikasini ko'rish

**Funktsiyalari:**
- ✓ Jami kurslar soni
- ✓ O'qituvchilar soni
- ✓ Barcha foydalanuvchilar soni
- ✓ Faol talabalar soni
- ✓ Yangi ro'yxatlanishlar soni
- ✓ Umumiy daromad
- ✓ So'nggi ro'yxatlanishlar jadval
- ✓ Eng ko'p aralashuv oladigan kurslar

### 2️⃣ Foydalanuvchilar Boshqaruvi (User Management)

**Maqsadi:** Barcha ro'yxatdan o'tgan o'quvchilarni boshqarish

**CRUD Operatsiyalari:**

```
CREATE (Qo'shish):
├─ ➕ Yangi Foydalanuvchi Qo'shish tugmasi
├─ Modal oynada ma'lumot to'ldirish
└─ Saqlash

READ (Ko'rish):
├─ Barcha foydalanuvchilar jadvalda
├─ Qidirish (ismi yoki emaili bo'yicha)
└─ Holati bo'yicha filterlash (faol/faol emas)

UPDATE (O'zgartirish):
├─ ✏️ Tahrirlash tugmasini bosing
├─ Ma'lumotlarni o'zgartiring
└─ Saqlash

DELETE (O'chirish):
├─ 🗑️ O'chirish tugmasini bosing
├─ Tasdiqlash
└─ Foydalanuvchi o'chiriladi
```

**Qo'shish Formasi:**
- Ism (to'liq ism)
- Email
- Telefon raqami
- Darajasi (A1, A2, B1, B2, C1, C2)
- Holati (Faol / Faol emas)

### 3️⃣ O'qituvchilar Boshqaruvi (Teacher Management)

**Maqsadi:** Sertifikatlangan o'qituvchilarni boshqarish

**CRUD Operatsiyalari:**

```
CREATE (Qo'shish):
├─ ➕ Yangi O'qituvchi Qo'shish
├─ Ism, sertifikat, tajriba, email, telefon
├─ Kurslar qo'shish (birdan ko'pni)
└─ Saqlash

READ (Ko'rish):
├─ O'qituvchilar roʻyxati
├─ Sertifikati (IELTS 8.5, CEFR C2, ...)
├─ Tajribasi (10 yil, 8 yil, ...)
└─ Beriladigan kurslar

UPDATE (O'zgartirish):
├─ ✏️ Tahrirlash
├─ Ma'lumotlarni yangilash
├─ Kurslarni qo'shish/oʻchirish
└─ Saqlash

DELETE (O'chirish):
├─ 🗑️ O'chirish
├─ Tasdiqlash
└─ O'qituvchi o'chiriladi
```

**Qo'shish Formasi:**
- Ism
- Sertifikati (IELTS 8.5, CEFR C2)
- Tajribasi (10 yil)
- Email
- Telefon
- Beriladigan kurslar (birdan ko'p)

### 4️⃣ Kurslar Boshqaruvi (Course Management)

**Maqsadi:** Barcha kurslarni boshqarish

**CRUD Operatsiyalari:**

```
CREATE (Qo'shish):
├─ ➕ Yangi Kurs Qo'shish
├─ Kurs nomi, darajasi, vaqti, o'qituvchi, narx
└─ Saqlash

READ (Ko'rish):
├─ Kurslar jadvalida ma'lumotlar
├─ Darajasi (A1-B1, B2-C1, ...)
├─ O'qituvchi nomi
├─ Talabalar soni
└─ Narx

UPDATE (O'zgartirish):
├─ ✏️ Tahrirlash
├─ Ma'lumotlarni o'zgartirish
└─ Saqlash

DELETE (O'chirish):
├─ 🗑️ O'chirish
├─ Tasdiqlash
└─ Kurs o'chiriladi
```

**Qo'shish Formasi:**
- Kurs nomi
- Darajasi
- Vaqti (3 oy, 4 oy, ...)
- O'qituvchi nomi
- Talabalar soni
- Narxi (so'mda)
- Holati (faol/o'chiq)

### 5️⃣ Ro'yxatlanishlar Boshqaruvi (Registrations)

**Maqsadi:** Yangi ro'yxatlanish so'rovlarini boshqarish

**Funktsiyalari:**

```
TASDIQLA (Approve):
├─ ✓ Tugmasi - so'rovni tasdiqlash
└─ Status o'zgaradi: "Kutilmoqda" → "Tasdiqlandi"

RAD ET (Reject):
├─ ✕ Tugmasi - so'rovni rad etish
└─ Status o'zgaradi: "Kutilmoqda" → "Rad etildi"

O'CHIR (Delete):
├─ 🗑️ Tugmasi - ro'yxatlanishni o'chirish
└─ Yozuv bazadan o'chiriladi

FILTERLASH:
├─ Barcha holatlari
├─ Kutilmoqda
└─ Tasdiqlandi

QIDIRISH:
├─ O'quvchi nomi bo'yicha
└─ Kurs nomi bo'yicha
```

**Statistika:**
- Jami so'rovlar
- Kutilmoqdagi so'rovlar
- Tasdiqlangan so'rovlar

### 6️⃣ Shaxsiy Kabinet (Profile)

**Maqsadi:** Shaxsiy ma'lumotlarni ko'rish va o'zgartirish

**Funktsiyalari:**
- Profil ma'lumotlari (ism, email, telefon)
- Parolni o'zgartirish
- Tizim ma'lumotlari

### 7️⃣ Sozlamalar (Settings)

**Maqsadi:** Tizim sozlamalarini boshqarish

**Parametrlar:**
- Sayt nomi
- Email
- Telefon
- Manzil
- Vaqt mintaqasi
- Til
- Xizmatni to'xtatish rejimi

## 💾 Ma'lumotlar Saqlash

Tizim **localStorage** da ma'lumotlarni saqlaydi. Bu shuni anglatadiki:

- ✅ Serverga murojaat shart emas
- ✅ Tezkor ishlaydi
- ✅ Oʻz kompyuteringizda saqlanaladi

### Ma'lumotlarni Boshqarish

**Loyiha o'zgartirilganda:**
```javascript
// Ma'lumotlarni saqlash
const data = getInitialData(); // Hozirgi ma'lumotlar
data.users = updatedUsers;     // Yangilangan ma'lumot
saveData(data);                // Saqlash
```

## 🎨 Dizayn Tafsifi

Admin panel **dark mode** dizaynida yaratilgan:

```
🎨 RANG SXEMASI:
├─ Asosiy fon: To'q ko'k (#0f172a)
├─ Sidebar: Yengil ko'k (#1e293b)
├─ Accent: Yorqin apelsin (#ff9800)
├─ Matn: Oq-yor (#e0e0e0)
└─ Buttons: Gradient

📱 RESPONSIV:
├─ Desktop: To'liq sidebar
├─ Tablet: Compact sidebar
└─ Mobile: Collapse sidebar
```

## 🚀 Xususiyatlar

### ✅ Amalga Oshirilgan Xususiyatlar

- [x] **Login/Logout** - Xavfsiz kirish va chiqish
- [x] **Dashboard** - Real-time statistika
- [x] **Foydalanuvchilar CRUD** - To'liq boshqaruv
- [x] **O'qituvchilar CRUD** - Sertifikat va tajriba
- [x] **Kurslar CRUD** - Narx va darajaga ko'ra
- [x] **Ro'yxatlanishlar** - Tasdiqlash/Rad etish
- [x] **Profil** - Shaxsiy ma'lumotlar
- [x] **Sozlamalar** - Tizim parametrlari
- [x] **Qidirish & Filterlash** - Tozalashtirilgan natijalar
- [x] **Modal formalar** - Oson boshqaruv
- [x] **Status badges** - Vizual feedback
- [x] **Loading states** - Foydalanuvchi feedback
- [x] **Error handling** - Xatolarning to'g'ri boshqaruvi

## 📊 Tizim Arxitekturasi

```
┌─────────────────────────────────────────┐
│     React 19 + React Router v7          │
├─────────────────────────────────────────┤
│         Admin Panel Components          │
├─────────────────────────────────────────┤
│  • AdminLayout - Asosiy layout         │
│  • Dashboard - Statistika              │
│  • UserManager - Foydalanuvchilar      │
│  • TeacherManager - O'qituvchilar      │
│  • CourseManager - Kurslar             │
│  • RegistrationsManager - Ro'yxatlar   │
│  • Settings - Sozlamalar               │
│  • Profile - Profil                    │
├─────────────────────────────────────────┤
│    Utils (auth.js - Authentication)     │
├─────────────────────────────────────────┤
│   SCSS Styling - Dark Mode Design       │
└─────────────────────────────────────────┘
```

## 🔧 Teknik Ma'lumot

### Fayllar Tuzilishi

```
src/Admin/
├── AdminLayout.jsx           # Asosiy layout
├── Dashboard.jsx             # Dashboard
├── UserManager.jsx           # Foydalanuvchilar boshqaruvı
├── TeacherManager.jsx        # O'qituvchilar boshqaruvı
├── CourseManager.jsx         # Kurslar boshqaruvı
├── RegistrationsManager.jsx  # Ro'yxatlanishlar
├── Settings.jsx              # Sozlamalar
├── Profile.jsx               # Profil
├── Login.jsx                 # Login sahifasi
└── admin.scss                # Barcha stillar

src/utils/
└── auth.js                   # Authentication & data

src/App/
└── App.jsx                   # Routes bilan updated
```

### Key Functions (auth.js)

```javascript
// Authentication
isAdmin()              // Admin ekanini tekshirish
getCurrentUser()       // Hozirgi foydalanuvchi
login(username, pass) // Kirish
logout()              // Chiqish

// Data Management
getInitialData()      // Ma'lumotlarni oʻqish
saveData(data)        // Ma'lumotlarni saqlash
```

## 🐛 Tez Malakalashi

### Muammo: Login ishlamayotgan
```
✅ Test hisoblarni tekshiring:
   admin / admin123
   teacher / teacher123
```

### Muammo: Ma'lumotlar saqlanmayotgan
```
✅ Browser console-ni tekshiring
✅ localStorage deb, ochilgan bo'lsa, o'chirib tashlashni sinab ko'ring
✅ Brauzer refresh qiling
```

### Muammo: Sidebar ko'rinmayotgan (mobile)
```
✅ ☰ tugmasini bosing
✅ Sidebar chap tarafdan keladi
```

## 📝 Yangi Foydalanuvchi Qo'shish - Qadamlar

1. **Foydalanuvchilar sahifasiga o'tish**
   - Sidebar-dan "👥 Foydalanuvchilar" ni bosing

2. **Yangi foydalanuvchi qo'shish tugmasini bosing**
   - "➕ Yangi Foydalanuvchi Qo'shish" ni bosing

3. **Formani to'ldirish**
   - Ism: "Abdulvaliyev Alisher"
   - Email: "alisher@example.com"
   - Telefon: "+998 90 123 45 67"
   - Darajasi: "B2"
   - Holati: "Faol"

4. **Saqlash**
   - "Saqlash" tugmasini bosing
   - Jadvalda yangi foydalanuvchi ko'rinadi

## 📚 Qo'shimcha Resurslar

### Foydalanuvchi Ruxsatlari
- ✅ Boshqa foydalanuvchilarni ko'rish
- ✅ Foydalanuvchi qo'shish/o'zgartirish
- ✅ Foydalanuvchi o'chirish
- ✅ Kurslar boshqarish
- ✅ O'qituvchilar boshqarish

### Xavfsizlik
- ✅ Parollar hashed (simple demo uchun)
- ✅ localStorage da saqlanadi
- ✅ Login zorurligi borligidir

## 🎓 Oʻquv Maqsadi

Bu admin panel quyidagi texnologiyalarni oʻqitish uchun yaratilgan:

- React 19 hooks (useState, useEffect)
- React Router v7 navigation
- CRUD operatsiyalari
- State management
- Form handling
- Modal components
- Table rendering
- Responsive design
- Dark mode implementation

---

**Versiya:** 1.0.0  
**Oxirgi yangilanish:** 2024-2026  
**Til:** O'zbek va Ingliz  

**Savollar yoki masalalar bo'lsa, admin@example.com ga yozing.**
