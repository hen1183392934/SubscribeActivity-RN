import * as React from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native'
import Header from '../components/common/Header'
import { ScrollView } from 'react-native-gesture-handler'
import Details from '../components/detail/Details'
import Participants from '../components/detail/Participants'
import Comments from '../components/detail/Comments'
import BottomOperator from '../components/detail/BottomOperator'
import { timeFormat } from '../store/utils'
import { Api } from '../apis/Api'
import { useDispatch, useSelector } from 'react-redux'
import { Event, StoreState } from '../store/type'
import { GET_EVENT_DETAIL } from '../store/action'
import theme from '../theme/defaultTheme'
import TabBar from '../components/common/TabBar'

interface Props {
  navigation: any
  route: any
}

const DetailScreen: React.FC<Props> = ({ navigation, route }) => {
  let scrollView: ScrollView | null = null
  const storeEventDetail = useSelector<StoreState, Event | undefined>((state) => state.eventDetail)

  const [eventDetail, setEventDetail] = React.useState(route.params?.event)
  const [update, setUpdate] = React.useState(false)
  const [replyPeople, setReplyPeople] = React.useState('')
  const [toastPosition, setToastPosition] = React.useState(88)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch({ type: GET_EVENT_DETAIL, id: route.params?.event.id })
    if (storeEventDetail) {
      setEventDetail(storeEventDetail)
    }
    initDetail()
  }, [route.params?.event.id])
  React.useEffect(() => {
    if (storeEventDetail) {
      setEventDetail(storeEventDetail)
    }
  }, [storeEventDetail])

  React.useEffect(() => {
    if (update) {
      dispatch({ type: GET_EVENT_DETAIL, id: eventDetail.id })
      if (storeEventDetail) {
        setEventDetail(storeEventDetail)
        initDetail()
        setUpdate(false)
      }
    }
  }, [update])

  const [detailY, setDetailY] = React.useState(0) // detail 区域的Y坐标，用于点击detail的功能
  const [participantsY, setParticipantsY] = React.useState(0) // participants 区域的Y坐标，用于点击participants的功能
  const [commentsY, setCommentsY] = React.useState(0) // comment 区域的Y坐标，用于点击comment的功能

  const token = useSelector<StoreState, string>((state) => state.loginInfo.token)

  async function initDetail() {
    const copyEventDetail = { ...eventDetail }
    const participantsData = await Api.getParticipants(token, eventDetail.id)
    copyEventDetail.participantsUsers =
      participantsData && participantsData.users ? participantsData.users : []
    const likesData = await Api.getLikes(token, eventDetail.id)
    copyEventDetail.likesUsers = likesData && likesData.users ? likesData && likesData.users : []
    const commentsData = await Api.getComments(token, eventDetail.id)
    copyEventDetail.comments = commentsData && commentsData.comments ? commentsData.comments : []

    setEventDetail(copyEventDetail)
  }
  const tabData = [
    { key: 'info', value: 'Detail' },
    { key: 'people', value: 'Participants' },
    { key: 'comment', value: 'Comments' },
  ]
  function onActiveChange(active: string) {
    const yAxis = new Map([
      ['info', detailY],
      ['people', participantsY],
      ['comment', commentsY],
    ])
    scrollView && scrollView.scrollTo({ y: yAxis.get(active) })
  }
  return (
    // <View style={styles.container}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header navigation={navigation}></Header>
      {/* 活动标题 信息 */}
      <View style={styles.eventInfo}>
        <Text style={[styles.channelName, styles.channelNameText]}>{eventDetail.channel.name}</Text>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
          {eventDetail.name}
        </Text>
        <View style={styles.flexRow}>
          <Image
            source={{ uri: eventDetail.creator.avatar }}
            defaultSource={require('../assets/images/user.png')}
            style={styles.avatar}
          />
          <View>
            <Text style={{ fontSize: 14, color: theme.TextDeepGray }}>
              {eventDetail.creator.username}
            </Text>
            <Text
              style={{ fontSize: 10, lineHeight: 16, color: theme.Disable }}
            >{`Published in ${timeFormat(eventDetail.create_time)}`}</Text>
          </View>
        </View>
      </View>
      {/* 详情 参与 评论查看栏  */}
      <TabBar tabData={tabData} initialActive={'info'} onActiveChange={onActiveChange} />
      <ScrollView
        ref={(view: ScrollView) => {
          scrollView = view
        }}
        onLayout={(event) => {
          setToastPosition(event.nativeEvent.layout.y)
        }}
      >
        <Details
          event={eventDetail}
          onLayout={(event) => {
            setDetailY(event.nativeEvent.layout.y)
          }}
        ></Details>
        <Participants
          participantsUsers={eventDetail.participantsUsers}
          likesUsers={eventDetail.likesUsers}
          onLayout={(event) => {
            setParticipantsY(event.nativeEvent.layout.y)
          }}
        />
        <Comments
          comments={eventDetail.comments}
          onLayout={(event) => {
            setCommentsY(event.nativeEvent.layout.y)
          }}
          replySomeone={() => setReplyPeople}
        />
      </ScrollView>
      <BottomOperator
        meLikes={eventDetail.me_likes}
        meGoing={eventDetail.me_going}
        eventId={eventDetail.id}
        updateEventDetail={() => setUpdate(true)}
        replyPeople={replyPeople}
        toastPosition={toastPosition + 47}
      ></BottomOperator>
      {/* </View> */}
    </KeyboardAvoidingView>
  )
}
export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventInfo: {
    padding: 19,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: theme.BorderPrimary,
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
    marginTop: 12,
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 25,
    color: theme.TextPrimary,
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 12,
    borderRadius: 36,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeGoing: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.BorderPrimary,
    backgroundColor: '#fff',
  },
  likes: {
    paddingRight: 18,
    marginRight: 18,
    borderRightWidth: 1,
    borderRightColor: theme.BorderPrimary,
  },
})
