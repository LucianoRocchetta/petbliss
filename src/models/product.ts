import { Schema, model, models} from "mongoose";

const productVariantSchema = new Schema({
    weight: {type: Number, required: true},
    cost: {type: Number, required: true},
    price: {type: Number, required: true},
    discountedPrice: {type: Number, required: true},
    profit: {type: Number, required: true},
    discount: {type: Number, required: true},
    onSale: {type: Boolean, required: true},
})

const ProductSchema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref: "Brand", required: true},
    name: {type: String, required: true},
    variants: {type: [productVariantSchema], required: true},
    imageURL: {type: String, required: true},
    available: {type: Boolean, required: true},
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    byOrder: {type: Boolean, required: true},
    isFeatured: {type: Boolean, required: true},
    description: {type: String, required: true}
})

export default models.Product || model("Product", ProductSchema);   