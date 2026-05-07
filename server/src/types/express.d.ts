import { Request } from "express";
import { File as MulterFile } from "multer";

export interface AuthRequest extends Request {
  userId?: string;
  file?: MulterFile;
}