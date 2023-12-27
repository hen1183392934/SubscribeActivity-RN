import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from '../../assets/icons/icomoon'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { User } from '../../store/type'
import theme from '../../theme/defaultTheme'

interface Props {
  icon: string
  total: number
  name: string
  users?: User[]
}

const ListScreen: React.FC<Props> = ({ icon, total = 0, name, users = [] }) => {
  const [viewAll, setViewAll] = useState(false)
  const [overArea, setOverArea] = useState(false)
  const [onlineNum, setOnlineNum] = useState(users.length)
  return (
    <View style={[styles.container, { height: overArea && !viewAll ? 58 : 'auto' }]}>
      <View style={styles.totalInfo}>
        <Icon name={icon} size={12} color={theme.TextDeepPurple} />
        <Text style={styles.totalText}>{`${total} ${name}`}</Text>
      </View>
      <View
        style={styles.users}
        onLayout={(e) => {
          const layoutWidth = e.nativeEvent.layout.width
          if (users.length * 31 > layoutWidth) {
            setOverArea(true)
          }
          setOnlineNum(Math.floor(layoutWidth / 31))
        }}
      >
        {users.map((user, i) => {
          if (overArea && !viewAll && i >= onlineNum) {
            return null
          }
          return <Image key={i} source={{ uri: user.avatar }} style={styles.avatar} />
        })}
        {overArea ? (
          <TouchableOpacity onPress={() => setViewAll(!viewAll)} style={styles.viewAll}>
            <AntIcon
              name={viewAll ? 'upcircleo' : 'downcircleo'}
              size={24}
              color={theme.TextDeepPurple}
            ></AntIcon>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}
export default ListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingRight: 6,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: theme.BorderPrimary,
    overflow: 'hidden',
  },
  totalInfo: {
    width: 93,
    paddingLeft: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    marginLeft: 6,
    fontSize: 12,
    lineHeight: 20,
    color: theme.TextDeepGray,
  },
  users: {
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 25,
    height: 25,
    marginRight: 7,
    marginBottom: 12,
    borderRadius: 24,
  },
  viewAll: {
    position: 'absolute',
    right: 0,
    bottom: 13,
  },
})
