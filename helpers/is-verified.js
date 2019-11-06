exports.userVerified = req => {
    if(!req.isAuth){
        throw new Error("User Not Authenticated!");
    }
}