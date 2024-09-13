import Task from "../../models/tasks.model";

import { Request , Response } from "express";
export const index = async(req :Request,res:Response )=>{
   // loc theo trang thai

   const find ={
    deleted:"false"
   };
   if( req.query.status){
    find["status"]  = req.query.status;
   }
// sap xep theo tieu chi 
   const sort = {};
   const sortKey = req.query.sortKey;
   const sortValue = req.query.sortValue;
   if(sortKey && sortValue){

        sort[`${sortKey}`] = sortValue;
   }

   // phan trang 

   let limitItems :number = 2 ;
   if(req.query.limitItems){
    limitItems = parseInt(`${req.query.limitItems}`);

}
let page : number = 1;
if( req.query.page){
    page = parseInt(`${req.query.page}`)

}
const skip :number = (page-1)*limitItems;

// tim kiem
if( req.query.keyword){
    const regex = new RegExp(`${req.query.keyword}` , "i");
    find["title"] = regex;
}

const tasks = await Task
    .find(find)
    .sort(sort)
    .limit(limitItems)
    .skip(skip);
    res.json({
        "task" :tasks
    })

}
export const detail = async(req :Request , res:Response)=>{
    const id = req.params.id;
    const task = await Task.findOne({
        _id:id , 
        deleted: false
    })
    res.json(task);

}
// export const changeStatus = async (req:Request , res:Response)=>{
//    try {
  
//     //      const ids:String[] =req.body.ids;
//     const ids: string[] = req.body.ids;
//     const status: string = req.body.status;
//     console.log(ids);
//     //     console.log(ids);
           
//     //         await Task.updateMany({
//     //             _id: {$in:ids }, 

//     //         } , {
//     //             status :status
//     //         });
//     //         res.json({
//     //             message:"cập nhật dữ liệu thành công"

//     //         })


//    } catch (error) {
//     console.log(error);
//     res.json({
//         messgae:"Not Found"
//     })
//    }
    




// }
export const changeStatus = async (req: Request, res: Response) => {
    try {
      const ids: string[] = req.body.ids;
      const status: string = req.body.status;
        console.log(ids);
      await Task.updateMany({
        _id: { $in: ids }
      }, {
        status: status
      });
  
      res.json({
        message: "Cập nhật dữ liệu thành công!"
      });
    } catch (error) {
        console.log(error);
      res.json({
        message: "Not Found"
      });
    }
}
// export const create = async(req:Request , res:Response)=>{
//     console.log(req.body);
//     const task = new Task(req.body);
//     await task.save();
//     res.json({
//         messgae:"Thêm mới công việc thành công"
//     })


// }

// / [POST] /tasks/create
export const create = async (req: Request, res: Response) => {
  try {
    // req.body.createdBy = req.user.id;

    const task = new Task(req.body);
    await task.save();

    res.json({
      message: "Tạo công việc thành công!",
      task: task
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Not Found"
    });
  }
}
 export const edit = async(req:Request  , res:Response)=>{
  try {
    const id:String = `${req.params.id}`;
    console.log(id);
  await Task.updateOne({
    _id :id
  } , req.body);
  res.json({
    message:"Cập nhật trạng thái thành công" , 
 })
  } catch (error) {
      res.json({
        messgae:"Not Found"
      })
  }
  
  

 }
 export const deleted = async(req:Request , res :Response)=>{
  try {
     const id:string = `${req.params.id}`;
    await Task.updateOne({
      _id:id
    } , {
      deleted:true
    }) 
    res.json({
      message:"Đã xóa thành công"
    })
  } catch (error) {
    res.json({
      message:"Not Found"
    })
  }
  


 } 
