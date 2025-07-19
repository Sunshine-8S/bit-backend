import { Schema, model} from "mongoose";

const ahorroSchema = new Schema({
    nombreAhorro: {
        type:String
    },
    fechaAhorro: {
        type:Date
    },
    montoAhorro: {
        type:Number
    }
}, {versionKey: false, timestamps: true});

export default model("Ahorro", ahorroSchema);