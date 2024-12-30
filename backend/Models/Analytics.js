const { getAllUsers, updateUserRole, deleteUser } = require('../Controllers/adminController');

// User Management Routes
router.get('/users', getAllUsers);               // View all users
router.put('/users/:id/role', updateUserRole);   // Update user role
router.delete('/users/:id', deleteUser);         // Delete user
