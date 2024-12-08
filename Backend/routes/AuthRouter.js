const { signup, login } = require('../controllers/AuthController.js');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation.js');
const User = require('../models/user');  
const bcrypt = require('bcrypt');
const { authenticateUser } = require('../Middlewares/AuthValidation'); 
const router = require('express').Router();

// Login and signup routes
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);


// // Change password route
// router.post('/change-password', authenticateUser, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;

//   try {
    
//     if (!oldPassword || !newPassword) {
//       return res.status(400).json({ error: 'Both old and new passwords are required' });
//     }

   
//     const user = await User.findById(req.user.id);  

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

    
//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Incorrect current password' });
//     }

  
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

  
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;
