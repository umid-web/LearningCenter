# Word Fayldan Test Yaratish (Word File Test Generator)

## Xulosa (Overview)

Admin panelda Word (.docx) fayldan avtomatik ravishda testlar yaratish imkoniyati qo'shildi. Bu feature IELTS, CEFR va boshqa kurslarda ko'p sonli testlarni tezda kiritish uchun ishlatiladi.

## Xususiyatlar (Features)

✅ **Word faylni avtomatik parse qilish** - Fayldan savol, variantlar va javoblarni o'qiydi
✅ **Real-time preview** - Yuklashdan oldin savollarni ko'rish imkoniyati
✅ **Editor** - Yuklanishdan oldin savollarni tahrirlash
✅ **Smart validation** - Format va mazmuni tekshirish
✅ **Bulk import** - 50+ savol bir vaqtda yaratish
✅ **CRUD operation** - Savollarni yaratish, o'qish, tahrirlash, o'chirish

---

## Word Fayl Formati (Format Requirement)

### To'g'ri Format

```
Savol 1 matni yoki Q1: The teacher teaches the class.
A) the classroom
B) students
C) lessons
D) knowledge
Answer: C

Savol 2 matni
A) Variant 1
B) Variant 2
C) Variant 3
D) Variant 4
Javob: A
```

### Format Talabi (Mandatory)

1. **Savol matni** - Harqanday matn (5+ ta belgi)
2. **Variantlar** - Juda A), B), C), D) yoki A., B., C., D. yoki A:, B:, C:, D:
3. **To'g'ri javob** - "Answer:" yoki "Javob:" so'zi bilan
   - Faqat harf: A, B, C yoki D
   - Yoki javob matni (birinchi harfi tekshiriladi)

### Format Misollari (Valid Examples)

#### Variant 1: Simple Format
```
Question text here
A) Option 1
B) Option 2
C) Option 3
D) Option 4
Answer: B
```

#### Variant 2: Uzbek Language
```
Savol matni
A) Birinchi variant
B) Ikkinchi variant
C) Uchinchi variant
D) To'rtinchi variant
Javob: A
```

#### Variant 3: With Dots
```
Q1. This is a question?
A. First choice
B. Second choice
C. Third choice
D. Fourth choice
Answer: D
```

#### Variant 4: Mixed Format
```
English question text
A) English option
B) English option
C) English option
D) English option
Javob: C
```

---

## Qo'llanma (How to Use)

### Step 1: Admin Panelga Kirish (Login to Admin)
```
URL: /admin/login
Username: admin
Password: admin123
```

### Step 2: Testlar Bo'limiiga O'tish (Navigate to Tests)
- Sidebar menusida "❓ Testlar" linkini bosing
- Testlar Boshqaruvi sahifasiga o'tasiz

### Step 3: Word Fayldan Yaratish Tugmasini Bosing
- "📄 Word Fayldan Yaratish" (green) tugmasini bosing
- Modal dialog ochiladi

### Step 4: Word Faylni Tanlang (Select File)
- "Choose File" tugmasini bosing yoki faylni drag-drop qiling
- Faqat .docx formatdagi fayllar qabul qilinadi

### Step 5: Savollarni Tekshiring (Review)
- System avtomatik 4 ta variantli savollarni parse qiladi
- Format talabiga mos bo'lgan savollarni o'qiydi
- Preview ko'rsatiladi

### Step 6: Test Ma'lumotlarini Kiriting (Enter Test Info)
- **Test Nomi**: "Grammar Test Unit 5"
- **Tavsif**: "O'rta (B1) darajasidagi grammatika testi"
- **Daraja**: A1, A2, B1, B2, C1 dan birini tanlang

### Step 7: Savollarni Tahrirlang (Edit Questions - Optional)
- Savollar ro'yxatini scroll qiling
- Savol matni, variantlar, to'g'ri javobni o'zgartiring
- Xushunchalarishas kelsa tahrir qiling

### Step 8: Saqlash (Save)
- "✓ Saqlash va Yaratish" tugmasini bosing
- System db.json ga yozadi
- Test muvaffaqiyatli yaratilgan raqami chiqaradi

---

## Technical Details

### Files Created

1. **`src/utils/wordParser.js`** - Word faylni parse qilish
   - `parseWordFile(file)` - Fayl o'qiydi va savollarni qaytaradi
   - `validateQuestions(questions)` - Savollarni tekshiradi
   - Xatolar batafsil ma'lumoti beradi

2. **`src/Admin/WordTestUpload.jsx`** - UI Component
   - File upload interface
   - Preview va editor
   - Validation messages
   - 3-bosqichli wizard

3. **`src/Admin/TestManager.jsx`** - Enhanced
   - Word upload modal integratsiyasi
   - Handler va state management

### Dependencies

```json
{
  "mammoth": "^1.8.0"
}
```

Mammoth library Word fayllarni to'liq-text qilib qaytaradi.

---

## Xatolarni Tuzatish (Error Handling)

### Mumkin Xatolar va Yechim

| Xato | Sababi | Yechim |
|------|--------|--------|
| "Faqat .docx formatdagi fayllar..." | Noto'g'ri fayl turi | Faylni .docx sifatida saqlang |
| "No valid questions found" | Format mos emas | Format Talab bo'limini ko'ring |
| "Savol matni bo'sh" | Kosmos savol | Hamma savolga matn kiriting |
| "To'liq 4 ta variant bo'lishi kerak" | Variantlar kam | A, B, C, D hamma bo'lsin |
| "Hamma variantlar bo'sh" | Bo'sh variantlar | Hamma variantga matn kiriting |
| "To'g'ri javob noma'lum" | Answer: yoki Javob: yo'q | Answer: A/B/C/D qo'shing |

---

## Advanced Features

### 1. Bulk Upload
- Bitta faylda 50+ ta savol kiritish mumkin
- System barchasini bir vaqtda parse qiladi
- Ma'lumotlar JSON sifatida saqlanadi

### 2. Preview Editing
- Har bir savol alohida tahrirlanadi
- Real-time validation
- Draft sifatida nusxa olish mumkin

### 3. CRUD Operations
- **Create** - Word fayldan test yaratish
- **Read** - Yaratilgan testlarni ko'rish
- **Update** - ✏️ tugmasi bilan tahrirlash
- **Delete** - 🗑️ tugmasi bilan o'chirish

### 4. Validation Rules
```javascript
// Format tekshiruvi
- Savol matni: 5+ ta belgi
- Variantlar: 4 ta, bo'sh bo'lmasa
- To'g'ri javob: 0-3 indeks
- Answer line: "Answer:" yoki "Javob:" so'zi bilan
```

---

## Database Schema

### Test Object
```javascript
{
  id: 1,
  title: "Grammar Test",
  description: "B1 level grammar",
  level: "B1",
  duration: 20,
  totalPoints: 4,
  passingScore: 70,
  questions: [
    {
      id: 1,
      text: "She ___ to school daily",
      type: "multiple",
      points: 1,
      options: ["go", "goes", "going", "gone"],
      correctAnswer: 1
    }
  ]
}
```

---

## Best Practices

### ✅ Qilishi Kerak

1. **Aniq savol yozish** - Bitta savol, bitta javob
2. **Variantlarni teng qilish** - O'xshash uzunlik
3. **To'g'ri javoblarni mix qilish** - A, B, C, D birqator
4. **Daraja to'g'ri tanlash** - A1-C1 tarkibidan
5. **Preview tekshirish** - Saqlashdan oldin

### ❌ Qilmaslik Kerak

1. **Noto'g'ri format** - 4 ta variantsiz
2. **Bo'sh variantlar** - Hamma variantni to'ldiring
3. **Javob belgisiz** - Answer:/Javob: qo'shing
4. **Qisqa savollar** - Kamida 5 ta belgi
5. **Dasturi toq** - Faylni .docx sifatida saqlang

---

## Example Word File

### sample_test.docx matni:

```
She ___ to school every day.
A) go
B) goes
C) going
D) gone
Answer: B

I ___ TV yesterday.
A) watch
B) watched
C) watching
D) watches
Javob: B

He ___ a book right now.
A) reads
B) read
C) is reading
D) reading
Answer: C
```

**Natija**: 3 ta savol yaratiladi, barcha variantlar, javoblar to'g'ri parse qilinadi.

---

## Tips & Tricks

### Tezkorlash Usullari

1. **Template fayldan nusxa olish**
   - Birinchi test uchun template yarating
   - Keyingi testlar uchun nusxa oling
   - Faqat savollar va javoblarni o'zgartiring

2. **Bulk copy-paste**
   - Excel yoki Google Sheets dan copy qiling
   - A), B), C), D) formatiga o'zgartiring
   - Word ga paste qiling

3. **Naming convention**
   - File name: `Unit5_Grammar_Test.docx`
   - Test title: "Unit 5 - Grammar Test (B1)"
   - Easy tracking va management

4. **Versioning**
   - `Test_v1.docx`, `Test_v2.docx` (old)
   - `Test_final.docx` (to use)
   - Clear history olish

---

## Troubleshooting

### Problem: "SyntaxError in Word file"
**Solution**: File encoding UTF-8 bo'lishini tekshiring. Word dan `.docx` sifatida saqlang.

### Problem: "Questions not parsing"
**Solution**: Format Talabi bo'limini qayta o'qing. A), B), C), D) oldingi bo'shliq bo'lishi kerak.

### Problem: "Modal not showing"
**Solution**: Browser cache tozalang (Ctrl+Shift+Delete) va refresh qiling.

### Problem: "File upload error"
**Solution**: Fayl <10MB ekanligini tekshiring. .docx formatida saqlang.

---

## API Endpoints

Word upload feature internal API ishlatadi:

```javascript
// Parse Word file
POST /api/parse-word
Request: File (multipart/form-data)
Response: {
  success: boolean,
  questions: Array,
  count: number,
  message: string
}

// Create test from parsed questions
POST /api/tests
Request: {
  title: string,
  description: string,
  level: string,
  questions: Array,
  duration: number,
  totalPoints: number
}
Response: {
  id: number,
  ...testData
}
```

---

## Version History

- **v1.0** (2024) - Word test uploader feature
  - Parse .docx files
  - Auto-extract questions
  - Real-time preview
  - Question editing
  - Full validation

---

## Support & Feedback

Agar muammo yoki taklif bo'lsa:
- Admin panel Settings bo'limiga kiring
- Support tugmasini bosing
- Xabar yuboring

**Contact**: support@oqmarket.uz
**Documentation**: https://docs.oqmarket.uz/word-test-uploader

---

## License

This feature is part of O'quv-Markaz Learning Management System.
© 2024. All rights reserved.
