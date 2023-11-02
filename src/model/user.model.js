import { DataTypes, Model } from "sequelize";
import {newSequelize} from "../config/sequelize.js";

class UserModel extends Model { }

UserModel.init(
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        secondname: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        phonenumber:{
         type :DataTypes.STRING,
         allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
        },

    },
    {
        tableName: "users",
        sequelize: newSequelize,
        createdAt: false,
        deletedAt: false,
        updatedAt: false,
    }
);

export {UserModel}