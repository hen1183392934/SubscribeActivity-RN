import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../components/common/Header'
import ResultInfo from '../components/list/ResultInfo'
import List from '../components/common/List'
import Drawer from 'react-native-drawer'
import Search from '../components/list/Search'
import { useSelector, useDispatch } from 'react-redux'
import { StoreState } from '../store/type'
import { GET_CHANNELS, GET_EVENTS } from '../store/action'

interface Props {
  navigation: any
}

const ListScreen: React.FC<Props> = ({ navigation }) => {
  const [showSearch, setShowSearch] = React.useState(false)
  const [fromSearch, setFromSearch] = React.useState(false)

  const [afterDate, setAfterDate] = React.useState(new Date())
  const [beforeDate, setBeforeDate] = React.useState(new Date())

  const token = useSelector<StoreState, string>((state) => state.loginInfo.token)

  const dispatch = useDispatch()
  React.useEffect(() => {
    if (token) {
      dispatch({ type: GET_EVENTS, channels: '', offset: 0, limit: 25 })
    }
  }, [token])

  const listRef = React.useRef()
  return (
    <Drawer
      type='displace'
      content={
        <Search
          closeSearch={(beforeDate, afterDate) => {
            setShowSearch(false)
            setBeforeDate(beforeDate)
            setAfterDate(afterDate)
            setFromSearch(true)
            listRef.scrollToTop()
          }}
        />
      }
      open={showSearch}
      panOpenMask={0.25}
      panCloseMask={0.25}
      openDrawerOffset={0.25}
      acceptPan={true}
      onOpenStart={() => {
        dispatch({ type: GET_CHANNELS })
      }}
      onClose={() => setShowSearch(false)}
    >
      <View style={styles.container}>
        <Header
          navigation={navigation}
          onShowSearch={() => {
            setShowSearch(true)
          }}
          showSearch={true}
        ></Header>
        {fromSearch && (
          <ResultInfo
            beforeDate={beforeDate}
            afterDate={afterDate}
            hiddenResultInfo={() => setFromSearch(false)}
          />
        )}
        <List ref={listRef} navigation={navigation}></List>
      </View>
    </Drawer>
  )
}
export default ListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
