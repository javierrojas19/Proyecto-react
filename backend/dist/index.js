"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('hola mundo poto');
});
const port = process.env.port || 4000;
//Routing
app.listen(port, () => {
    console.log('servidor funncionando en puerto:  ', port);
});
//# sourceMappingURL=index.js.map