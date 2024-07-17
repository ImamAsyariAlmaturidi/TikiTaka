const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
class Controller {
    static async landingPageRender(req, res) {
        try {
            res.render('Landing.ejs')
        } catch (error) {
            res.send(error)
        }
    }

    static async userRegister(req, res) {
        try {
            res.render('Register.ejs')
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerUserRegister(req, res) {
        const {username, email, password} = req.body
        try {
            await User.create({
                username, email, password
            })
            res.redirect('/users/login')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async userLogin(req, res){
        const msg = req.query.msg
        try {
            res.render('Login.ejs', { msg })
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerUserLogin(req, res){
        const { email, password } = req.body
        try {
            let status ;
            const pwd = await User.findOne({
                where: {
                    email
                }, 
                attributes: ['password']
            })

            if(!pwd){
                    const msg = 'Username or Password incorect'
                    res.redirect(`/users/login?msg=${msg}`)
            } else {
                status = bcrypt.compareSync(password, pwd.dataValues.password)
                if(status === true) {
                    res.redirect('/landing')
                } 
            }
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller