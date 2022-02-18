import React, {useState, useEffect} from 'react'
import {
    Alert,
    SafeAreaView,
    View
} from 'react-native'
import {
    VictoryAxis,
    VictoryChart,
    VictoryGroup,
    VictoryBar,
    VictoryLegend,
    VictoryContainer
} from 'victory-native'
import{
    Header
} from 'react-native-elements'

import LeafMenuIcon from '../elements/LeafMenuIcon'
import Styles from '../elements/Styles'
import { getHistoricByIdGarden } from '../services/HistoricServices'
import { getUserId } from '../database/DB'
import { getGardenByIdUser } from '../services/GardenServices'

const Historic = () => {

    const [dados, setDados] = useState([])

    const daysOfWeek = ['Dom', 'Seg','Ter', 'Qua', 'Qui', 'Sex', 'Sab']
    
    useEffect(() => {
        getUserId((error, success) => {
            if( !error && success && success.trim().length > 0 ) {
                const id = JSON.parse(success)
                getGardenByIdUser(id)
                    .then((response) => {
                        getHistoricByIdGarden(response.data.id)
                            .then((response) => {
                                console.log(response.data)
                                setDados(response.data)
                            })
                            .catch((error) => {
                                console.log("Não foi possível recuperar o histórico")
                            })
                    })
                    .catch((error) => Alert.alert("Erro", "Não foi possivel resgatar o id da planta"))
            }         
        })
    }, [])
    
    return (
        <SafeAreaView style={Styles.principalContainer}>
            <View style={Styles.homeUpView}>
                <Header 
                    backgroundColor='#08B662' 
                    leftComponent={<LeafMenuIcon/>}
                />
                <VictoryContainer style={{marginTop:40}}>
                    <VictoryChart domain={{y:[0,100]}}>
                        <VictoryAxis style={{tickLabels:{fill:'#FEFEFE', fontWeight:'bolder'}}} tickFormat={x => (daysOfWeek[new Date(x).getDay()])}/>
                        <VictoryAxis dependentAxis style={{tickLabels:{fill:'#FEFEFE', fontWeight:'bolder'}}}/>
                        <VictoryGroup offset={10} >
                            <VictoryBar 
                                data={dados}
                                x="irrigationDate"
                                y="temperature"
                                style={{
                                    data: {
                                        fill: 'orange'
                                    }
                                }}/>
                            <VictoryBar 
                                data={dados}
                                x="irrigationDate"
                                y="moisture"
                                style={{
                                    data: {
                                        fill: '#2C6F9F'
                                    }
                                }}/>
                        </VictoryGroup>
                        
                        <VictoryLegend
                            style={{
                                labels:{
                                    fill: '#FEFEFE',
                                    fontWeight:'bolder'
                                }
                            }}
                            symbolSpacer={10}
                            gutter={30}
                            orientation= 'horizontal'
                            data={[
                                {
                                    name: 'Temperatura' ,
                                    symbol:{
                                        fill:'orange'
                                    }
                                },
                                {
                                    name:'Umidade',
                                    symbol:{
                                        fill:'#2C6F9F'
                                    }
                                }
                            ]}
                        />
                        
                    </VictoryChart>
                </VictoryContainer>
            </View>

        </SafeAreaView>
    )
}

export default Historic