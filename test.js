const jwt = require('jsonwebtoken')
const moment = require('moment')
try {
    const res = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTA3NzE5OTgwLCJleHAiOjE1MDgzMjQ3ODB9.28kbC4f5VCkQbTsCO6EKa1KdZhUbM4O7PGmCqDqMZjU', 'bs-security-secret')
    console.log(res)
} catch (error) {
    console.log(error)
}
console.log(Math.round(((new Date().getTime() / 1000))))