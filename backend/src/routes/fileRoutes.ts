import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth';
import { createFolder, uploadFile, listFiles, downloadFile, moveOrRename, deleteNode } from '../controllers/fileController';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Keep extension but unique name
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.use(authenticateToken); // Protected routes

router.post('/folder', createFolder as any);
router.post('/upload', upload.single('file'), uploadFile as any);
router.get('/', listFiles as any);
router.get('/:id/download', downloadFile as any);
router.patch('/:id', moveOrRename as any);
router.delete('/:id', deleteNode as any);

export default router;
