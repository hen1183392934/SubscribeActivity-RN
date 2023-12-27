import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { SEARCH_EVENTS } from '../../store/action'
import { StoreState, EventChannel } from '../../store/type'
import { getTimeRange } from '../../store/utils'
import theme from '../../theme/defaultTheme'

interface Props {
  beforeDate: Date
  afterDate: Date
  hiddenResultInfo: () => void
}

const ListScreen: React.FC<Props> = ({ beforeDate, afterDate, hiddenResultInfo }) => {
  const resultLength = useSelector<StoreState, number>((state) => state.eventListData.events.length)
  const channels = useSelector<StoreState, EventChannel[]>((state) => state.eventListData.channels)
  const selectedChannels = useSelector<StoreState, number[]>(
    (state) => state.eventListData.selectedChannels
  )
  const selectedDateIndex = useSelector<StoreState, number>(
    (state) => state.eventListData.selectedDateIndex
  )

  //获取选中channel的名字
  const selectedChannelsNames = channels
    .filter((item) => selectedChannels.includes(item.id))
    .map((item) => item.name)
  const { before, after } = getTimeRange(selectedDateIndex, beforeDate, afterDate)
  const afterTimestamp: Date = new Date(after)
  const beforeTimestamp: Date = new Date(before)

  const timeRange = `${
    after === 0 && before === 0
      ? `Any Time`
      : `from ${afterTimestamp.getDate()}/${
          afterTimestamp.getMonth() + 1
        } 00:00 to ${beforeTimestamp.getDate()}/${beforeTimestamp.getMonth() + 1} 00:00`
  }`

  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.resultNum}>{resultLength} Result</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            dispatch({ type: SEARCH_EVENTS, selectedDateIndex: 0, selectedChannels: [0] })
            hiddenResultInfo()
          }}
        >
          <Text style={{ fontSize: 10 }}>CLEAR SEARCH</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.desc}>
        {`Searched for ${
          selectedChannelsNames.length > 0 ? selectedChannelsNames.join(',') : 'All'
        } Activities ${timeRange}`}
      </Text>
    </View>
  )
}
export default ListScreen

const styles = StyleSheet.create({
  container: {
    minHeight: 80,
    paddingHorizontal: 14,
    paddingLeft: 27,
    paddingRight: 15,
    justifyContent: 'center',
    backgroundColor: theme.BackgroundGray,
  },
  top: {
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultNum: {
    fontSize: 16,
    color: theme.Primary,
  },
  clearButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: theme.Secondary,
  },
  desc: {
    fontSize: 12,
    color: theme.TextDeepGray,
  },
})
