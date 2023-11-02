import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { UserModel } from "../model/user.model.js";
import "dotenv/config.js"
import { validEmail, validName, validPassword, validPhoneNumber } from '../validFunctions/valid.function.js';

export const signUp = async (req, res) => {
    try {
        const { firstname, secondname, phonenumber, email, password } = req.body;

        if (!firstname || !secondname || !phonenumber || !email || !password) {
            return res.status(400).json({

                error: "enter the data completely"
            })
        }

        if (!validName(firstname.trim())) {
            return res.status(400).json({
                error: "first name  is invalid"
            })
        }
       
        if (!validName(secondname.trim())) {
            return res.status(400).json({
                error: "second name  is invalid"
            })
        }

     

        if (!validPhoneNumber(phonenumber.trim())) {
            return res.status(400).json({

                error: "phone number is invalid"
            })
        }
      

        if (!validEmail(email.trim())) {
            return res.status(400).json({

                error: "email is invalid"
            })
        }
     

        if (!validPassword(password.trim())) {
            return res.status(400).json({

                error: "password is invalid"
            })
        }
        

        const hashedpassowrd = bcrypt.hashSync(password.trim(), 10);

        const user = await UserModel.findOne({ where: { email: email } });
        if (user) {
            return res.status(401).json({

                error: "you are already registered"
            })
        }

        const user3 = await UserModel.create({
            firstname: firstname.trim(),
            secondname: secondname.trim(),
            phonenumber: phonenumber.trim(),
            email: email.trim(),
            password: hashedpassowrd,
            isAdmin: false
        })
        
        const user2 = await UserModel.findOne({ where: { email: email } });


        const token = jwt.sign({
            id: user2.id,
            email: email.trim(),
            password: hashedpassowrd,
            isAdmin: user2.isAdmin
        }, process.env.SECRET_KEY)

        return res.status(201).json({

            token: token,
            msg: "you are registered succesfully"
        })


    } catch (error) {
        console.log(error.message);
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email  || !password ) {
        return res.status(400).json({
            
            error: "enter the data completely"
        })
    }

    if (!validEmail(email.trim())) {
        return res.status(400).json({
            error: "email is invalid"
        })
    }

    if (!validPassword(password.trim())) {
        return res.status(400).json({
            error: "password is invalid"
        })
    }
    const user = await UserModel.findOne({ where: { email: email.trim() } })
    if (!user) {
        return res.status(403).json({
            error: "you are not registered"
        })
    }
    const isValidPassword = bcrypt.compareSync(password.trim(), user.password)

    if (!isValidPassword) {
        return res.status(400).json({
            error: "password is error"
        })
    }
    
    const hashedpassowrd = bcrypt.hashSync(password.trim(), 10);
    const token = jwt.sign({
        id: user.id,
        email: email.trim(),
        password: hashedpassowrd,
        isAdmin: user.isAdmin
    }, process.env.SECRET_KEY)

    return res.status(200).json({
        data:user,
        token: token,
        msg: "you are logged succesfully"
    })

}

export const getuserInfo = async(req,res)=>{
    const token = req.headers["authorization"];
    const verifiedToken = jwt.verify(token,process.env.SECRET_KEY)
    const user = await UserModel.findOne({where:{id:verifiedToken.id}})
    return res.status(200).json({
        data:user
    })
}

export const updateUserInfo = async (req, res) => {
    const { firstname, secondname ,phonenumber} = req.body;
    if(!firstname && !secondname && !phonenumber){
      return res.status(400).json({
        error:"enter data completely"
      })
    }
    const token = req.headers["authorization"];


    if (firstname && !validName(firstname)) {
        return res.status(400).json({
            error: "firstname is invalid"
        })
    }


    if (secondname && !validName(secondname)) {
        return res.status(400).json({
            error: "secondname is invlid"
        
        })
    }
    if(phonenumber && !validPhoneNumber(phonenumber)){
        return res.status(400).json({
            error:"phonenumber is invalid"
        })
    }
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY)

    const user = await UserModel.findOne({ where: { id: verifiedToken.id } });
   console.log(user);
        user.firstname = firstname ?? user.firstname
        user.secondname = secondname ?? user.secondname
       
        user.phonenumber = phonenumber ?? user.phonenumber
        user.save()
    
    return res.status(200).json({
        data:user,
        msg: "user updated succesfully"
    })
}
export const updateUserPassword = async (req, res) => {
    const { password } = req.body;
    const token = req.headers["authorization"]
    if (!password) {
        return res.status(400).json({
            error: "enter the data completely"
        })
    }
    

    if (!validPassword(password)) {
        return res.status(400).json({
        
            error: "password is invalid"
        })
    }
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY)
    const user = await UserModel.findOne({ where: { id: verifiedToken.id } });
    const hashedpassowrd = bcrypt.hashSync(password.trim(), 10);
    user.password = hashedpassowrd;
    user.save();
    return res.status(200).json({
        data: user,
        msg: "password is updated succesfully"
    })
}