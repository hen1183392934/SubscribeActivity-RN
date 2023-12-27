import * as React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, LayoutChangeEvent } from 'react-native'
import Icon from '../../assets/icons/icomoon'
import { User, EventComment } from '../../store/type'
import { timeFormat } from '../../store/utils'
import theme from '../../theme/defaultTheme'

interface Props {
  comments: EventComment[]
  onLayout: ((event: LayoutChangeEvent) => void) | undefined
  replySomeone: () => void
}

const Comments: React.FC<Props> = ({ comments = [], onLayout, replySomeone }) => {
  return (
    <View style={styles.container} onLayout={onLayout}>
      {comments.map((comment) => {
        return (
          <View key={comment.id} style={styles.comment}>
            <Image source={{ uri: comment.user.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.userAndTime}>
                <Text style={styles.username}>{comment.user.username}</Text>
                <Text style={styles.createTime}>{timeFormat(comment.create_time)}</Text>
              </View>
              <Text style={styles.commentText}>{comment.comment}</Text>
            </View>
            <TouchableOpacity style={styles.reply} onPress={() => replySomeone}>
              <Icon name='reply' size={16} color={theme.Secondary} />
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}
export default Comments

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 15,
  },
  comment: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 32,
  },
  userAndTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  username: {
    marginRight: 12,
    fontSize: 12,
    color: theme.Primary,
  },
  createTime: {
    fontSize: 10,
    color: theme.Disable,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 25,
    color: theme.TextDeepGray,
  },
  reply: {
    marginLeft: 8,
  },
})
