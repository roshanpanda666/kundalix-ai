import dotenv from "dotenv"

dotenv.config({override:true})

export const{MONGO_USERNAME,MONGO_PASSWORD} = process.env

console.log(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD);

export const connectionSRT="mongodb+srv://"+MONGO_USERNAME+":"+MONGO_PASSWORD+"@kundalix-cluster.mpu7ese.mongodb.net/kundalix-database?appName=kundalix-cluster"

