const database = require('../Database');
const { uploader } = require('../Helpers/uploader');
const fs = require('fs');


module.exports = {
    getAllProfile: (req, res) => {
        const queryGetAllProfile = `
        SELECT * FROM users u
        JOIN profile p ON u.iduser = p.userId
        `
        database.query(queryGetAllProfile, (err, resultsGetAllProfile) => {
            if(err) return res.status(500).send(err)

            res.status(200).send(resultsGetAllProfile)
        })
    },
    getProfileId: (req, res) => {
        const queryGetProfileById = `
        SELECT * FROM users u
        JOIN profile p ON u.iduser = p.userId
        WHERE u.iduser = ${req.user.iduser};
        `
        database.query(queryGetProfileById, (err, resultsProfileById) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(resultsProfileById)
        })
    },
    editProfile: (req, res) => {
        const path = '/imageprofile';
        const upload = uploader(path, 'IMG').fields([{ name: 'imageprofile' }])
        upload(req, res, (err) => {
            if (err) return res.status(500).send(err)

            const { imageprofile } = req.files;
            const imagePath = imageprofile ? path + '/' + imageprofile[0].filename : null

            const data = JSON.parse(req.body.dataProfile);
            data.imageprofile = imagePath

            const queryGetProfile = `SELECT * FROM profile WHERE userId = ${req.query.userId}`
            database.query(queryGetProfile, (err, resultsGetProfile) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else if (resultsGetProfile !== 0) {
                    const {name, division, motto} = data;
                    const queryAddProfile = `UPDATE profile SET imageprofile = '${data.imageprofile}', name = '${name}', division = '${division}', motto = '${motto}' WHERE userId = ${req.query.userId}`
                    database.query(queryAddProfile, (err, resultsAddProfile) => {
                        if (err) return res.status(500).send(err)
                        if (imageprofile) { 
                            if (resultsGetProfile[0].imageprofile === 0) {
                                return null
                            } else {
                                fs.unlinkSync('./Public' + resultsGetProfile[0].imageprofile)
                            }
                        }
                        res.status(200).send(resultsAddProfile)
                    })
                }
            })
        })
    }
}