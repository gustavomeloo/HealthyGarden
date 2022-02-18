import React, {useState} from 'react'

import {
  SafeAreaView,
  Text,
  View
} from 'react-native'

import {
  Button,
  Input
} from 'react-native-elements'

import Styles from '../elements/Styles'

const Password = (props) => {
    
    const [email, setEmail] = useState('')
    return(
        <SafeAreaView style={Styles.passContainer} >

            <Text style={Styles.passTitle}>Recuperação de Senha</Text>
          
            <View style={Styles.passContainerContent}>
              
              <Text style={Styles.passDescription}>
                Para recuperar a senha, favor informar seu e-mail cadastrado e clicar no botão <Text style={Styles.passDescriptionBold}>'Enviar Email'</Text>, para que sua senha seja enviada!
              </Text>

              <Input 
                inputStyle={Styles.passInput}
                label="Email" 
                labelStyle={Styles.passLabel} 
                onChangeText={(value) => setEmail(value)}
                value={email}
              />
              
              <Button 
                buttonStyle={Styles.passButton} 
                containerStyle={Styles.passButtonContainer}
                title='Enviar Email' 
              />

              <Button 
                buttonStyle={Styles.passButton} 
                containerStyle={Styles.passButtonContainer} 
                onPress={() => props.navigation.navigate("login") }
                title='Retornar ao Login' 
              />

            </View>

        </SafeAreaView>
    )
}

export default Password