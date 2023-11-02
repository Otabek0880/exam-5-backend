import { DataTypes,Model } from "sequelize";
import { newSequelize } from "../config/sequelize.js";

export class CategoryModel extends Model{}

CategoryModel.init({
    category_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    category_name:{
        type:DataTypes.STRING,
        allowNull:false,

    }
},
{
    tableName:"categories",
    sequelize:newSequelize,
    createdAt:false,
    deletedAt:false,
    updatedAt:false
})

