import express from 'express';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/verifytoken.js';
import { getUserById, getAllUsers, createNewUser, deleteUser, getUserStats, getUsersView } from '../controller/user.controller.js';


const router = express.Router();


// UPDATE
router.put('/:id', createNewUser)
// verifyTokenAndAuthorization


// DELETE
router.delete('/:id', deleteUser)
// verifyTokenAndAuthorization

// GET
router.get('/find/:id', getUserById)
// verifyTokenAndAdmin

// GET ALL USERS
router.get('/', getAllUsers)
// verifyTokenAndAdmin

// GET USER STATS
router.get('/stats', getUserStats)
// verifyTokenAndAdmin

// VIEWS
router.get('/views', getUsersView)


export default router