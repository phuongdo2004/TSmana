import User from "../../models/user.model";
import{NextFunction, Request , Response } from "express";
import md5 from "md5";
import {generateRandomString , generateRandomNumber} from "../../helpers/generate.helper";
import { verify } from "crypto";
export const register = async(req:Request , res :Response , next :NextFunction)=>{

try {
        
    const email :string = `${req.body.email}`;
    const existUser = await User.findOne({
    email : email,
    deleted:false
    });
if(!existUser){
    res.json({
        messgae:"Tài khoản đã tồn tại "
    })
    return;
}
const password:string  = md5(req.body.password);

const token :String = generateRandomString(30);
req.body.password = password;
req.body.token = token;
 const user = new User(req.body);
 await user.save();
res.json({
    code:200 , 
    message:"Đăng kí tài khoản thành công" , 
    token : token
})


    } catch (error) {
        res.json({
            message:"Not Found"
        })
    }

}

export const login = async (req :Request , res:Response)=>{
    try {
        
    const email :string = req.body.email;
    const existUser  =await User.findOne({
        email:email , 
        deleted:false
    });
    if( !existUser){
        res.json({
            message:"Tài khoản không tồn tại"
        })
     return ;

    }

    const password :string = md5(`${req.body.password}`);
    if( password!= md5(req.body.password)){
        res.json({
            code:200,
            message :"Mật khẩu không đúng" , 
        })
        return ;
    }
    console.log(existUser);
    res.json({
        message :"Đăng nhập thành công" , 
        token: existUser.token
    })


    } catch (error) {
        res.json({
            message:"Not Found"
        })
    }


}

