import AuthorModel from "../model/author.model.js";
import { BookModel } from "../model/book.model.js";
import { validName } from "../validFunctions/valid.function.js";

export const getAuthors = async(req,res)=>{
    const authors = await AuthorModel.findAll();
    return res.status(200).json({
        data:authors
    })
}

export const getAuthorById = async(req,res)=>{
    const {id} = req.params;
    const author = await AuthorModel.findOne({where:{author_id:id}})
    const authorBooks = await BookModel.findAll({where:{author:author.first_name}})

    author.books = []
    author.books.push(authorBooks)


    return res.status(200).json({
        data:author
    })
}

export const addAuthor = async(req,res)=>{
  try {
    const {first_name,second_name,date_of_birth,date_of_death,bio} = req.body;
    if(!first_name || !second_name || !date_of_birth ||! date_of_death || !bio || !req.file){
        return res.status(401).json({
            error:"enter the data completely"
        })
    }
    if(!validName(first_name)){
        return res.status(401).json({
            error:"first name is invalid"
        })
    } 
    if(!validName(second_name)){
        return res.status(401).json({
            error:"second name is invalid"
        })
    }
    if(typeof +date_of_birth == 'string'){
        return res.status(401).json({
            error:"date of birth is invalid"
        })
    }
    if(typeof +date_of_death == 'string'){
        return res.status(401).json({
            error:"date of death is invalid"
        })
    }
    if(typeof bio !== 'string'){
        return res.status(401).json({
            error:"bio is invalid"
        })
    }
    if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
        return res.status(400).json({
          error: "Only JPEG and PNG image files are allowed"
        })
    }
    const author = await AuthorModel.findOne({where:{first_name:first_name}});
    if(author){
        return res.status(401).json({
            error:"this author already exist" 
        })
    }
    await AuthorModel.create({
        first_name,
        second_name,
        date_of_birth:date_of_birth,
        date_of_death:date_of_death,
        bio,
        author_img:`/${req.file.filename}`
    })
    return res.status(201).json({
        msg:"author created succesfully"
    })
  } catch (error) {
    console.log(error.message);
  }
} 

export const deleteAuthor = async(req,res)=>{
   try {
    const {id} = req.params;
    await AuthorModel.destroy({where:{author_id:id}})
    return res.status(200).json({
        msg:"user deleted succesfully"
    })
   } catch (error) {
    console.log(error.message);
   }
}

export const updateAuthor = async(req,res)=>{
  try {
    const {first_name,second_name,date_of_birth,date_of_death,bio} = req.body;
    const {id} = req.params;
    const author = await AuthorModel.findOne({where:{author_id:id}})
    if(req.file){
        author.author_img =`/${req.file.filename}` ?? author.author_img
    }
    author.first_name = first_name ?? author.first_name,
    author.second_name = second_name ?? author.second_name,
    author.date_of_birth = date_of_birth ?? author.date_of_birth,
    author.date_of_death = date_of_death ?? author.date_of_death,
    author.bio = bio ?? author.bio
    author.save()
    return res.status(200).json({
        msg:"user updated succesfully",
        data:author
    })

  } catch (error) {
    console.log(error.message);    
  }  
}