import * as express from 'express';
import {nextApp} from '../next/nextApp';

const handler = nextApp.getRequestHandler();
const router = express.Router();

router.get('*', (req, res) => handler(req, res));

export default router;
