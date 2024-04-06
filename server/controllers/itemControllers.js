import Item from '../models/itemSchema.js'

export const getItems = async (req, res) => {
    try {
        const items = await Item.find({})

        res
            .status(200)
            .json({ items })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error" })
    }
}

export const postItem = async (req, res) => {
    try {
        const { name, price } = req.body;

        await Item.create({
            name,
            price
        })

        res
            .status(200)
            .json({ message: "Item saved successfully" })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal Server Error" })
    }
}