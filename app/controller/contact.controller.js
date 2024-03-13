const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next)=>{
    if (req.body?.name==null) {
        console.log(`${req.body.name}`);
        return next (new ApiError(400, "Name can't be empty!"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error){
        return next(new ApiError(500, `Error: ${error}`));
    }
};

exports.findAll = async (req, res, next)=>{
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
            console.log(typeof(documents));
        } else {
            documents = await contactService.find({});
        }
    } catch (error){
        return next(new ApiError(500, `Error: ${error}`));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next)=>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    }catch (error){
        return next (new ApiError(500, `Error with id = ${req. params.id} .. ${error}`) );
    }
};

exports.update = async (req, res, next)=>{
    if (Object.keys(req.body).length === 0) {
        return next (new ApiError(400, "Data update can't be empty!"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    }catch (error){
        return next (new ApiError(500, `Error with id = ${req. params.id} .. ${error}`) );
    }
};

exports.delete = async (req, res, next)=>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (document == null){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Delete successfull"});
    } catch (error){
        return next (new ApiError(500, `Error with id = ${req. params.id} .. ${error}`) );
    }
};

exports.deleteAll = async (req, res, next)=>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({
            message : `${deleteCount} contacts are deleted successfully`
        });
    }catch (error){
        return next (new ApiError(500, `Error with delete all .. ${error}`) );
    }
};

exports.findAllFavorite = async (req, res, next)=>{
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        console.log(typeof(document));
        return res.send(document);
    } catch (error){
        return next (new ApiError(500, `Error with find favorite .. ${error}`) );
    }
};
