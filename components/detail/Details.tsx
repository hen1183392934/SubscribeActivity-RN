import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, LayoutChangeEvent } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '../../assets/icons/icomoon'
import MapView from 'react-native-maps'
import { Event } from '../../store/type'
import { englishMonths } from '../../store/utils'
import theme from '../../theme/defaultTheme'

interface Props {
  event: Event
  onLayout: (event: LayoutChangeEvent) => void
}

const Details: React.FC<Props> = ({ event, onLayout }) => {
  const [viewAll, setViewAll] = useState(false)
  const [textOverArea, setTextOverArea] = useState(false)
  const beginDate = new Date(event.begin_time)
  const endDate = new Date(event.end_time)
  return (
    <View style={[styles.container, styles.borderBottom]} onLayout={onLayout}>
      {/* 内容 */}
      <View style={[styles.contentBox, styles.borderBottom]}>
        {event.images.length > 0 ? (
          <ScrollView
            style={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {event.images.map((uri) => {
              return (
                <Image
                  key={uri}
                  source={{ uri }}
                  defaultSource={require('../../assets/images/no-picture.png')}
                  style={styles.eventImage}
                />
              )
            })}
          </ScrollView>
        ) : null}
        <View style={{ height: !viewAll && textOverArea ? 180 : 'auto', overflow: 'hidden' }}>
          <Text
            style={styles.content}
            onLayout={(e) => {
              const textHeight = e.nativeEvent.layout.height
              setTextOverArea(textHeight > 160)
            }}
          >
            {event.description}
          </Text>
          {!viewAll && textOverArea ? (
            <LinearGradient
              colors={[
                'rgba(250, 249, 252, 0)',
                'rgba(250, 249, 252, 0.7)',
                'rgba(250, 255, 255, 1)',
              ]}
              style={styles.viewAllBg}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <TouchableOpacity style={styles.viewAllBut} onPress={() => setViewAll(true)}>
                <Text style={styles.viewAllText}>VIEW ALL</Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : null}
        </View>
      </View>
      {/* when */}
      <View style={[styles.paddingPrimary, styles.borderBottom]}>
        <View style={styles.subTitBox}>
          <View style={styles.subTitLeft}></View>
          <Text style={styles.subTit}>When</Text>
        </View>
        <View style={styles.when}>
          {[beginDate, endDate].map((date, i) => {
            return (
              <View key={i} style={[styles.dateBox, i < 1 && styles.borderRight]}>
                <View style={styles.date}>
                  <Icon name={i ? 'date-to' : 'date-from'} size={16} color={theme.Secondary} />
                  <Text style={styles.dateText}>{`${date.getDate()} ${
                    englishMonths[date.getMonth()]
                  } ${date.getFullYear()}`}</Text>
                </View>
                <View style={styles.time}>
                  <Text style={styles.timeText}>
                    {`${date.getHours()}:${date.getMinutes() >= 10 ? '' : '0'}${date.getMinutes()}`}{' '}
                  </Text>
                  <Text style={styles.timeUnit}>{date.getHours() <= 12 ? 'am' : 'pm'}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
      {/* where */}
      <View style={styles.paddingPrimary}>
        <View style={styles.subTitBox}>
          <View style={styles.subTitLeft}></View>
          <Text style={styles.subTit}>Where</Text>
        </View>
        <Text style={styles.locationText}>{event.location}</Text>
        <Text style={styles.locationDetail}>{event.location_detail}</Text>
        <MapView
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapView}
        />
      </View>
    </View>
  )
}
export default Details

const styles = StyleSheet.create({
  container: { flex: 1 },
  paddingPrimary: { padding: 16 },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.BorderPrimary,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: theme.BorderPrimary,
  },
  contentBox: { paddingTop: 16, paddingBottom: 20 },
  scrollView: {
    height: 100,
    marginBottom: 16,
    marginLeft: 16,
    flexDirection: 'row',
  },
  eventImage: {
    width: 180,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  content: {
    marginHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
    color: theme.TextDeepGray,
  },
  viewAllBg: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 57,
    paddingRight: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderWidth: 0,
  },
  viewAllBut: {
    height: 24,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: theme.Secondary,
  },
  viewAllText: {
    fontSize: 10,
    color: theme.TextDeepGray,
  },
  subTitBox: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  subTitLeft: {
    width: 4,
    height: 18,
    marginRight: 6,
    borderTopStartRadius: 2,
    borderTopEndRadius: 2,
    borderBottomStartRadius: 2,
    borderBottomEndRadius: 2,
    backgroundColor: theme.Primary,
  },
  subTit: {
    fontSize: 16,
    color: theme.Primary,
  },
  when: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateBox: { flex: 1, alignItems: 'center' },
  date: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    marginLeft: 5,
    color: theme.TextDeepGray,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 32,
    lineHeight: 54,
    color: theme.TextGreen,
  },
  timeUnit: {
    fontSize: 12,
    lineHeight: 26,
    color: theme.TextGreen,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    color: theme.TextDeepGray,
  },
  locationDetail: { fontSize: 14, color: theme.TextDeepGray },
  mapView: {
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
})
