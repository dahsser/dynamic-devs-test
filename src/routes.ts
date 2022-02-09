import { Request, Response, Router } from "express";

const router = Router();

router.get("/ping", async (req: Request, res: Response) => {
  res.send('pong');
});

router.post("")
export default router;
