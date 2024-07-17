class Controller {
    static async landingPageRender(req, res) {
        try {
            res.render('Landing.ejs')
        } catch (error) {
            res.send(error)
        }
    }

    static async userLogin(req, res){
        try {
            res.render('Login.ejs')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller