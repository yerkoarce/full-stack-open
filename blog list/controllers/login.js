const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
require('dotenv').config()


loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  // Se recupera al usuario de la base de datos
  const user = await User.findOne({ username })
  // Se verifica que el password de la request es el mismo que el guardado en la base de datos. Esto solo si el usuario existe.
  const passwordCorrect = user === null
    ? false 
    : await bcrypt.compare(password, user.passwordhash)

  // Si no encontró al user o la contraseña en incorrecta se responde 401
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  // Si son correctos se guardará este usuario e id con el token de inicio de sesión
  const userForToken = {
    username: user.username,
    id: user._id
  }

  // El userForToken y el token se guardan con el método .sign() de jwt
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  // Se responde con el token, el username y el name en el body de la respuesta
  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter