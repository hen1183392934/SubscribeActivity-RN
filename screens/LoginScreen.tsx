import React, { FC, useState, useEffect } from 'react'
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { View, Text, TextInput } from 'react-native'
import Icon from '../assets/icons/icomoon'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { useSelector, useDispatch } from 'react-redux'
import { LOGIN_REQUEST } from '../store/action'
import { StoreState } from '../store/type'
import i18n from '../language/i18n'
import theme from '../theme/defaultTheme'

interface Props {
  navigation: any
}
const LoginScreen: FC<Props> = ({ navigation }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const token = useSelector<StoreState, string>((state) => state.loginInfo.token)

  useEffect(() => {
    if (token) {
      navigation.navigate('Logged')
    }
  }, [token])
  const submit = () => {
    //登录
    if (username && password) {
      dispatch({ type: LOGIN_REQUEST, username, password })
    }
  }
  // 引入svg图标
  const [fontsLoaded] = useFonts({ IcoMoon: require('../assets/icons/fonts/icomoon.ttf') })
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ImageBackground source={require('../assets/images/Street-Dance-01.jpg')} style={styles.image}>
      <View style={styles.filter}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.desc}>{i18n.t('desc')}</Text>
          <Text style={styles.name}>{i18n.t('appName')}</Text>
          <View style={styles.iconBorder}>
            <View style={[styles.iconBorder, styles.insideBorder]}>
              <Icon name='logo-cat' size={40} color={theme.Secondary}></Icon>
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.inputBox}>
              <Icon name='user' size={14} color={theme.PrimaryLight}></Icon>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setUserName(text)}
                value={username}
                autoCapitalize='none'
                autoFocus={true}
                placeholder={i18n.t('usernamePlaceholder')}
                placeholderTextColor={'rgba(255,255,255,0.6)'}
              ></TextInput>
            </View>
            <View style={styles.inputBox}>
              <Icon name='password' size={15} color={theme.PrimaryLight}></Icon>
              <TextInput
                textContentType='password'
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder={i18n.t('passwordPlaceholder')}
                placeholderTextColor={'rgba(255,255,255,0.6)'}
              ></TextInput>
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={[styles.submit, !username || !password ? styles.disabledSubmit : {}]}
          disabled={!username || !password}
          onPress={() => submit()}
        >
          <Text style={styles.submitText}>{i18n.t('login')}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(133,96,169,0.7)',
  },
  desc: {
    fontSize: 20,
    color: theme.Secondary,
  },
  name: {
    marginTop: 16,
    marginBottom: 37,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 31,
    color: theme.Secondary,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBorder: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(213,239,127,0.5)',
    borderRadius: 128,
  },
  insideBorder: {
    width: 60,
    height: 60,
    borderColor: theme.Secondary,
    overflow: 'hidden',
  },
  form: {
    marginTop: 100,
  },
  inputBox: {
    width: 240,
    height: 40,
    marginTop: 16,
    paddingLeft: 13,
    borderColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 13,
  },
  submit: {
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.Secondary,
  },
  disabledSubmit: {
    backgroundColor: theme.Disable,
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.TextPrimary,
  },
})
