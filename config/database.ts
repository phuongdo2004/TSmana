// // const mongoose = require("mongoose");
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// // neu ghi export default thi khi import ko can co dau {}
//  const  connectDatabase = async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Kết nối database thành công");

//     } catch (error) {
//         console.log("Kết nối database thất bại!");
        
//     }
// };
// export default  connectDatabase ;


import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Kết nối database thành công!");
  } catch (error) {
    console.log(error);
    console.log("Kết nối database thất bại!");
  }
}