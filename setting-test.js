"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var setting_1 = require("./setting");
var chai_1 = require("chai");
var fs = require("fs-extra");
// import { spy } from "sinon";
describe('Setting -spec', function () {
    it('should return fail because file will not be available using checkFileAccess', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, instance.checkFileAccess()];
                case 1:
                    input = _a.sent();
                    chai_1.expect(input).to.be.equal('fail');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return fail because file will not be availableusing checkFileAccess', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, instance.checkFileAccess()];
                case 1:
                    input = _a.sent();
                    chai_1.expect(input).to.be.equal('done');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return fail because file will not be available using createFile', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, fs.unlink(instance.filePath)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, instance.createFile()];
                case 2:
                    input = _a.sent();
                    chai_1.expect(input).to.be.equal('fail');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return done because file will be created using createFile', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, instance.createFile()];
                case 1:
                    input = _a.sent();
                    chai_1.expect(input).to.be.equal('done');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return false because file will not be available using get', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, fs.unlink(instance.filePath)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, instance.get('data')];
                case 2:
                    input = _a.sent();
                    // tslint:disable-next-line:no-unused-expression
                    chai_1.expect(input).to.be["false"];
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return data value available using get', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, input;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, instance.set('data', 'data')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, instance.get('data')];
                case 2:
                    input = _a.sent();
                    chai_1.expect(input).to.be.equal('data');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return fail because file does not contain any data', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, output, expectedOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, fs.outputJSON(instance.filePath, {
                            hello: "world"
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, instance.set('1', 'one')];
                case 2:
                    _a.sent();
                    output = fs.readJsonSync(instance.filePath);
                    expectedOutput = {
                        hello: "world",
                        1: "one"
                    };
                    chai_1.expect(output).to.be.eql(expectedOutput);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return  because file does not contain any data', function () { return __awaiter(_this, void 0, void 0, function () {
        var instance, input, expectedOutput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = setting_1["default"].getInstance();
                    return [4 /*yield*/, instance.set('1', 'one')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fs.unlink(instance.filePath)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, instance.set('data', 'data')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fs.readJsonSync(instance.filePath)];
                case 4:
                    input = _a.sent();
                    expectedOutput = {
                        data: 'data'
                    };
                    // tslint:disable-next-line:no-unused-expression
                    chai_1.expect(input).not.to.be["null"];
                    chai_1.expect(input).to.be.eql(expectedOutput);
                    return [2 /*return*/];
            }
        });
    }); });
});
