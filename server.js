const app = require("./app")
const config = require("./config")
const MongoDB = require("./utils/mongodb.util")

// khoi tao ket noi db
async function startServer(){
    try{
        // ket noi db
        await MongoDB.connect(config.db.uri);
        console.log("ket noi thanh cong");

        // chay ung dung khi ket noi thanh cong
        const PORT = config.app.port
        // Start the Express server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

    }catch(error){
        console.log("Khong the ket noi CSDL",error);
        process.exit();//thoat chuong trinh
    }
}

startServer();