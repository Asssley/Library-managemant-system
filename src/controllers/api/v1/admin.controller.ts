import { type Request, type Response } from "express";
import type NewBookDTO from "../../../dto/NewBookDTO.js";
import BookRepository from "../../../repositories/book.repository.js";

export const renderMainAdminPage = function (req: Request, res: Response) {
  
}

export const renderAddPage = function (req: Request, res: Response) {

}

export const addBook = function (req: Request, res: Response) {
  try {
    let book: NewBookDTO = req.body;
    

  } catch (e) {
    res.status(400).send({error: "Invalid request"})
  }
}

export const removeBook = function (req: Request, res: Response) {

}