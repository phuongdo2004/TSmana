import {Request , Response ,NextFunction} from "express";

import User from "../models/user.model";

//kiem tra xem co token hay ko
export const requireAuth = async(req:Request , res:Response , next :NextFunction)=>{
    const authorization :string = req.headers.authorization;
   // la bien chua token nhung ghep vs 1 max khac
    if( !authorization){
        res.json({
            code:400  , 
            message :"Vui lòng gửi kèm theo token"
        })
        return;
    }
    // lọc token
    const token :string = authorization.split(" ")[1];
    if( !token){
        res.json({
            code:400 , 
            messgae :"Vui lòng gửi kèm theo token"

        })
        return;
    }
    // xem có tồn tại token đó ko 
    const user = await User.findOne({
        token:token , 
        deleted:false,
    })
    if( !user){
        res.json({
            code:403 , 
            message :"Token không hợp lệ"
        })
        return ;
    }

    
    req["user"] = user ;
    req["tokenVerify"] = token;
   
next();

}