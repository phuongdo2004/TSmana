// chuyen js => ts
// const express = require("express");
// nhung kieu  du lieu Express
// cac tu khoa khac ngoai express thi de tronh {} (vi express la export default)
import express , {Express} from "express";
import dotenv from "dotenv";
dotenv.config();
import  {connectDatabase}  from "./config/database";
connectDatabase();
// const app = express();
// kieu Express dc nhung vao
const app :Express = express();

import cors from 'cors';

// CORS
// Cách 1: Tất cả tên miền được phép truy cập
app.use(cors());

// Cách 2: Áp dụng cho 1 tên miền cụ thể
// const corsOptions = {
//   origin: 'https://abc.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));
// End CORS

// chuyen json => js
import bodyParser from "body-parser";
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


const port : number | String = process.env.PORT|| 3000 ; 
// ket noi router 
import {routesApi} from "./routers/client/index.route";
routesApi(app);

app.listen(port , ()=>{
    console.log(`App listening on port ${port}`);
})
