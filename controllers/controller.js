const { User, Profile, Post, ProfilePost, Tag} = require('../models/index')
const bcrypt = require('bcryptjs')
const cloudinary = require('../utils/cloudinary')
const streamifier = require('streamifier')
const { Op } = require('sequelize')
class Controller {
    static async landingPageRender(req, res) {
        const { id } = req.params
        const { title } = req.query
        try {
            let content;
            if (title) {
                content = await Post.findAll({
                    where: {
                        title: { [Op.iLike]: `%${title}%` }
                    },
                    include: {
                        model: ProfilePost,
                        include: {
                            model: Profile
                        }
                    }
                });
            } else {
                content = await Post.findAll({
                    include: {
                        model: ProfilePost,
                        include: {
                            model: Profile
                        }
                    }
                });
            }

            const contents = content.map(el => {
                return el.ProfileId
            })

            const profileName = await Profile.findOne({
                where: {
                    id: contents
                }
            })

            const profile = await User.findOne({
                where: {
                    id
                },
                include: Profile,
            })
            res.render('Landing.ejs', { profile, content, profileName })
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
        try {
            let imgUrl = ''
            const profile = await Profile.findByPk(id);
    
            if (req.file) {
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
            res.send(error)
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

            const tag = await Tag.findAll()
            console.log(tag)

            res.render('Profile.ejs', { profile, tag })

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

    static async handlerUserLogin(req, res) {
        const { email, password } = req.body;
    
        try {
            const user = await User.findOne({
                where: { email },
                include: Profile
            });
    
            if (!user) {
                const msg = 'Username or Password incorrect';
                return res.redirect(`/users/login?msg=${msg}`);
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (isPasswordValid) {
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    profile: user.Profile
                };
                res.redirect(`/landing/${user.id}`);
            } else {
                const msg = 'Username or Password incorrect';
                res.redirect(`/users/login?msg=${msg}`);
            }
        } catch (error) {
            console.error('Error in handlerUserLogin:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async handlerAddPost(req, res) {
        const { id } = req.params;
        const { title, content, tag } = req.body;
    
        try {
            let videoUrl = '';

            if (req.file) {
                const uploadVideo = (buffer) => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { resource_type: "video" }, 
                            (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result.secure_url);
                                }
                            }
                        );
                        streamifier.createReadStream(buffer).pipe(stream);
                    });
                };
    
                videoUrl = await uploadVideo(req.file.buffer);
            }

           const dataPost = await Post.create({
                title,
                content,
                ProfileId: id, 
                TagId: tag, 
                imgUrl: videoUrl
            });

            await ProfilePost.create({
                name : dataPost.title,
                PostId: dataPost.id,
                ProfileId: dataPost.ProfileId
            })

            res.redirect(`/landing/${id}`);
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerLogout(req, res){
        try {
            req.session.destroy(err => {
                if (err) {
                  return res.status(500).send('Gagal logout');
                }
              res.redirect('/users/login')
              });
        } catch (error) {
            res.send(error)
        }
    }
    
}

module.exports = Controller