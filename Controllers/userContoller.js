const database = require('../Database');
const Crypto = require('crypto');
const { createJWTToken } = require('../Helpers/jwt');

module.exports = {
    getAllUsers: (req, res) => {
        const queryGetAllUsers = `SELECT * FROM users`;
        database.query(queryGetAllUsers, (err, resultsGetAllUsers) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(resultsGetAllUsers)
        })
    },
    registerUser: (req, res) => {
        const { username, password, confirmPassword } = req.body;
        const hashPassword = Crypto.createHmac('sha256', 'keySarenOne').update(password).digest('hex');
        const queryGetAllUsers = `SELECT * FROM users`;
        database.query(queryGetAllUsers, (err, resultsGetAllUsers) => {
            if (err) return res.status(500).send(err)

            for (var i = 0; i < resultsGetAllUsers.length; i++) {
                let resultsGetUsername = resultsGetAllUsers[i].username
                if (resultsGetUsername === username) return res.status(500).send('Username sudah terdaftar')
            }
            
            if (username === '' || password === '' || confirmPassword === '') return res.status(500).send('Tolong isi dengan benar')
            if (password !== confirmPassword) return res.status(500).send('Password tidak sama')

            const queryRegisterUser = `INSERT INTO users (username, password, status, role) VALUES ('${username}', '${hashPassword}', 'Belum Verifikasi', 'user')`;
            database.query(queryRegisterUser, (err, resultsRegisterUser) => {
                if (err) return res.status(500).send(err)

                const queryRegisterProfile = `INSERT INTO profile (userId) VALUES (${resultsRegisterUser.insertId})`;
                database.query(queryRegisterProfile, (err, resultsRegisterProfile) => {
                    if (err) return res.status(500).send(err)

                    res.status(200).send(resultsRegisterProfile)
                })
                // res.status(200).send(resultsRegisterUser)
            })
        })
    },
    loginUser: (req, res) => {
        const { username, password } = req.body;
        const hashPassword = Crypto.createHmac('sha256', 'keySarenOne').update(password).digest('hex');
        const queryUsernameLogin = `SELECT * FROM users WHERE username = '${username}'`;
        database.query(queryUsernameLogin, (err, resultsUsernameLogin) => {
            if (err) return res.status(500).send(err)

            if (resultsUsernameLogin.length === 0) return res.status(400).send('Username tidak terdaftar')
            if (username === '' || password === '') return res.status(500).send('Tolong isi dengan benar')
            if (hashPassword !== resultsUsernameLogin[0].password) return res.status(401).send('Password salah')

            const token = createJWTToken({ ...resultsUsernameLogin[0] })
            res.status(200).send({ ...resultsUsernameLogin[0], token })
            // console.log({...resultsUsernameLogin[0]})
        })
    },
    keepLoginUser: (req, res) => {
        const queryKeepLoginUser = `SELECT * FROM users WHERE iduser = ${req.user.iduser}`;
        database.query(queryKeepLoginUser, (err, resultsKeepLoginUser) => {
            if (err) return res.status(500).send(err)

            const token = createJWTToken({ ...resultsKeepLoginUser[0] })
            res.status(200).send({ ...resultsKeepLoginUser[0], token })
        })
    },
    editStatus: (req, res) => {
        const { status } = req.body;
        const queryEditStatusUser = `UPDATE users SET status = '${status}' WHERE iduser = ${req.query.iduser}`;
        database.query(queryEditStatusUser, (err, resultsEditStatusUser) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(resultsEditStatusUser)
        })
    },
    deleteAccount: (req, res) => {
        const queryDeleteAccount = `DELETE FROM users WHERE iduser = ${req.query.iduser}`;
        database.query(queryDeleteAccount, (err, resultsDeleteUser) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(resultsDeleteUser)
        })
    }
}