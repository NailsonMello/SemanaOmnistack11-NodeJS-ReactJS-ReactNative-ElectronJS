import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authLogin } from '../../store/fetchActions/Logon/Index'
import { FiLogIn, FiAlertTriangle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { SemipolarLoading } from 'react-loadingg'
import './style.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

function Index() {
    const [id, setId] = useState('')
    const [textButton, setTextButton] = useState('Entrar')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            if (id === '') {
                setTextButton('Digite seu ID')
            } else {
                setLoading(true)

                setTimeout(() => {
                    dispatch(authLogin(id))
                }, 2500)
            }
        } catch (error) {
            alert('Falha no login, tente novamente')
        }
        //setId('')
    }

    const loadLogon = () => {
        return loading && <SemipolarLoading
            color="#fff"
            speed={1}
            style={null}
        />
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">
                        {loadLogon()}
                        {textButton !== 'Entrar' && !loading && <FiAlertTriangle size={25} color="#fff"style={{marginRight: 20, marginBottom: -5}} />}
                        {loading && "Aguarde..."}
                        {!loading && textButton}
                    </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tem cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}

export default Index
