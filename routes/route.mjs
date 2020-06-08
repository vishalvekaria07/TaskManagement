import express from 'express';
const router = express.Router();
import {
    createTask, getTaskByName, deleteTask, updateTask, getTask,
    randomProfile, getTaskByDate, getProfiledata
} from '../app/service'


router.post('/createTask', createTask)
router.get('/getTaskByName', getTaskByName)
router.get('/getTask', getTask)
router.get('/getTaskByDate', getTaskByDate)
router.delete('/deleteTask/:task_id', deleteTask)
router.patch('/updateTask/:task_id', updateTask)
router.post('/profile', randomProfile)
router.get('/getProfile', getProfiledata)






export default router;
