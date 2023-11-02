import { Model,DataTypes } from "sequelize";
import { newSequelize } from "../config/sequelize.js";

class AuthorModel extends Model{}

AuthorModel.init({
    author_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    first_name :{
        type:DataTypes.STRING,
        allowNull:false
    },
    second_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date_of_birth:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    date_of_death:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    bio:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    author_img:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"authors",
    sequelize:newSequelize,
    createdAt:false,
    deletedAt:false,
    updatedAt:false
})

export default AuthorModel;