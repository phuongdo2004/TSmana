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
exports.deleted = exports.edit = exports.create = exports.changeStatus = exports.detail = exports.index = void 0;
const tasks_model_1 = __importDefault(require("../../models/tasks.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: "false"
    };
    if (req.query.status) {
        find["status"] = req.query.status;
    }
    const sort = {};
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    if (sortKey && sortValue) {
        sort[`${sortKey}`] = sortValue;
    }
    let limitItems = 2;
    if (req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    }
    let page = 1;
    if (req.query.page) {
        page = parseInt(`${req.query.page}`);
    }
    const skip = (page - 1) * limitItems;
    if (req.query.keyword) {
        const regex = new RegExp(`${req.query.keyword}`, "i");
        find["title"] = regex;
    }
    const tasks = yield tasks_model_1.default
        .find(find)
        .sort(sort)
        .limit(limitItems)
        .skip(skip);
    res.json({
        "task": tasks
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield tasks_model_1.default.findOne({
        _id: id,
        deleted: false
    });
    res.json(task);
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body.ids;
        const status = req.body.status;
        console.log(ids);
        yield tasks_model_1.default.updateMany({
            _id: { $in: ids }
        }, {
            status: status
        });
        res.json({
            message: "Cập nhật dữ liệu thành công!"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Not Found"
        });
    }
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new tasks_model_1.default(req.body);
        yield task.save();
        res.json({
            message: "Tạo công việc thành công!",
            task: task
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            message: "Not Found"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = `${req.params.id}`;
        console.log(id);
        yield tasks_model_1.default.updateOne({
            _id: id
        }, req.body);
        res.json({
            message: "Cập nhật trạng thái thành công",
        });
    }
    catch (error) {
        res.json({
            messgae: "Not Found"
        });
    }
});
exports.edit = edit;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = `${req.params.id}`;
        yield tasks_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true
        });
        res.json({
            message: "Đã xóa thành công"
        });
    }
    catch (error) {
        res.json({
            message: "Not Found"
        });
    }
});
exports.deleted = deleted;
