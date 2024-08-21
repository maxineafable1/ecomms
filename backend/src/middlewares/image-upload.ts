import path from 'path'
import multer from "multer"
import { NextFunction, Response } from 'express'

const MAX_FILE_SIZE = 1024 * 1024

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: MAX_FILE_SIZE
  }
}).single('file')

export function imageUpload(_: any, res: Response, next: NextFunction) {
  upload(_, res, (err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      next()
    }
  })
}