import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    fullname: String,
    phoneNumber: String,
    email: String,
    subtotal: Number,
    items: [
        {
            item: String,
            quantity: Number,
            _id: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Item'
            },
            aggregatedPrice: Number
        }
    ]
})

const Order = model('Order', orderSchema)

export default Order