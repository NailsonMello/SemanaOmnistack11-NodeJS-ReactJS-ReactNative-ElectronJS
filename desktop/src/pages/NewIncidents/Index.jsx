import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addIncident } from '../../store/fetchActions/NewIncidents/Index'
import { FiArrowLeft, FiCheck, FiAlertTriangle } from 'react-icons/fi'
import { SemipolarLoading } from 'react-loadingg'
import { Link } from 'react-router-dom'
import './style.css'
import logoImg from '../../assets/logo.svg'

export default function NewIncidents() {
    const dispatch = useDispatch()
    const register = useSelector(state => state.incidents)

    const [textButton, setTextButton] = useState('Cadastrar')
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongId')
    async function handleNewIncidents(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            if (data.title === "" ||
                data.description === "" ||
                data.value === "") {
                setTextButton("Nenhum campo pode ficar vazio")
            } else {
                setLoading(true)
                dispatch(addIncident(data, ongId))
            }
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
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
        <div className="new-incident-container">
            {register.length > 0 ? messageRegister() : null}
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para
                    encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                    Voltar para home
                </Link>
                </section>
                <form onSubmit={handleNewIncidents}>
                    <input
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

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
