import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from '../../assets/icons/icomoon'
import { StoreState, EventChannel } from '../../store/type'
import { useSelector, useDispatch } from 'react-redux'
import { SEARCH_EVENTS } from '../../store/action'
import DateTimePicker from '@react-native-community/datetimepicker'
import theme from '../../theme/defaultTheme'

const dateOptions = ['ANYTIME', 'TODAY', 'TOMORROW', 'THIS WEEK', 'THIS MONTH', 'LATER']
interface Props {
  closeSearch: (beforeDate: Date, afterDate: Date) => void
}

const Search: React.FC<Props> = ({ closeSearch }) => {
  const storeSelectedDateIndex = useSelector<StoreState, number>((state) => {
    return state.eventListData.selectedDateIndex
  })
  const storeSelectedChannels = useSelector<StoreState, number[]>((state) => {
    return state.eventListData.selectedChannels
  })
  const [selectedDateIndex, setSelectedDateIndex] = React.useState(storeSelectedDateIndex)
  const [selectedChannels, setSelectedChannels] = React.useState(storeSelectedChannels)

  const [afterDate, setAfterDate] = React.useState(new Date())
  const [beforeDate, setBeforeDate] = React.useState(new Date())

  const channelOptions: EventChannel[] = useSelector<StoreState, EventChannel[]>((state) => {
    return [{ id: 0, name: 'ALL' }, ...state.eventListData.channels]
  })
  function channelSelect(channelId: number) {
    if (channelId === 0) {
      setSelectedChannels([0])
    } else {
      const copySelectedChannels: number[] = selectedChannels.slice()
      copySelectedChannels.includes(0) && copySelectedChannels.splice(0, 1)
      if (copySelectedChannels.includes(channelId)) {
        //如已选择则再点击取消选择
        copySelectedChannels.splice(copySelectedChannels.indexOf(channelId), 1)
      } else {
        copySelectedChannels.push(channelId)
      }
      setSelectedChannels(copySelectedChannels)
    }
  }

  React.useEffect(() => {
    setSelectedDateIndex(storeSelectedDateIndex)
  }, [storeSelectedDateIndex])
  React.useEffect(() => {
    setSelectedChannels(storeSelectedChannels)
  }, [storeSelectedChannels])
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <View style={styles.optionsBox}>
        <View style={styles.typeTitle}>
          <View style={styles.titleBorder}>
            <Text style={styles.title}>DATE</Text>
          </View>
          {/* date 选项 */}
          <View style={styles.options}>
            {dateOptions.map((date, i) => {
              return (
                <TouchableOpacity
                  key={date}
                  style={[
                    styles.optionBut,
                    {
                      backgroundColor:
                        selectedDateIndex === i ? theme.SecondaryLight : 'transparent',
                    },
                  ]}
                  onPress={() => setSelectedDateIndex(i)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: selectedDateIndex === i ? theme.TextPrimary : '#fff',
                    }}
                  >
                    {date}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
          {/* 时间范围选择 */}
          {selectedDateIndex === 5 && (
            <View
              style={{
                width: '100%',
                height: 38,
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Icon name='date-from' size={16} color={theme.Secondary} />
              <DateTimePicker
                value={afterDate}
                onChange={(event, date) => setAfterDate(date || new Date())}
                style={{ flex: 1, backgroundColor: '#fff' }}
              />
              <Text style={{ color: 'rgba(0,0,0,0.9)' }}>-</Text>
              <Icon name='date-to' size={16} color={theme.Secondary} />
              <DateTimePicker
                value={beforeDate}
                onChange={(event, date) => setBeforeDate(date || new Date())}
                style={{ flex: 1 }}
              />
            </View>
          )}
        </View>
        <View style={styles.typeTitle}>
          <View style={styles.titleBorder}>
            <Text style={styles.title}>CHANNEL</Text>
          </View>
          <View style={styles.options}>
            {channelOptions.map((channel) => {
              return (
                <TouchableOpacity
                  key={channel.id}
                  style={[
                    styles.optionBut,
                    {
                      marginRight: 10,
                      marginBottom: 12,
                      borderColor: '#fff',
                      borderWidth: selectedChannels.includes(channel.id) ? 0 : 1,
                      backgroundColor: selectedChannels.includes(channel.id)
                        ? theme.SecondaryLight
                        : 'transparent',
                    },
                  ]}
                  onPress={() => {
                    channelSelect(channel.id)
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: selectedChannels.includes(channel.id) ? theme.TextPrimary : '#fff',
                    }}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                  >
                    {channel.name}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.searchBut,
          {
            backgroundColor:
              selectedDateIndex === undefined || !selectedChannels.length
                ? theme.Disable
                : theme.Secondary,
          },
        ]}
        disabled={selectedDateIndex === undefined || !selectedChannels.length}
        onPress={() => {
          dispatch({
            type: SEARCH_EVENTS,
            selectedDateIndex,
            selectedChannels,
            afterDate,
            beforeDate,
          })
          closeSearch(beforeDate, afterDate)
        }}
      >
        <Icon
          name='search'
          size={16}
          color={
            selectedDateIndex === undefined || !selectedChannels.length
              ? theme.TextDark
              : theme.TextPrimary
          }
        />
        <Text
          style={{
            fontSize: 16,
            marginLeft: 4,
            lineHeight: 20,
            color:
              selectedDateIndex === undefined || !selectedChannels.length
                ? theme.TextDark
                : theme.TextPrimary,
          }}
        >
          SEARCH
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.TextPrimary,
  },
  optionsBox: {
    flex: 1,
    alignItems: 'center',
  },
  typeTitle: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  titleBorder: {
    borderBottomWidth: 2,
    borderBottomColor: theme.TextDeepPurple,
  },
  searchBut: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionBut: {
    height: 24,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    height: 24,
    marginTop: 10,
    fontSize: 12,
    lineHeight: 24,
    color: theme.TextDeepPurple,
  },
  options: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
})
