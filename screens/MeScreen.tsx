import * as React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import Header from '../components/common/Header'
import { StoreState, User } from '../store/type'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '../assets/icons/icomoon'
import List from '../components/common/List'
import { GET_USER, GET_EVENTS, LOGIN_OUT } from '../store/action'
import theme from '../theme/defaultTheme'
import TabBar from '../components/common/TabBar'

interface Props {
  navigation: any
}

const MeScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector<StoreState, User>((state) => state.loginInfo.user)
  const token = useSelector<StoreState, string>((state) => state.loginInfo.token)
  const [active, setActive] = React.useState('like')
  const tabData = [
    { key: 'like', value: `${user.likes_count} Likes` },
    { key: 'check', value: `${user.goings_count} Going` },
    { key: 'past', value: `${user.past_count} Past` },
  ]
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (token) {
      dispatch({ type: GET_USER })
      dispatch({ type: GET_EVENTS, channels: '', offset: 0, limit: 0 })
    }
  }, [token])

  return (
    <View style={styles.container}>
      <Header navigation={navigation}></Header>
      {/* 用户名 头像 email */}
      <View style={styles.meInfo}>
        <Image
          source={{
            uri: user.avatar,
          }}
          defaultSource={require('../assets/images/user.png')}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.email}>
          <Icon name='email' size={17} color={theme.Primary} />
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
      </View>
      <Button
        title='login out'
        onPress={() => {
          dispatch({ type: LOGIN_OUT })
        }}
      ></Button>
      {/* 点赞 参与 切换栏*/}
      <TabBar
        tabData={tabData}
        initialActive={'like'}
        onActiveChange={(active) => setActive(active)}
      />
      <View style={styles.listContainer}>
        <List navigation={navigation} filterType={active}></List>
      </View>
    </View>
  )
}
export default MeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.BackgroundGray,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meInfo: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.BorderPrimary,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 72,
    height: 72,
    marginTop: 36,
    marginBottom: 24,
    borderRadius: 72,
    borderWidth: 2,
    borderColor: theme.Primary,
  },
  username: {
    fontSize: 24,
    color: theme.TextDeepGray,
  },
  email: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 24,
  },
  emailText: {
    marginLeft: 6,
    fontSize: 14,
    color: theme.Primary,
  },
  likes: {
    paddingRight: 18,
    marginRight: 18,
    borderRightWidth: 1,
    borderRightColor: theme.BorderPrimary,
  },
  listContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: theme.BackgroundGray,
  },
})
