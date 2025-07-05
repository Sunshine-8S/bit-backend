import { Schema, model} from "mongoose";

const gastoSchema = new Schema({
    nombreGasto: {
        type:String
    },
    fechaGasto: {
        type:Date
    },
    montoGasto: {
        type:Number
    },
    gastoPagado: {
        type:Boolean
    }
}, {versionKey: false, timestamps: true});

export default model("Gasto", gastoSchema);