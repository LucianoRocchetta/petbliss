import { Schema, model, models} from "mongoose";

const ProductSchema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    imageURL: {type: String, required: true},
    stock: {type: Number, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    description: {type: String, required: true}
})

export default models.Product || model("Product", ProductSchema);   