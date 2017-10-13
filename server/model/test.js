const { sequelize } = require('../common/db')
const User = sequelize.import('./user.model.js')
const Daily = sequelize.import('./daily.model.js')
const Item = sequelize.import('./item.model.js')
require('./ref')
sequelize.transaction({
    logging: true
}).then(function (t) {
    Item.create({
        title: '123456',
        content: 'aaaaaaaa',
        daily_id: '1'
    }, { transaction: t }, function (err, rst) {
        if (err) {
            console.log(err)
        }
        console.log(rst)
    }).then(t.commit.bind(t)).catch(t.rollback.bind(t));
})