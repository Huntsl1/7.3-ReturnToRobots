const data = require('./data.js');
const userData = data.users;
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/SHrobotsdb', function(err,db){
  const collection = db.collection('SHrobotsdb');

  userData.forEach((users) => {
    collection.insert(users, {});
  });
});

  /*const userData = {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
    university: user.university,
    address: user.address,
    job: user.job,
    company: user.company,
    skills: user.skills,
    phone: user.phone
  };


    data.users.forEach(function(users){

      userData.push(users);

      collection.insertMany(userData , (err,res) => {
        if (err) throw err;
        console.log(res);
          db.close();

          //res.redirect('/');
      });
    });
});*/
