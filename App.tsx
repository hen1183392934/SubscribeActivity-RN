import React, { FC } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import ListScreen from './screens/ListScreen'
import MeScreen from './screens/MeScreen'
import DetailScreen from './screens/DetailScreen'
import store from './store/index'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings'
import { StoreState } from './store/type'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginSuccess } from './store/action'

const Stack = createStackNavigator()
const LoggedStack = createStackNavigator()
interface Props {
  navigation: any
}
const LoggedStackScreen: React.FC<Props> = ({ navigation }: Props) => {
  const token = useSelector<StoreState, string>((state) => {
    return state.loginInfo.token
  })

  React.useEffect(() => {
    // 判断未登录的话，要跳转至登录页
    if (!token) {
      navigation.navigate('Login')
    } else {
      navigation.navigate('Logged')
    }
  }, [token])

  return (
    <LoggedStack.Navigator initialRouteName='List'>
      {/* 已登录的页面分为几个页面 */}
      <LoggedStack.Screen name='List' component={ListScreen} options={{ headerShown: false }} />
      <LoggedStack.Screen name='Me' component={MeScreen} options={{ headerShown: false }} />
      <LoggedStack.Screen name='Detail' component={DetailScreen} options={{ headerShown: false }} />
    </LoggedStack.Navigator>
  )
}
const Navigation: React.FC = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    const initStorage = async () => {
      let token: string | null = ''
      let id: number | null = NaN
      let username: string | null = ''
      let email: string | null = ''
      let avatar: string | null = ''

      try {
        token = (await AsyncStorage.getItem('STORAGE_TOKEN')) || ''
        id = parseInt((await AsyncStorage.getItem('STORAGE_USERID')) || '', NaN)
        username = (await AsyncStorage.getItem('STORAGE_USERNAME')) || ''
        email = (await AsyncStorage.getItem('STORAGE_USEREMAIL')) || ''
        avatar = (await AsyncStorage.getItem('STORAGE_USERAVATAR')) || ''
      } catch (e) {
        console.error(e)
      }
      dispatch(loginSuccess(token, id, username, email, avatar))
    }

    initStorage()
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='logged'>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name='Logged'
          component={LoggedStackScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App: FC = () => {
  const [fontsLoaded] = useFonts({ IcoMoon: require('./assets/icons/fonts/icomoon.ttf') })
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Navigation></Navigation>
        </SafeAreaView>
      </Provider>
    </RootSiblingParent>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
