const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connetion')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-handlebars')
const path = require('path')

module.exports = {

    async index(req, res) {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs)
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body

        const [ongs] = await connection('ongs')
            .where('email', email)
            .count()
        
        
        if(ongs['count(*)'] > 0) return res.json({message: `Já existe uma conta com esse e-mail` })
        
        const id = generateUniqueId()
        
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'COLOQUESEUEMAILAQUI',
                pass: 'COLOQUESUASENHAAQUI'
            }
        })

        transporter.use('compile', hbs({
            viewEngine: {
                partialsDir: 'partials/',
                defaultLayout: false
              },
            viewPath: path.resolve(__dirname, '../view')
        }))

        let mailOptions = {
            from: 'COLOQUESEUEMAILAQUI',
            to: email,
            subject: 'Verificação de email.',
            text: `Este é o seu ID de acesso ${id}.`,
            template: 'index',
            context: {
                name: id
            } // send extra 
        }

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) return res.json({message: 'Erro ao enviar email' })
            else return res.json({ message: 'Um email foi enviado com o ID de acesso.' })
        })
    }
}