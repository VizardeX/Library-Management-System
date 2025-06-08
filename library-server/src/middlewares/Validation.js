var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Joi from "joi";
export function ValidateSchema(schema, property) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            switch (property) {
                case 'query':
                    yield schema.validateAsync(req.query);
                    break;
                case 'params':
                    yield schema.validateAsync(req.params);
                    break;
                default:
                    yield schema.validateAsync(req.body);
            }
            next();
        }
        catch (error) {
            res.status(422).json({ message: "Object validation failed, please include a valid object" });
        }
    });
}
export const Schemas = {
    user: {
        create: Joi.object({
            type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required()
        }),
        login: Joi.object({
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required()
        }),
        userId: Joi.object({
            userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update: Joi.object({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string()
        })
    },
    book: {
        create: Joi.object({
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
            cover: Joi.string().required(),
            title: Joi.string().required(),
            authors: Joi.array().required(),
            description: Joi.string().required(),
            subjects: Joi.array().required(),
            publicationDate: Joi.date().required(),
            publisher: Joi.string().required(),
            pages: Joi.number().required(),
            genre: Joi.string().required()
        }),
        update: Joi.object({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required(),
            cover: Joi.string().required(),
            title: Joi.string().required(),
            authors: Joi.array().required(),
            description: Joi.string().required(),
            subjects: Joi.array().required(),
            publicationDate: Joi.date().required(),
            publisher: Joi.string().required(),
            pages: Joi.number().required(),
            genre: Joi.string().required()
        }),
        delete: Joi.object({
            barcode: Joi.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/).required()
        })
    },
    libraryCard: {
        create: Joi.object({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        get: Joi.object({
            cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    loan: {
        create: Joi.object({
            status: Joi.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            returnedDate: Joi.date(),
            patron: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }),
        update: Joi.object({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            status: Joi.string().valid('AVAILABLE', 'LOANED').required(),
            loanedDate: Joi.date().required(),
            dueDate: Joi.date().required(),
            returnedDate: Joi.date(),
            patron: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeOut: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            item: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        }),
        query: Joi.object({
            property: Joi.string().valid('_id', 'status', 'loanedDate', 'dueDate', 'returnedDate', 'patron', 'employeeOut', 'employeeIn', 'item').required(),
            value: Joi.alternatives().try(Joi.string(), Joi.date()).required()
        })
    }
};
