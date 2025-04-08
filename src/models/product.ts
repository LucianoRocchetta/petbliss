import { Schema, model, models} from "mongoose";

const ProductSchema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref: "Brand", required: true},
    name: {type: String, required: true},
    cost: {type: Number, required: true},
    price: {type: Number, required: true},
    discountedPrice: {type: Number, required: true},
    profit: {type: Number, required: true},
    onSale: {type: Boolean, required: true},
    discount: {type: Number, required: true},
    imageURL: {type: String, required: true},
    available: {type: Boolean, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    byOrder: {type: Boolean, required: true},
    description: {type: String, required: true}
})

ProductSchema.pre("save", function(next){
    this.price = Math.round(this.price);
    this.discountedPrice = Math.round(this.discountedPrice);
})

export default models.Product || model("Product", ProductSchema);   