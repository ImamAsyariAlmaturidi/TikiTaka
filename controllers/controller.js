const { User, Profile, Post, ProfilePost} = require('../models/index')
const bcrypt = require('bcryptjs')
class Controller {

    static async landingPageRender(req, res) {
        try {
            const content = await Profile.findAll({
                include: {
                    model: ProfilePost,
                    include: {
                        model: Post
                    }
                }
            })
            const profile = await User.findOne({
                include: Profile
            })
            res.render('Landing.ejs', { profile, content })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async renderSettingById(req,res){
        const { id } = req.params
        try {
            const profile = await User.findOne({
                where: {
                    id
                },
                include: Profile
            })
            res.render('FormEditProfile.ejs', { profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async renderProfileById(req, res) {
        const { id } = req.params
        try {
            const profile = await User.findOne({
                where: {
                    id
                },
                include: Profile
            })
            res.render('Profile.ejs', { profile })
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
        const {username, email, password, firstName, lastName, gender, address, birthOfDate } = req.body
        try {
           const data = await User.create({
                username, email, password
            })
    
            await Profile.create({
                firstName, lastName, gender, address, birthOfDate, UserId: data.dataValues.id
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