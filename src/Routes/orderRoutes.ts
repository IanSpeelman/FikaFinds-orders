import { Request, Response, Router } from "express";

const router = Router()


function test(req: Request, res: Response) {
    res.send('hello world')
}

router.get('/', test)

export default router
