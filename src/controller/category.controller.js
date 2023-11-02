import { CategoryModel } from "../model/index.model.js";
import { validCategory } from "../validFunctions/valid.function.js";
import { BookModel } from "../model/index.model.js";
/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @returns 
 */
export const getCategories = async(req,res)=>{
    const categories = await CategoryModel.findAll();
    return res.status(200).json({
        data:categories
    })
}

export const getCategoryById = async (req, res ) => {
    const { id } = req.params;
    
    const category = await CategoryModel.findOne({ where: { category_id: id } })
    const books = await BookModel.findAll({where:{category_id:category.category_id}})
    
    return res.status(200).json({
        data:category,
        books:books
    })
}




export const addCategory = async (req, res) => {
    const { category_name } = req.body;
    if (!category_name) {
        return res.status(400).json({
            error: "enter the data completely "
        })
    }
    if (!validCategory(category_name)) {
        return res.status(400).json({
            error: "category name is invalid"
        })
    }
    const category = await CategoryModel.findOne({ where: { category_name: category_name } })
    if (category) {
        return res.status(401).json({
            msg: "category name is already exist"
        })
    }
    const category2 = await CategoryModel.create({
        category_name: category_name.trim()
    })

    return res.status(201).json({
        data: category2,
        msg: "category created succesfully"
    })

}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await CategoryModel.findOne({ where: { category_id: id } })
    if (!category) {
        return res.status(404).json({
            error: "this category is not exist"
        })
    }
    await CategoryModel.destroy({ where: { category_id: id } })
    return res.status(200).json({
        msg: "category is deleted succesfully"
    })
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json({
            error: "enter the data completely "
        })
    }


    if (!validCategory(category_name)) {
        return res.status(400).json({
            error: "category name is invalid"
        })
    }
    const category = await CategoryModel.findOne({where:{category_id:id}});
    if(!category){
        return res.status(404).json({
            error:"this category not found"
        })
    }
    category.category_name = category_name ?? category.category_name;
    category.save()

    
    return res.status(200).json({
        data: category,
        msg: "category is updated succesfully"

    })
}