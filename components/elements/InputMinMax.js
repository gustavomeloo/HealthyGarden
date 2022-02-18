import React from 'react'

import {
  Text,
  TextInput, 
  View
} from 'react-native'


import Styles from './Styles';

const InputMinMax = (props) =>{

    return(
        <View style={Styles.inputMinMax_view}>
            
            <Text style={Styles.inputMinMax_text}>
              {props.title}
            </Text>
            
            <TextInput 
              keyboardType='numeric' 
              maxLength={2} 
              onChangeText={(txt) => props.onChangeText(txt)} 
              placeholder={props.placeholder} 
              style={Styles.inputMinMax_input} 
              value={props.value} 
            />
        </View>
    )
}

export default InputMinMax