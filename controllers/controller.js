class Controller {
    static async landingPageRender(req, res) {
        try {
            res.render('Landing.ejs')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller