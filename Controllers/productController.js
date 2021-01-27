const database = require('../Database');
const { query } = require('express');

module.exports = {
    getAllProduct: (req, res) => {
        const queryGetAllProduct = `SELECT * FROM stock`;
        database.query(queryGetAllProduct, (err, resultsGetAllProduct) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(resultsGetAllProduct)
        })
    },
    addProduct: (req, res) => {
        const { productname, totalstock, category } = req.body;
        const queryAddProduct = `INSERT INTO stock SET ?`
        database.query(queryAddProduct, req.body, (err, resultsAddProduct) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(resultsAddProduct)
        })
    },
    editProduct: (req, res) => {
        const { productname, totalstock, category } = req.body;
        const queryEditProduct = `UPDATE stock SET productname = '${productname}', totalstock = ${totalstock}, category = '${category}' WHERE idstock = ${req.query.idstock}`;
        database.query(queryEditProduct, (err, resultsEditProduct) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            res.status(200).send(resultsEditProduct)
        })
    },
    deleteProduct: (req, res) => {
        const queryDeleteProduct = `DELETE FROM stock WHERE idstock = ${req.query.idstock}`;
        database.query(queryDeleteProduct, (err, resultsDeleteStock) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(resultsDeleteStock)
        })
    },
}