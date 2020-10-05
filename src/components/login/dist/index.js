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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("../../utils/utils");
var globalActions_1 = require("../../actions/globalActions");
var react_redux_1 = require("react-redux");
var Constants = require("../../utils/constants");
require("./index.scss");
var image = require('../../assets/images/image.jpg');
var image2 = require('../../assets/images/image2.jpg');
var image3 = require('../../assets/images/image3.jpg');
var Login = function () {
    var _a = react_1.useState(null), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(null), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(false), loginError = _d[0], setLoginError = _d[1];
    var _e = react_1.useState(false), validationEmail = _e[0], setvalidationEmail = _e[1];
    var _f = react_1.useState(''), validationEmailText = _f[0], setvalidationEmailText = _f[1];
    var _g = react_1.useState(false), validationPassword = _g[0], setvalidationPassword = _g[1];
    var history = react_router_dom_1.useHistory();
    var dispatch = react_redux_1.useDispatch();
    var validateFields = function () {
        var response = true;
        if (!utils_1.validateEmail(email)) {
            response = false;
            setvalidationEmail(true);
            setvalidationEmailText('Debe ingresar un email valido');
        }
        if (!password) {
            response = false;
            setvalidationPassword(true);
        }
        return response;
    };
    var loginUser = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var myHeaders, data, requestOptions, user, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoginError(false);
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!validateFields()) return [3 /*break*/, 4];
                    setLoading(true);
                    myHeaders = new Headers();
                    myHeaders.append('Content-Type', 'application/json');
                    data = JSON.stringify({
                        email: email,
                        password: password
                    });
                    requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: data,
                        redirect: 'follow'
                    };
                    return [4 /*yield*/, fetch(Constants.URL_SERVICES + "/api/login", requestOptions)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, user.json()];
                case 3:
                    response = _a.sent();
                    if (!response.ok &&
                        response.err.messsage === 'Usuario o contraseña incorrectos') {
                        setLoading(false);
                        setLoginError(true);
                    }
                    else {
                        localStorage.setItem('usuario', JSON.stringify(response));
                        dispatch(globalActions_1.isLoggin());
                        history.push('/administrador');
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    setLoading(false);
                    setLoginError(true);
                    console.log({ error: error_1 });
                    console.log('Hubo un error intentelo mas tarde');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleEmail = function (_a) {
        var target = _a.target;
        setvalidationEmail(false);
        setEmail(target.value);
    };
    var handlePassword = function (_a) {
        var target = _a.target;
        setvalidationPassword(false);
        setPassword(target.value);
    };
    var Loading = function () {
        return react_1["default"].createElement(react_bootstrap_1.Spinner, { animation: "grow" });
    };
    return (react_1["default"].createElement(react_1.Fragment, null,
        react_1["default"].createElement("section", { className: "login-block" },
            react_1["default"].createElement(react_bootstrap_1.Container, null,
                react_1["default"].createElement(react_bootstrap_1.Row, null,
                    react_1["default"].createElement(react_bootstrap_1.Col, { md: 4, className: "login-sec" },
                        react_1["default"].createElement("h2", { className: "text-center" }, "Ingresar"),
                        react_1["default"].createElement(react_bootstrap_1.Form, { className: "login-form", onSubmit: function (e) { return loginUser(e); } },
                            react_1["default"].createElement("div", { className: "form-group" },
                                react_1["default"].createElement("label", { className: "text-uppercase" }, "Correo"),
                                react_1["default"].createElement("input", { type: "text", className: validationEmail
                                        ? 'form-control validation'
                                        : 'form-control', placeholder: "", onChange: handleEmail }),
                                validationEmail ? (react_1["default"].createElement("div", { className: "alert-red" }, validationEmailText)) : null),
                            react_1["default"].createElement("div", { className: "form-group" },
                                react_1["default"].createElement("label", { className: "text-uppercase" }, "Contrase\u00F1a"),
                                react_1["default"].createElement("input", { type: "password", className: validationPassword
                                        ? 'form-control validation'
                                        : 'form-control', placeholder: "", onChange: handlePassword }),
                                validationPassword ? (react_1["default"].createElement("div", { className: "alert-red" }, "Debe ingresar la contrase\u00F1a")) : null),
                            react_1["default"].createElement("div", { className: "form-check" }, loading ? (react_1["default"].createElement(Loading, null)) : (react_1["default"].createElement("button", { type: "submit", className: "btn btn-login float-right" }, "Ingresar"))),
                            loginError ? (react_1["default"].createElement("div", { className: "form-check" },
                                react_1["default"].createElement("p", null, "Usuario o contrase\u00F1a invalidos"))) : null)),
                    react_1["default"].createElement("div", { className: "col-md-8 banner-sec" },
                        react_1["default"].createElement(react_bootstrap_1.Carousel, null,
                            react_1["default"].createElement(react_bootstrap_1.Carousel.Item, null,
                                react_1["default"].createElement("img", { className: "d-block img-fluid", src: "" + image, alt: "First slide" })),
                            react_1["default"].createElement(react_bootstrap_1.Carousel.Item, null,
                                react_1["default"].createElement("img", { className: "d-block img-fluid", src: "" + image3, alt: "Third slide" })),
                            react_1["default"].createElement(react_bootstrap_1.Carousel.Item, null,
                                react_1["default"].createElement("img", { className: "d-block img-fluid", src: "" + image2, alt: "Third slide" })))))))));
};
exports["default"] = Login;
