import { Router, Request, Response } from 'express';
import { ImageFilterRouter } from './image_filter/routes/image_filter.router';


const router: Router = Router();

router.use('/filteredimage', ImageFilterRouter);

export const IndexRouter: Router = router;