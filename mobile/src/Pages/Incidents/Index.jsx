import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators'
import api from '../../Services/ApiService'

import logoImg from '../../assets/logo.png'
import styles from './styles'

const Incidents = () => {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const navigateToDetails = (incident) => {
        navigation.navigate('Details', { incident })
    }
    const loadIncidents = async () => {
        if (loading) return

        if (total > 0 && incidents.length === total) return
        setLoading(true)

        const res = await api.get('incidents', {
            params: { page }
        })
        setIncidents([...incidents, ...res.data])
        setTotal(res.headers['x-total_count'])
        setPage(page + 1)
        setLoading(false)
    }
    useEffect(() => {
        loadIncidents()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>
                        {total} casos
                </Text>.
            </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
           </Text>

            <FlatList
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                style={styles.incidentsList}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',
                            { style: 'currency', currency: 'BRL' }
                        ).format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton}
                            onPress={() => navigateToDetails(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            { loading ? <MaterialIndicator color='#e02041' size={30} style={styles.loading}/>: null}
        </View>
    )
}

export default Incidents
