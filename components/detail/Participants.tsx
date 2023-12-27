import * as React from 'react'
import { View, StyleSheet, LayoutChangeEvent } from 'react-native'
import { User } from '../../store/type'
import Users from './Users'

interface Props {
  participantsUsers: User[]
  likesUsers: []
  onLayout: ((event: LayoutChangeEvent) => void) | undefined
}
const Participants: React.FC<Props> = ({ participantsUsers = [], likesUsers = [], onLayout }) => {
  return (
    <View onLayout={onLayout}>
      <Users
        icon='check-outline'
        total={participantsUsers.length}
        name='going'
        users={participantsUsers}
      ></Users>
      <Users icon='like-outline' total={likesUsers.length} name='likes' users={likesUsers}></Users>
    </View>
  )
}
export default Participants
