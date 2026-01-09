import { Router } from "express";
import { getUploadSignature } from "../controllers/upload.controller";

const router = Router();

router.get("/sign", getUploadSignature);

export default router;
