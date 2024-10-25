import mongoose  from "mongoose";

export const ConnectMongoDB = async () =>{
    try {
        const conn = await mongoose.connect('mongodb+srv://pinu632:pFFiliCkN0pY2RWA@cluster0.osi4rnv.mongodb.net/NotesSharingApp?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`database connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}