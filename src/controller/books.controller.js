import { BookModel } from "../model/index.model.js";
import { CategoryModel } from "../model/index.model.js";
import { validBookName, validName, validNumber, validPrice, validUrl } from "../validFunctions/valid.function.js";

export const addBook = async (req, res) => {

  try {
    const { book_name, year, author, category, pages, description, title } = req.body;
    if (!book_name || !year || !author || !category || !pages || !description || !title || !req.file) {
      return res.status(400).json({
        error: "enter the data completely"
      })
    }


    if (!validBookName(book_name)) {
      return res.status(400).json({
        error: "book name is invalid"
      })
    }
    const bookname = await BookModel.findOne({ where: { book_name: book_name } })
    if (bookname) {
      return res.status(400).json({
        error: "this book name already exist"
      })
    }


    if (!validName(author)) {
      return res.status(400).json({
        error: "author is invalid"
      })
    }

    if (typeof +pages !== 'number' || pages < 0) {
      return res.status(400).json({
        error: "pages is invalid"
      })
    }
    if (typeof +year !== 'number' || year < 0) {
      return res.status(400).json({
        error: "year is invalid"
      })
    }
    if (typeof description !== 'string') {
      return res.status(400).json({
        error: "description is invalid"
      })
    }
    if (!validUrl(title)) {
      return res.status(400).json({
        error: "title url is in valid"
      })
    }
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        error: 'Only PDF files are allowed'
      })
    }
    const category2 = await CategoryModel.findOne({ where: { category_name: category } })
    if (!category2) {
      return res.status(404).json({
        error: "category not found"
      })
    }
    const book2 = await BookModel.findOne({ where: { book_name: book_name } })
    if (book2) {
      return res.status(400).json({
        error: "this book name already exist"
      })
    }
    const book = await BookModel.create({
      book_name,
      title,
      book_pdf: `/${req.file.filename}`,
      category,
      pages,
      year,
      author,
      description,
      category_id: category2.category_id
    })

    return res.status(201).json({
      msg: "book is created succesfully"
    })

  } catch (error) {
    console.log(error.message);
  }
}

export const getBooks = async (req, res) => {
  try {

    const data = await BookModel.findAll()

    return res.send(data)
  } catch (error) {
    console.log(error);
  }
}
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findOne({ where: { book_id: id } })
    if (!book) {
      return res.status(404).json({
        error: "book  not found"
      })
    }
    return res.status(200).json({
      data: book
    })
  } catch (error) {
    console.log(error.message);
  }
}


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findOne({ where: { book_id: id } });
    if (!book) {
      return res.status(404).json({
        error: "book  not found"
      })
    }
    await BookModel.destroy({ where: { book_id: id } })
    return res.status(200).json({
      msg: "book is deleted succesfully"
    })
  } catch (error) {
    console.log(error.message);
  }
}

export const updateBook = async (req, res) => {
  try {
    const { book_name, year, author, category, pages, description, title,category_id } = req.body;
    if(!book_name && !year  && !author && !category_id && !pages && !description && !title && !req.file){
         return res.status(400).json({
          error:"enter the data completely"
         })
    }
    const { id } = req.params;
    const book = await BookModel.findOne({ where: { book_id: id } });
    if (!book) {
      return res.status(404).json({
        error: "book not found"
      })
    }

    if (book_name && !validBookName(book_name)) {
      return res.status(400).json({
        error: "book name is invalid"
      })
    }


    if (author && !validName(author)) {
      return res.status(400).json({
        error: "author is invalid"
      })
    }

    if (pages && typeof +pages !== 'number' || pages < 0) {
      return res.status(400).json({
        error: "pages is invalid"
      })
    }
    if (year && typeof +year !== 'number' || year < 0) {
      return res.status(400).json({
        error: "year is invalid"
      })
    }
    if (description && typeof description !== 'string') {
      return res.status(400).json({
        error: "description is invalid"
      })
    }
    if (title && !validUrl(title)) {
      return res.status(400).json({
        error: "title url is in valid"
      })
    }
    if (req.file && req.file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        error: 'Only PDF files are allowed'
      })
    }
    if(req.file){
      book.book_pdf = `/${req.file.filename}` ?? book.book_pdf
    }
  
   
      book.book_name = book_name ?? book.book_name,
      book.title = title ?? book.title
    book.author = author ?? book.author,

      book.pages = pages ?? book.pages,
      book.description = description ?? book.description
    book.year = year ?? book.year,
      book.category = category ?? book.category
      book.category_id = category_id ?? book.category_id
    book.save()

    return res.status(200).json({
      msg: "book is updated succesfully",
      data: book,

    })
  } catch (error) {
    console.log(error.message);
  }
}
export const downloadBook = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findOne({ where: { book_id: id } })
  const file = book.book_pdf;
  return res.status(200).send(file)


}