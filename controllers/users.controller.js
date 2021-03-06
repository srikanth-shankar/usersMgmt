const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// postman -> http://localhost:3000/api/users
exports.getUsers = (req, res, next) => {
    // return res.send('<h1>get users</h1>')
    User.find({}, {'_id': 0, 'pwd': 0})
        .then(userDocs => {
            return res.status(200).send(userDocs);
        });
};

//postman -> http://localhost:3000/api/users/add-user  choose post and give the json body with the required parameters
exports.createUser = (req, res, next) => {
    const {name, email, pwd, isAdminRole} = req.body;
    pwd = bcrypt.hashSync(pwd, 8);
    const user = new User({name, email, pwd, isAdminRole});
    user.save()
        .then((result) => {
            console.log('created user');
            return res.status(201).send(user);
        })
        .catch(err => {
            console.log('err = ', err);
        });
    // return res.send('<h1>Add user</h1>')
};

//http://localhost:3000/api/users/{:id}
exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id})
        .then(result =>{
            return res.status(200).json({'user deleted': req.params.id});
        })
        .catch(err =>{
            console.log(err);
        })
    // return res.send('<h1>delete user</h1>');
};

// postman -> http://localhost:3000/api/users/getUserByName/rob
// can also use a debounce in a ui typeahead kind where we can load the typeahead with the name that has "contains query" instead of an exact match.
exports.getUserByName = (req, res, next) => {
    User.findOne({name: req.params.name}, {'_id': 0, 'pwd': 0}, ((err, user) =>{
            if(!!user)
                return res.status(200).send({'user': user})

            return res.status(404).send('user not found')
    }))
};