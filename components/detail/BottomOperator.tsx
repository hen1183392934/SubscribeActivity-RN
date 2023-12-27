import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Icon from '../../assets/icons/icomoon'
import MyToast from '../common/MyToast'
import { Api } from '../../apis/Api'
import { useSelector } from 'react-redux'
import { StoreState } from '../../store/type'
import theme from '../../theme/defaultTheme'

interface Props {
  meLikes: boolean
  meGoing: boolean
  eventId: number
  toastPosition: number
  replyPeople?: string
  updateEventDetail: () => void
}

const BottomOperator: React.FC<Props> = ({
  meLikes = false,
  meGoing = false,
  eventId,
  toastPosition = 88,
  replyPeople = '',
  updateEventDetail,
}) => {
  const [commenting, setCommenting] = React.useState(false)
  const [commentText, setCommentText] = React.useState('')

  const token = useSelector<StoreState, string>((state) => state.loginInfo.token)
  const like = useSelector<StoreState, any>((state) => state.eventDetail?.me_likes)
  const going = useSelector<StoreState, any>((state) => state.eventDetail?.me_going)

  function postComment(comment: string) {
    if (comment) {
      Api.postComment(token, eventId, comment).then(() => {
        MyToast.success('Comment success!', toastPosition)
        setCommentText('')
        updateEventDetail()
      })
      setCommenting(false)
    }
  }
  function likeChange() {
    !like
      ? Api.postLikes(token, eventId).then(updateEventDetail)
      : Api.deleteLike(token, eventId).then(updateEventDetail)
  }
  function goingChange() {
    !going
      ? Api.postParticipants(token, eventId).then(updateEventDetail)
      : Api.deleteParticipant(token, eventId).then(updateEventDetail)
  }
  return (
    <View style={styles.container}>
      {commenting ? (
        <View style={[styles.container, styles.commentContainer]}>
          <TouchableOpacity style={styles.commentClose} onPress={() => setCommenting(false)}>
            <Icon name='cross' size={20} color={theme.Secondary} />
          </TouchableOpacity>
          <TextInput
            value={commentText}
            autoCapitalize='none'
            placeholder={replyPeople && `@${replyPeople}`}
            placeholderTextColor={theme.PrimaryLight}
            style={styles.commentText}
            onChangeText={(text) => setCommentText(text)}
          ></TextInput>
          <TouchableOpacity
            style={[
              styles.goingBut,
              {
                width: 64,
                height: 56,
                backgroundColor: commentText ? theme.Secondary : theme.Disable,
              },
            ]}
            disabled={commentText ? false : true}
            onPress={() => {
              postComment(commentText)
            }}
          >
            <Icon name='send' size={28} color={theme.Primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={[styles.commentContainer, styles.likeGoingContainer]}>
            <TouchableOpacity onPress={() => setCommenting(true)}>
              <Icon name='comment-single' size={24} color={theme.TextPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => likeChange()}>
              <Icon
                name={like ? 'like' : 'like-outline'}
                size={24}
                color={like ? theme.Secondary : theme.TextPrimary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.goingBut} onPress={() => goingChange()}>
            <Icon
              name={going ? 'check' : 'check-outline'}
              size={24}
              color={going ? theme.Primary : theme.TextPrimary}
            />
            <Text style={{ marginLeft: 14, fontSize: 14, color: theme.Primary }}>I am going</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
export default BottomOperator

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
  },
  commentContainer: {
    alignItems: 'center',
    backgroundColor: theme.Primary,
  },
  likeGoingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  goingBut: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.Secondary,
  },
  commentText: {
    flex: 1,
    height: 32,
    marginRight: 14,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  commentClose: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
