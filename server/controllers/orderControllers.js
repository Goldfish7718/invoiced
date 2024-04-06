import Order from "../models/orderSchema.js";

export const getOrders = async (req, res) => {
    try {
        const orders  = await Order.find({})

        res
            .status(200)
            .json({ orders })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}

export const postOrder = async (req, res) => {
    try {
        const { fullname, phoneNumber, items, subtotal } = req.body;

        await Order.create({
            fullname,
            phoneNumber,
            items,
            subtotal
        })

        res
            .status(200)
            .json({ message: "Order saved successfully" })

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}