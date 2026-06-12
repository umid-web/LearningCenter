// Database API utility functions
// These functions are used for managing test data

export const getTests = () => {
  // Return all tests from the database
  return [];
};

export const addTest = (test) => {
  // Add a new test to the database
  return test;
};

export const updateTest = (id, test) => {
  // Update an existing test in the database
  return { id, ...test };
};

export const deleteTest = (id) => {
  // Delete a test from the database
  return id;
};

export const addQuestion = (testId, question) => {
  // Add a question to a test
  return { testId, ...question };
};

export const updateQuestion = (testId, questionId, question) => {
  // Update a question in a test
  return { testId, questionId, ...question };
};

export const deleteQuestion = (testId, questionId) => {
  // Delete a question from a test
  return { testId, questionId };
};
