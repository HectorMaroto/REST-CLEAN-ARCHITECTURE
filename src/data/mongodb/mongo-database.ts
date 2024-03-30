import mongoose from "mongoose";


interface Options{
    mongoUrl: string;
    dbName: string;
}


export class MongoDataBase{

    static async connect(options: Options) { // Pasamos options como dependencias a mongoose para que sea flexible a cambios

        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            console.log('Mongo connected');
            return true

        } catch (error) {
            console.log('Mongo connection error')
            throw error;

        }
    }
}