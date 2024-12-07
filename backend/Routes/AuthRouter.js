const { signup, login } = require('../Controllers/AuthController.js');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation.js');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

const validationError = validatePassword(newPassword);
if (validationError) {
  return res.status(400).json({ error: validationError });
}

router.post('/change-password', authenticateUser, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
  
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Both old and new passwords are required' });
    }


    const user = await user.findById(req.user.id); 

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;