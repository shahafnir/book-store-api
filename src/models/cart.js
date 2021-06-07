const mongoose = require('mongoose')
const Book = require('./book')

const cartSchema = new mongoose.Schema(
    {
        items: [
            {
                bookId: {
                    type: String,
                },
                amount: {
                    type: Number,
                },
                title: {
                    type: String,
                },
                author: {
                    type: String,
                },
                priceUSD: {
                    type: Number,
                },
            },
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

cartSchema.methods.addItem = async function (bookId) {
    const cart = this
    const book = await Book.findById(bookId)

    const itemFoundInCart = cart.items.find((item) => item.bookId === bookId)

    if (!itemFoundInCart) {
        cart.items.push({
            bookId,
            amount: 1,
            title: book.title,
            author: book.author,
            priceUSD: book.priceUSD,
        })
    } else {
        itemFoundInCart.amount++
    }

    await cart.save()
}

cartSchema.methods.removeItem = async function (bookId) {
    const cart = this

    for (let itemInd = 0; itemInd < cart.items.length; itemInd++) {
        if (cart.items[itemInd].bookId.toString() === bookId) {
            cart.items.splice(itemInd, 1)
            break
        }
    }

    await cart.save()
}

cartSchema.methods.reduceAmount = async function (bookId) {
    const cart = this

    const item = cart.items.find((item) => item.bookId === bookId)

    if (!item) {
        throw new Error({ error: 'Item not exist' })
    }

    if (item.amount > 1) {
        item.amount--
    } else {
        return cart.removeItem(bookId)
    }

    await cart.save()
}

cartSchema.methods.icreaseAmount = async function (bookId) {
    const cart = this

    const item = cart.items.find((item) => item.bookId === bookId)

    if (!item) {
        throw new Error({ error: 'Item not exist' })
    }

    item.amount++

    await cart.save()
}

cartSchema.methods.update = async function (items) {
    const cart = this

    try {
        await items.forEach(async (itemToUpdate, itemNumber) => {
            const itemInCart = cart.items.find(
                (item) => item.bookId === itemToUpdate.bookId
            )

            if (!itemInCart) {
                const book = await Book.findById(itemToUpdate.bookId)

                cart.items.push({
                    bookId: book._id,
                    amount: itemToUpdate.amount,
                    title: book.title,
                    author: book.author,
                    priceUSD: book.priceUSD,
                })
            } else {
                itemInCart.amount += itemToUpdate.amount
            }

            if (itemNumber === items.length - 1) {
                await cart.save()
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
