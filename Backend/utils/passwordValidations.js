module.exports = function validatePassword(password) {
  const minLength = 8;
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  return null; 
};


const validationError = validatePassword(newPassword);
if (validationError) {
  return res.status(400).json({ error: validationError });
}
