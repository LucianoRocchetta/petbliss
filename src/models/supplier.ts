import { Schema, model, models} from 'mongoose';

const SupplierSchema = new Schema({
    name: {type: String, required: true}
}) 

export default models.Supplier || model("Supplier", SupplierSchema);