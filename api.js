const categories = require('./categories.js')
const products = require('./products.js')

const main = async () => {
   /*  await categories.create({
      category: "Nova categoria organizada."
   }) */
   //await categories.update('VhjDTyt5uquypShAdL6F', {category: "Categoria Atualizada!"})
   // await categories.remove('l97sDz3CuqzTYuVkhTAO')

   //const c = await categories.findAll()
   //console.log(c)

   /*  const cats = await categories.findAllPaginated({ pageSize: 1, startAfter: 'twttetwtwt' })
   console.log(cats)

   await products.create({
      product: 'Samsung A10',
      price: 1300,
      categories: ['IZ9AYduNCl2ijM298YXP']
    }) */
   //await products.remove('j2rkvbwDcPCc46rftHPn')

   //await products.addImage('58tHYixXJWROawRiFW4G', { description: 'new image', url: 'url' })

   const p = await products.findAll()
   console.log(p)

   const pPaginated = await products.findAllPaginated({ pageSize: 1, startAfter: '' })
   console.log(pPaginated)


}

main()
