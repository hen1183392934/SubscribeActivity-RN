import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from '../../assets/icons/icomoon'
import theme from '../../theme/defaultTheme'

const ListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name='no-activity' size={60} color={theme.PrimaryLight}></Icon>
      <Text style={styles.text}>No activity found</Text>
    </View>
  )
}
export default ListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 14,
    fontSize: 14,
    color: theme.Disable,
  },
})
