import { Schema, model, models} from "mongoose";

const BrandSchema = new Schema({
    name: {type: String, required: true},
    imageURL: {type: String, required: true},
})

export default models.Brand || model("Brand", BrandSchema);   