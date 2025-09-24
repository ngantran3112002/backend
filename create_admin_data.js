const User = require('./model/user.model');
const AdminData = require('./adminData');
const bcrypt = require('bcrypt');

let saltRounds = 10;


//hash password
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}


(async () => {
    for (let d of AdminData) {
        let hashUserPassword = await hashPassword(d.password)
        const x = await User.create({
            userName: d.userName,
            password:hashUserPassword,
            address: d.address,
            email: d.email,
            phone: d.phone,
            isAdmin: true
        }).then();
    }
})();

