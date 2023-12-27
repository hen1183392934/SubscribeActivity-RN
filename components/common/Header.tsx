import * as React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { StoreState, User } from '../../store/type'
import { useSelector } from 'react-redux'
import Icon from '../../assets/icons/icomoon'
import theme from '../../theme/defaultTheme'
interface Props {
  navigation: any
  showSearch?: boolean
  onShowSearch?: () => void
}

const Header: React.FC<Props> = ({ navigation, showSearch = false, onShowSearch }) => {
  const user = useSelector<StoreState, User>((state) => state.loginInfo.user)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          showSearch && onShowSearch ? onShowSearch() : navigation.navigate('List')
        }}
      >
        <Icon name={showSearch ? 'search' : 'home'} size={18} color={theme.TextPrimary}></Icon>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name='logo-cat' size={24} color={theme.Secondary}></Icon>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Me')
        }}
      >
        <Image
          source={{
            uri: user.avatar,
          }}
          defaultSource={require('../../assets/images/user.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    paddingLeft: 19,
    paddingRight: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.Primary,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
})
