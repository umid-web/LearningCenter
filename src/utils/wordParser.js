import mammoth from 'mammoth';

/**
 * Parse DOCX file and extract test questions
 * Expected format:
 * Question text
 * A) option1
 * B) option2
 * C) option3
 * D) option4
 * Answer: A (or the full option text)
 */

export const parseWordFile = async (file) => {
  try {
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Extract text from docx
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;
    
    // Parse text into questions
    const questions = parseTestText(text);
    
    if (questions.length === 0) {
      throw new Error('No valid questions found in the document. Please check the format.');
    }
    
    return {
      success: true,
      questions,
      count: questions.length,
      message: `${questions.length} ta savol muvaffaqiyatli o'qildi`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Faylni qayta ishlab bo\'lmadi. Format tekshiring.'
    };
  }
};

const parseTestText = (text) => {
  const questions = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Check if this could be a question (skip if it's clearly an option)
    if (!isOption(line)) {
      const questionText = line;
      const options = [];
      let answer = '';
      let j = i + 1;
      
      // Collect options
      while (j < lines.length && options.length < 4) {
        const optionLine = lines[j].trim();
        
        if (isOption(optionLine)) {
          const optionText = cleanOption(optionLine);
          options.push(optionText);
          j++;
        } else if (optionLine.toLowerCase().startsWith('answer:') || optionLine.toLowerCase().startsWith('javob:')) {
          answer = cleanAnswer(optionLine);
          j++;
          break;
        } else if (optionLine === '') {
          j++;
          break;
        } else {
          j++;
        }
      }
      
      // Only create question if we have all 4 options
      if (options.length === 4 && questionText && questionText.length > 5) {
        // Find correct answer index
        let correctAnswerIndex = 0;
        if (answer) {
          const answerLower = answer.toLowerCase();
          if (answerLower === 'a' || answerLower === 'a)') correctAnswerIndex = 0;
          else if (answerLower === 'b' || answerLower === 'b)') correctAnswerIndex = 1;
          else if (answerLower === 'c' || answerLower === 'c)') correctAnswerIndex = 2;
          else if (answerLower === 'd' || answerLower === 'd)') correctAnswerIndex = 3;
        }
        
        questions.push({
          text: questionText,
          options: options,
          correctAnswer: correctAnswerIndex,
          type: 'multiple',
          points: 1
        });
      }
      
      i = j;
    } else {
      i++;
    }
  }
  
  return questions;
};

const isOption = (line) => {
  const trimmed = line.trim();
  // Check if line starts with A), B), C), D) or A., B., C., D. or A:, B:, C:, D:
  return /^[ABCDabcd][).:]\s+/.test(trimmed);
};

const cleanOption = (optionLine) => {
  // Remove A), B), C), D) or A., B., C., D. or A:, B:, C:, D:
  return optionLine.replace(/^[ABCDabcd][).:]\s*/, '').trim();
};

const cleanAnswer = (answerLine) => {
  // Remove "Answer:" or "Javob:" prefix
  let answer = answerLine
    .replace(/^(answer:|javob:)/i, '')
    .trim();
  
  // If answer contains option text, extract just the letter
  if (answer.length > 10) {
    // Try to find which option matches
    const firstChar = answer.charAt(0).toUpperCase();
    if (['A', 'B', 'C', 'D'].includes(firstChar)) {
      answer = firstChar;
    }
  }
  
  return answer;
};

/**
 * Validate parsed questions before saving
 */
export const validateQuestions = (questions) => {
  const errors = [];
  
  questions.forEach((q, index) => {
    if (!q.text || q.text.trim().length === 0) {
      errors.push(`Savol ${index + 1}: Savol matni bo'sh`);
    }
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Savol ${index + 1}: To'liq 4 ta variant bo'lishi kerak`);
    }
    if (q.options.some(opt => !opt || opt.trim().length === 0)) {
      errors.push(`Savol ${index + 1}: Ba'zi variantlar bo'sh`);
    }
    if (q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer > 3) {
      errors.push(`Savol ${index + 1}: To'g'ri javob noma'lum`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
