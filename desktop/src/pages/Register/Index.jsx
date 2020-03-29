import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addOngs } from '../../store/fetchActions/Register/Index'
import { FiArrowLeft, FiAlertTriangle, FiCheck } from 'react-icons/fi'
import { SemipolarLoading } from 'react-loadingg'
import { Link } from 'react-router-dom'
import './style.css'
import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const [textButton, setTextButton] = useState('Cadastrar')
    const [loading, setLoading] = useState(false)

    const register = useSelector(state => state.register)
    const dispatch = useDispatch()

    async function handleRegister(e) {
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            if (data.name === "" ||
                data.email === "" ||
                data.whatsapp === "" ||
                data.uf === "" ||
                data.city === "") {
                setTextButton("Nenhum campo pode ficar vazio")
            } else {
                setLoading(true)
                await dispatch(addOngs(data))
            }


        } catch (error) {
            alert('Erro no cadastro, tente novamente')
        }
    }

    const loadRegister = () => {
        return loading && <SemipolarLoading
            color="#fff"
            speed={1}
            style={null}
        />
    }

    const messageRegister = () => {
        return (
            <div className="message-register">
                <FiCheck size={25} color="#fff" />
                <p>Cadastrado com sucesso!!!</p>
            </div>
        )
    }

    return (
        <div className="register-container">
            {register.length > 0 ? messageRegister() : null}
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude
                        pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="E-mail" type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="whatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit" >
                        {loadRegister()}
                        {textButton !== 'Cadastrar' && !loading && <FiAlertTriangle size={25} color="#fff" style={{ marginRight: 20, marginBottom: -5 }} />}
                        {loading && "Aguarde..."}
                        {!loading && textButton}
                    </button>
                </form>
            </div>
        </div>
    )
}
