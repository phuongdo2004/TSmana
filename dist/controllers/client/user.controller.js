"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../helpers/generate.helper");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = `${req.body.email}`;
        const existUser = yield user_model_1.default.findOne({
            email: email,
            deleted: false
        });
        if (!existUser) {
            res.json({
                messgae: "Tài khoản đã tồn tại "
            });
            return;
        }
        const password = (0, md5_1.default)(req.body.password);
        const token = (0, generate_helper_1.generateRandomString)(30);
        req.body.password = password;
        req.body.token = token;
        const user = new user_model_1.default(req.body);
        yield user.save();
        res.json({
            code: 200,
            message: "Đăng kí tài khoản thành công",
            token: token
        });
    }
    catch (error) {
        res.json({
            message: "Not Found"
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const existUser = yield user_model_1.default.findOne({
            email: email,
            deleted: false
        });
        if (!existUser) {
            res.json({
                message: "Tài khoản không tồn tại"
            });
            return;
        }
        const password = (0, md5_1.default)(`${req.body.password}`);
        if (password != (0, md5_1.default)(req.body.password)) {
            res.json({
                code: 200,
                message: "Mật khẩu không đúng",
            });
            return;
        }
        console.log(existUser);
        res.json({
            message: "Đăng nhập thành công",
            token: existUser.token
        });
    }
    catch (error) {
        res.json({
            message: "Not Found"
        });
    }
});
exports.login = login;
