const { User, Profile, Post, ProfilePost} = require('../models/index')
const bcrypt = require('bcryptjs')
const cloudinary = require('../utils/cloudinary')
const streamifier = require('streamifier')
class Controller {

    static async landingPageRender(req, res) {
        const { id } = req.params
        // console.log(id)
        try {
            const content = await Profile.findOne({
                where: {
                    id
                },
                include: {
                    model: ProfilePost,
                    include: {
                        model: Post
                    }
                }
            })
            const profile = await User.findOne({
                where: {
                    id
                },
                include: Profile,
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

    static async handlerSettingById(req, res) {
        const { id } = req.params;
        const { firstName, lastName, gender, address, birthOfDate } = req.body;
        let imgUrl = ''
        try {
            
            // Cari profil berdasarkan ID
            const profile = await Profile.findByPk(id);
    
            // Jika ada file yang diunggah
            if (req.file) {
                // Fungsi untuk mengunggah file dari buffer ke Cloudinary
                const uploadStream = (buffer) => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream((error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
                        });
                        streamifier.createReadStream(buffer).pipe(stream);
                    });
                };
    
                // Mengunggah file menggunakan fungsi uploadStream
                imgUrl = await uploadStream(req.file.buffer);
                profile.imageURL = imgUrl;
            }
    
            await profile.update({
                firstName,
                lastName,
                gender,
                address,
                birthOfDate,
                photo: imgUrl
            });

            res.redirect(`/profile/setting/${id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan saat menyimpan profil');
        }
    }

    static async renderSettingPrivacyById(req, res){
        const msg = req.query?.msg
        const { id } = req.params
        try {
            const profile = await User.findOne({
                where: {
                    id
                },
                include: Profile
            })
            res.render('FormEditUser.ejs', { profile })
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerSettingPrivacyById(req, res) {
        const { id } = req.params;
        const { username, email, password } = req.body;
        // console.log(username, email, password)
        try {
            const user = await User.findByPk(id); 
    
            if (!user) {
                return res.status(404).send('User not found');
            }
            await user.update({
                username,
                email,
                password
            });
    
            res.redirect(`/profile/privacy/${id}`);
    
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                const msg =  error.errors.map(el => {
                    return el.message
                })
                console.log(error)
                res.redirect(`/profile/privacy/${id}?msg=${msg}`)
            } else {
                console.log(error)
                res.send(error)
            }
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
            // console.log(error)
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

            const profile = await User.findOne({
                where: {
                    email
                },
                include: Profile
            })

            // console.log(profile)

            if(!pwd){
                    const msg = 'Username or Password incorect'
                    res.redirect(`/users/login?msg=${msg}`)
            } else {
                status = bcrypt.compareSync(password, pwd.dataValues.password)
                if(status === true) {
                    res.redirect(`/landing/${profile.id}`)
                } 
            }
        } catch (error) {
            // console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller