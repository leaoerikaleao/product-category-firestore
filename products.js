const db = require('./firestore.js')
const admin = require("firebase-admin");

// busca eager ela não é a melhor, a lazy é mais eficiente
const findAll = async () => {
    const productsDB = await db.collection('products').get()
    if (productsDB.empty) {
        return []
    }

    const products = []
    productsDB.forEach(doc => {
        products.push({
            ...doc.data(),
            id: doc.id,
        })
    });

    const productsImgs = []
    for await (product of products) {
        const imgs = []

        const imgsDB = await db
            .collection('products')
            .doc(product.id)
            .collection('images')
            .get()

        imgsDB.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })

        productsImgs.push({
            ...product,
            imgs
        })
    }

    return productsImgs
}

const findAllPaginated = async ({ pageSize = 2, startAfter = '' }) => {

    const productsDB = await db
        .collection('products')
        .orderBy('product')
        .limit(pageSize + 1)
        .startAfter(startAfter)
        .get()

    if (productsDB.empty) {
        return {
            data: [],
            total: 0
        }
    }

    const products = []
    let total = 0

    productsDB.forEach(doc => {
        if (total < pageSize) {
            products.push({
                ...doc.data(),
                id: doc.id
            })
        }
        total++
    });

    const productsImgs = []
    for await (product of products) {
        const imgs = []

        const imgsDB = await db
            .collection('products')
            .doc(product.id)
            .collection('images')
            .get()

        imgsDB.forEach(img => {
            imgs.push({
                ...img.data(),
                id: img.id
            })
        })

        productsImgs.push({
            ...product,
            imgs
        })
    }

    return {
        data: productsImgs,
        total: products.length,
        hasNext: total > pageSize,
        startAfter: total > pageSize ? products[products.length - 1].product : ""
    }

}

const remove = async (id) => {
    const imgs = await db
        .collection('products')
        .doc(id)
        .collection('images')
        .get()

    const exclusoes = []
    imgs.forEach(img => {
        exclusoes.push(db.collection('products').doc(id).collection('images').doc(img.id).delete())
    })

    await Promise.all(exclusoes)
    const doc = db.collection('products').doc(id)
    await doc.delete()
}

const create = async ({ categories, ...data }) => {

    const doc = db.collection('products').doc()
    const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))

    await doc.set({
        ...data,
        categoriesRef: categoriesRef,
        categories: categories
    })
}

const addImage = async (id, data) => {

    const imageRef = db.collection('products')
        .doc(id)
        .collection('images')
        .doc()

    imageRef.set(data)


}


const update = async (id, { categories, ...data }) => {
    const categoriesRef = categories.map(cat => db.collection('categories').doc(cat))
    const doc = db.collection('products').doc(id)

    await doc.update({
        ...data,
        categoriesRef: admin.firestore.FieldValue.arrayUnion(...categoriesRef),
        categories: admin.firestore.FieldValue.arrayUnion(...categories)
    })
}

module.exports = {
    findAllPaginated,
    findAll,
    remove,
    create,
    addImage,
    update
}