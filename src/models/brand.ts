import { Schema, model, models} from "mongoose";
import { generateSlug } from "@/utils";

const BrandSchema = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true},
    imageURL: {type: String, required: true},
})

BrandSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next();
    this.slug = generateSlug(this.name);
    next();
});

export default models.Brand || model("Brand", BrandSchema);   