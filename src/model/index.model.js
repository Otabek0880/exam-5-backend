import { CategoryModel } from "./category.model.js"
import { BookModel } from "./book.model.js"

CategoryModel.hasMany(BookModel,{
    foreignKey:"category_id",

})


 CategoryModel.sync({alter:true});
 BookModel.sync({alter:true})
 

export {CategoryModel,BookModel};