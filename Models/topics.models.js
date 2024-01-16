const db = require('../db/connection')

exports.fetchTopics = () => {
    return db.query('SELECT * FROM topics').then(({rows})=>{
        return rows
    })
}

exports.getApiInfo = () => {
    return db.query('SELECT * FROM topics').then(({rows})=>{
        return rows
    })
}






