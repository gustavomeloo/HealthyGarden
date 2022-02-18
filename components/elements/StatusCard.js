import React from 'react'
import {
    Card,
    Icon
} from 'react-native-elements'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Styles from './Styles'

const StatusCard = (props) => {
    
    const styles = StyleSheet.create({
        container:{
            borderRadius:16,
            margin:24,
            backgroundColor: props.containerColor
        },

        mainText:{
            color:"#FEFEFE",
            fontSize: props.textSize,
            textAlign:'center', 
            alignSelf:"center", 
            flex:2
        }
    })

    return (
        <Card containerStyle={styles.container}>
            <View style={Styles.statusCard_view}>
                {props.componentIcon}
                <Text style={styles.mainText}>{props.statusText}</Text>
            </View>
        </Card>
    )
}

export default StatusCard