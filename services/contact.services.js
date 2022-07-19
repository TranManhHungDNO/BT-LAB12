const {ObjectId} = require("mongodb")

class ContactServices {
    constructor(client){
        this.Contact =client.db().collection("contacts");
    }

     extractContactData(payload){
        const contact ={
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // loai bo nhung thuoc tinh khai bao o tren khong ton tai
        Object.keys(contact).forEach(
            (key)=>{(key)=>contact[key]=== undefined && delete contact[key];
        })
        return contact;
    }
    //tao contact
    async create(payload){
        const contact =this.extractContactData(payload);
        // ghi vao db
        const result=await this.Contact.findOneAndUpdate(
            contact,
            {$set: {favorite: contact.favorite===true}},
            {returnDocument: "after",upsert:true}
        );
        return result.value;
    }

    //findAll
    async find(filter){
        const curcor=await this.Contact.find(filter);
        return await curcor.toArray();
    }
    //findbyname
    async findByName(name){
        return await this.find({
            name: {$regex: new RegExp(name),$options:"i"},
        });
    }
    //findbyID
    async findById(id){
        return await this.Contact.findOne({
           _id: ObjectId.isValid(id)? new ObjectId(id):null,
        });
    }
    //update
    async update(id,payload){
        const filter={_id: ObjectId.isValid(id)? new ObjectId(id):null};
        const update =this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        return result.value;
    }
    //xoa
    async delete(id){
        const result=await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id):null,
        });
        return result.value;
    }
    //findFavorite
    async findFavorite(){
        return await this.find({favorite: true});
    }
    //xoa all
    async deleteAll(){
        const result=await this.Contact.deleteMany({});
        return result.deleteCount;
    }
}

module.exports=ContactServices;