# 🚀 Admin Panel - Tez Qo'llanma

## ⚡ 30 Soniya ichida Boshlash

### 1️⃣ Login
```
URL: http://localhost:5174/admin/login

👤 TEST ACCOUNTS:
   admin    / admin123
   teacher  / teacher123
```

### 2️⃣ Kirish
- Foydalanuvchi nomini kiriting
- Parolni kiriting
- "Kirish" tugmasini bosing

### 3️⃣ Dashboard ga O'tish
- Automat ravishda dashboard sahifasiga o'tasiz

---

## 📱 Menyu Tugmachalari

```
┌─────────────────────────────┐
│  O'QUV-MARKAZ ADMIN PANELI  │
├─────────────────────────────┤
│  📊  Dashboard              │
├─────────────────────────────┤
│  👥  Foydalanuvchilar       │
│  👨‍🏫  O'qituvchilar         │
│  📚  Kurslar                │
│  📋  Ro'yxatlanishlar       │
├─────────────────────────────┤
│  🧑  Shaxsiy Kabinet        │
│  ⚙️   Sozlamalar             │
├─────────────────────────────┤
│  🚪  CHIQISH                │
└─────────────────────────────┘
```

---

## 🎯 Asosiy Vazifalar

### Yangi Foydalanuvchi Qo'shish
```
1. Sidebar → 👥 Foydalanuvchilar
2. ➕ YANGI QOSH
3. Ma'lumot to'ldirish:
   • Ism
   • Email
   • Telefon
   • Darajasi (A1-C2)
   • Holati (Faol/Faol emas)
4. 💾 SAQLASH
```

### Yangi O'qituvchi Qo'shish
```
1. Sidebar → 👨‍🏫 O'qituvchilar
2. ➕ YANGI QOSH
3. Ma'lumot to'ldirish:
   • Ism
   • Sertifikati (IELTS 8.5, ...)
   • Tajribasi (10 yil)
   • Email
   • Telefon
   • Kurslar (birdan ko'p)
4. 💾 SAQLASH
```

### Yangi Kurs Qo'shish
```
1. Sidebar → 📚 Kurslar
2. ➕ YANGI QOSH
3. Ma'lumot to'ldirish:
   • Kurs nomi
   • Darajasi (A1-B1, ...)
   • Vaqti (3 oy, ...)
   • O'qituvchi
   • Narxi (so'mda)
4. 💾 SAQLASH
```

### Ro'yxatlanishni Tasdiqlash
```
1. Sidebar → 📋 Ro'yxatlanishlar
2. "Kutilmoqda" holati bilan so'rovni toping
3. ✓ TASDIQLASH tugmasini bosing
   YOKI
   ✕ RAD ETISH tugmasini bosing
4. Status o'zgaradi
```

---

## 🔍 Qidirish va Filterlash

### Qidirish
```
Qidirish maydoniga ismi yoki emailni yozing
Natijalar real-time yangilanaladi
```

### Filterlash
```
Select dropdown-dan tanlang:
• Barcha holatlari
• Faol
• Faol emas
• Kutilmoqda
• Tasdiqlandi
```

---

## ⌨️ Keyboard Shortcuts

```
Ctrl + S      (Yoki Cmd + S) - Saqlash
Enter         - Modal formada Saqlash
Esc           - Modalni yopish
Tab           - Formada keyingi maydon
```

---

## 🎨 Dark Mode

```
Light Mode → 🌙 tugmasi → Dark Mode
Dark Mode  → ☀️ tugmasi → Light Mode

(Navbar-da, emas admin panel-da)
```

---

## 📊 Dashboard Ko'rsatuvlari

### Stat Cards
```
📚  Jami Kurslar       → Barcha kurslar soni
👨‍🏫  O'qituvchilar      → Barcha o'qituvchilar
👥  Foydalanuvchilar   → Barcha ro'yxatdan o'tganlar
✅  Faol Talabalar    → Faqat faol o'quvchilar
📋  Yangi Ro'yxatlar   → Tasdiqlash kutilmoqdagi
💰  Umumiy Daromad     → Barcha kurslardan
```

### Jadvallar
```
SO'NGGI RO'YXATLANISHLAR
- O'quvchi nomi
- Kurs
- Sana
- Holat
- Telefon

ENG KO'P ARALASHUV OLADIGAN KURSLAR
- Kurs nomi
- Darajasi
- Talabalar soni
- O'qituvchi
- Holati
```

---

## 🔧 Tahrirlash

### Foydalanuvchini Tahrirlash
```
1. Jadvalda ✏️ tugmasini bosing
2. Ma'lumotlarni o'zgartiring
3. 💾 SAQLASH
```

### O'chirish
```
1. Jadvalda 🗑️ tugmasini bosing
2. "Ha, o'chir!" deb tasdiqlang
3. Yozuv o'chiriladi
```

---

## 📋 Jadval Tugmachalari

```
✏️  TAHRIRLASH    - Tahrirlash uchun modal ochadi
🗑️  O'CHIRISH     - Tasdiqlash bilan o'chiradi
✓   TASDIQLASH   - Ro'yxatlanishni tasdiqlash
✕   RAD ETISH    - Ro'yxatlanishni rad etish
```

---

## 🆘 Tez Yechimlar

### Login ishlamayotgan
```
✅ Username: admin
✅ Password: admin123
✅ Brauzer refresh qiling
✅ localStorage ni o'chib tashlang (F12)
```

### Ma'lumotlar ko'rinmayotgan
```
✅ Sahifa refresh qiling (F5)
✅ localStorage tekshiring
✅ Console-da xatolar tekshiring (F12)
```

### Modal oʻchirmayotgan
```
✅ ESC tugmasini bosing
✅ "X" tugmasini bosing
✅ Overlay-ga klikni bosing
```

### Mobile menyu ko'rinmayotgan
```
✅ ☰ tugmasini bosing (yuqori chap)
✅ Sidebar chap tarafdan keladi
✅ Menyudan tanlang
```

---

## 💾 Ma'lumotlar

### Qayerda Saqlanadi?
```
📁 Browser localStorage
   Key: "adminData"
   
Agar o'chishni istasangiz:
1. F12 (Developer Tools)
2. Application tab
3. Storage → localStorage
4. "adminData" ni delete qiling
```

### Qayta Yuklash
```
Sahifa refresh qilinganda:
1. localStorage oʻqiladi
2. Standart ma'lumot yuklanaladi
3. Hammasi normal ishlaydi
```

---

## 📞 Tez Kontaktlar

```
Email:   admin@example.com
Phone:   +998 90 160 05 28
Support: admin@ieltscenter.uz
```

---

## 🎓 Oʻquv Mavzulari

### Foydalanuvchilar Boshqaruvı
```
✅ CRUD operatsiyalari
✅ Jadval rendering
✅ Qidirish & Filterlash
✅ Modal formalar
✅ Confirmation dialogs
```

### Dashboard
```
✅ Real-time statistika
✅ Sonli ko'rsatuvlar
✅ Jadval ma'lumotlari
✅ Data aggregation
```

### Authentication
```
✅ Login funksiyasi
✅ Token saqlash
✅ Protected routes
✅ Logout
```

---

## 🚀 Next Steps

1. **Admin panel-ni ochib ko'ring** 
   → http://localhost:5174/admin/login

2. **Test hisobiga kirish**
   → admin / admin123

3. **Har bir bo'limni sinab ko'ring**
   → Dashboard, Users, Teachers, Courses

4. **Ma'lumot qo'shishni harakat qiling**
   → ➕ tugmalarini bosing

5. **CRUD operatsiyalarini sinab ko'ring**
   → Tahrirlash, o'chirish

---

## ✨ Admin Panel Features

```
✅ Modern dark mode design
✅ Responsive layout (desktop, tablet, mobile)
✅ Real-time updates
✅ Search & filter
✅ Modal forms
✅ Status badges
✅ Loading states
✅ Error handling
✅ User session management
✅ Protected routes
```

---

## 📈 Ko'rishlar

```
DASHBOARD:        6 ta stat, 2 ta jadval
FOYDALANUVCHILAR: CRUD + Search + Filter
O'QITUVCHILAR:    CRUD + Course management
KURSLAR:          CRUD + Multi-field forms
RO'YXATLANISHLAR: Approve/Reject + Stats
PROFIL:           User info + Password change
SOZLAMALAR:       System settings
```

---

**Savollar bo'lsa qo'llanmani oʻqing: [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md)**

**Barcha muammolarni ko'rish uchun: [AUDIT_REPORT.md](./AUDIT_REPORT.md)**

---

**Last Updated:** 2024-2026  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
