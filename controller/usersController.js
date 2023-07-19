const User = require('./../models/User')


class usersController{
    
    async getUsers(req,res){
        try{
            const users = await User.find()
            res.render("users", {users})
        }catch(e){
            console.log(e)
        }
    }

    async deleteUser(req,res) {
        try{
            const {id} = req.body
            const result = await User.deleteOne({_id: id})
            console.log(result)
        }catch(e){
            console.log(e)
            return res.status(400).json({message: "Помилка видалення", e})
        }
    }

    async changeRole(req, res) {
        try{
            const {id , role}=req.body
            console.log(role)
            if(role === 'USER'){
                const result = await User.updateOne({_id: id}, {$set:{roles: 'ADMIN'}})
                console.log(result)
            }else if(role === 'ADMIN'){
                const result = await User.updateOne({_id: id}, {$set:{roles: 'USER'}})
                console.log(result)
            }
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new usersController()