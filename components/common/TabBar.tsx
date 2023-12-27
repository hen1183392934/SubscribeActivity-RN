import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../../assets/icons/icomoon'
import theme from '../../theme/defaultTheme'
interface Props {
  tabData: { key: string; value: string }[]
  initialActive: string
  onActiveChange: (active: string) => void
}

const TabBar: React.FC<Props> = ({ tabData, initialActive, onActiveChange }) => {
  const [active, setActive] = React.useState(initialActive)
  return (
    <View style={styles.container}>
      {tabData.map((tab, i) => {
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, i < tabData.length - 1 ? styles.borderRight : {}]}
            onPress={() => {
              setActive(tab.key)
              onActiveChange(tab.key)
            }}
          >
            <Icon
              name={active === tab.key ? tab.key : `${tab.key}-outline`}
              size={16.7}
              color={active === tab.key ? theme.TextGreen : theme.TextGray}
            />
            <Text
              style={[
                styles.tabText,
                { color: active === tab.key ? theme.TextGreen : theme.TextGray },
              ]}
            >
              {tab.value}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.BorderPrimary,
    backgroundColor: '#fff',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderRight: {
    paddingRight: 18,
    marginRight: 18,
    borderRightWidth: 1,
    borderRightColor: theme.BorderPrimary,
  },
  tabText: {
    marginLeft: 6,
    fontSize: 12,
  },
})
