

const notFoundError = (status, msg,res) => {
    return res.status(status).json({
        msg: `${msg} not found`
    })
}



module.exports = {
    notFoundError
}