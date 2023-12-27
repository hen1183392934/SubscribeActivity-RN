import * as React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Activity from '../list/Activity'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import { Event, StoreState } from '../../store/type'
import { useSelector, useDispatch } from 'react-redux'
import { GET_EVENTS } from '../../store/action'
import NoResult from './NoResult'

interface Props {
  navigation: any //todo：抛出click方法到外面处理跳转
  filterType?: string
}

const List: React.FC<Props> = ({ navigation, filterType }) => {
  const dispatch = useDispatch()
  const selectedChannels = useSelector<StoreState, number[]>((state) => {
    return state.eventListData.selectedChannels
  })
  const events: Event[] = useSelector<StoreState, Event[]>((state) => {
    return state.eventListData.events
  })
  const hasMore = useSelector<StoreState, boolean>((state) => {
    return state.eventListData.hasMore
  })
  const needFilter = filterType === 'like' || filterType === 'check' || filterType === 'past'
  function eventfilter(originalEvents: Event[]) {
    //过滤展示的活动
    return originalEvents.filter((item: Event) => {
      switch (filterType) {
        case 'like':
          return item.me_likes
        case 'check':
          return item.me_going && new Date(item.begin_time).getTime() > new Date().getTime()
        case 'past':
          return item.me_going && new Date(item.begin_time).getTime() < new Date().getTime()
        default:
          return item
      }
    })
  }
  function onLoadMore() {
    // 滑动到底部，加载
    if (hasMore) {
      const offset = events.length
      const channels = selectedChannels.includes(0) ? '' : selectedChannels.join(',')
      dispatch({ type: GET_EVENTS, channels, offset, limit: 0 })
    }
  }
  //RecyclerListView 相关
  const listView: any = React.useRef()
  React.useImperativeHandle(listView, () => ({
    scrollToTop: () => {
      listView.current.scrollToTop()
    },
  }))
  const createdDataProvider = new DataProvider((r1, r2) => r1 !== r2)
  const [dataProvider, setDataProvider] = React.useState(
    createdDataProvider.cloneWithRows(needFilter ? eventfilter(events) : events)
  )

  React.useEffect(() => {
    setDataProvider(createdDataProvider.cloneWithRows(needFilter ? eventfilter(events) : events))
  }, [events])
  React.useEffect(() => {
    setDataProvider(createdDataProvider.cloneWithRows(needFilter ? eventfilter(events) : events))
  }, [filterType])
  const layoutProvider = new LayoutProvider(
    () => 'event',
    (type, dim) => {
      dim.width = Dimensions.get('screen').width
      dim.height = 250
    }
  )
  function rowRenderer(type: React.ReactText, data: Event) {
    return data ? <Activity event={data} navigation={navigation} /> : null
  }

  if (
    (needFilter ? eventfilter(events) : events) &&
    (needFilter ? eventfilter(events) : events).length
  ) {
    return (
      <RecyclerListView
        ref={listView}
        style={styles.container}
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
        onEndReached={onLoadMore}
        onEndReachedThreshold={300}
      />
    )
  } else {
    return <NoResult />
  }
}
export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
