const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

cartSchema.methods.addItem = async function (bookId) {
    const cart = this

    cart.books = cart.books.concat({
        _id: bookId,
    })

    await cart.save()

    await cart.populate('books').execPopulate()
}

cartSchema.methods.removeItem = async function (bookId) {
    const cart = this

    for (let itemInd = 0; itemInd < cart.books.length; itemInd++) {
        if (cart.books[itemInd]._id.toString() === bookId) {
            cart.books.splice(itemInd, 1)
            break
        }
    }

    await cart.save()
}

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
