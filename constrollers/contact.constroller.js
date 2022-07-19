const ApiError = require("../api-error");
const ContactServices = require("../services/contact.services");
const MongoDB = require("../utils/mongodb.util");

exports.create =async (req,res,next)=>{
    // kiem tra loi khi name trong
    if(!req.body?.name){
        return next(new ApiError(400,"Name is required"));
    }
    try{
        const contactServices = new ContactServices(MongoDB.client);
        const document =await contactServices.create(req.body);
        return res.send(document);
    }catch(error){
        return next(new ApiError(500,"Cannot connect contact"));
    }
}
exports.findAll =async (req,res,next)=>{
    let documents=[];
    try{
        const contactServices =new ContactServices(MongoDB.client);
        //api/contacts?name=?
        const {name} =req.query;
        if(name){
            documents=await contactServices.findByName(name);
        }else
        {
            documents=await contactServices.find(name);
        }
    }catch(error){
        return next(new ApiError(500,"Khong the lay du lieu"));
    }
    return res.send(documents);
}
exports.findOne =async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const document=await contactServices.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Khong the lay du lieu"));
        }
        return res.send(document);
    }catch(error){
        return next(new ApiError(500,"Khong the lay du lieu"));
    }
}
exports.update = async (req,res,next)=>{
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,"du lieu update trong"));
    }
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const document=await contactServices.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"Khong the lay du lieu"));
        }
        return res.send({message: "update thanh cong"});
    }catch(error){
        return next(new ApiError(500,`Khong the update du lieu id=${req.params.id};`));
    }
}
exports.delete =async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const document=await contactServices.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Khong the lay du lieu"));
        }
        return res.send({message: "xoa thanh cong"});
    }catch(error){
        return next(new ApiError(500,`Khong the xoa du lieu id=${req.params.id};`));
    }
}
exports.deleteAll = async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const deleteCount=await contactServices.deleteAll();
        return res.send({Thongbao: `${deleteCount} xoa tat ca thanh cong`});
    }catch(error){
        return next(new ApiError(500,`Khong the xoa du lieu;`));
    }
}
exports.findAllFavorite =async (req,res,next)=>{
    try{
        const contactServices =new ContactServices(MongoDB.client);
        const documents=await contactServices.findFavorite();
        return res.send({message: documents});
    }catch(error){
        return next(new ApiError(500,`Khong the favorite du lieu;`));
    }
}


