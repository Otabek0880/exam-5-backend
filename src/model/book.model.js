import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config/sequelize.js";
export class BookModel extends Model{}

BookModel.init({
    book_id: {
     type:DataTypes.INTEGER,
     autoIncrement:true,
     primaryKey:true
    },
    book_name:{
     type:DataTypes.STRING,
     allowNull:false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    book_pdf:{
        type:DataTypes.STRING,
         allowNull:false
    },
    category:{
      type:DataTypes.STRING,
      allowNull:false
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
  
    author:{
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},
{
    tableName:"books",
    sequelize:newSequelize,
    updatedAt:false,
    deletedAt:false,
    createdAt:false
})

