import * as React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import Icon from '../../assets/icons/icomoon'
import { GET_EVENT_DETAIL } from '../../store/action'
import { Event } from '../../store/type'
import { timeFormat } from '../../store/utils'
import theme from '../../theme/defaultTheme'

interface Props {
  event: Event
  navigation: any
}
const Activity: React.FC<Props> = ({ navigation, event }) => {
  const dispatch = useDispatch()
  async function jumpDetail() {
    await dispatch({ type: GET_EVENT_DETAIL, id: event.id })
    navigation.navigate('Detail', { event: event })
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() => jumpDetail()}>
      {/* 头像 用户名  频道名称 */}
      <View style={styles.user}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{
              uri: event.creator.avatar,
            }}
            defaultSource={require('../../assets/images/user.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>{event.creator.username}</Text>
        </View>
        <View style={styles.channelName}>
          <Text style={styles.channelNameText}>{event.channel.name}</Text>
        </View>
      </View>
      {/* 活动标题  时间  活动图片 */}
      <View style={styles.flexRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
            {event.name}
          </Text>
          <View style={styles.flexRow}>
            <Icon name='time' size={12} color={theme.Primary}></Icon>
            <Text style={styles.time}>
              {`${timeFormat(event.begin_time)} - ${timeFormat(event.end_time)}`}
            </Text>
          </View>
        </View>
        {event.images && event.images.length ? (
          <Image
            source={{ uri: event.images[1] }}
            defaultSource={require('../../assets/images/no-picture.png')}
            style={{ width: 64, height: 64 }}
          ></Image>
        ) : null}
      </View>
      {/* 活动内容 */}
      <View style={{ height: 60 }}>
        <Text style={styles.desc} numberOfLines={3} ellipsizeMode={'tail'}>
          {event.description}
        </Text>
      </View>
      {/* 参加  点赞 */}
      <View style={[styles.flexRow, styles.goLike]}>
        <View style={[styles.flexRow, styles.going]}>
          <Icon
            name={event.me_going ? 'check' : 'check-outline'}
            size={12}
            color={theme.TextGreen}
          />
          <Text style={[styles.goText, !event.me_going && styles.goTextOutline]}>
            {event.me_going ? 'I am going!' : `${event.goings_count}  Going`}
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Icon name={event.me_likes ? 'like' : 'like-outline'} size={12} color='#FF5C5C' />
          <Text style={[styles.goText, !event.me_likes && styles.goTextOutline]}>
            {event.me_likes ? 'I like it' : `${event.likes_count} Like`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default Activity

const styles = StyleSheet.create({
  container: {
    // flex:1,
    paddingVertical: 19,
    marginHorizontal: 19,
    borderBottomWidth: 1,
    borderBottomColor: theme.BorderPrimary,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    marginBottom: 10,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    paddingLeft: 6,
    fontSize: 12,
    color: theme.TextDeepGray,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  channelName: {
    height: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.PrimaryLight,
    borderRadius: 10,
  },
  channelNameText: {
    fontSize: 12,
    lineHeight: 18,
    color: theme.Primary,
  },
  title: {
    fontSize: 18,
    lineHeight: 25,
    color: theme.TextPrimary,
  },
  time: {
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 36,
    color: theme.Primary,
  },
  desc: {
    lineHeight: 20,
    color: theme.TextDeepGray,
  },
  goLike: {
    height: 45,
  },
  going: {
    marginRight: 15,
  },
  goText: {
    fontSize: 12,
    marginLeft: 5,
    color: theme.TextPrimary,
  },
  goTextOutline: {
    color: theme.TextDeepPurple,
  },
})
