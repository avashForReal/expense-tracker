// home index
const index = async (req, res) => {
    try {
        // render the admin dashboard
        return res.render('admin')
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = { index }