import Toast from 'react-native-root-toast'
import theme from '../../theme/defaultTheme'

/**
 * 封装toast提示
 * @param {string} toastText  提示内容
 * @param {number} position 提示显示位置
 */
const myToast = {
  success(toastText: string, position: number): void {
    Toast.show(toastText, {
      shadow: false,
      position: position,
      textColor: theme.Primary,
      containerStyle: { width: '100%' },
      backgroundColor: theme.Secondary,
    })
  },
  error(toastText: string, position: number): void {
    Toast.show(toastText, {
      shadow: false,
      position: position,
      textColor: '#000',
      containerStyle: { width: '100%' },
      backgroundColor: 'red',
    })
  },
  warn(toastText: string, position: number): void {
    Toast.show(toastText, {
      shadow: false,
      position: position,
      textColor: theme.TextDeepGray,
      containerStyle: { width: '100%' },
      backgroundColor: 'yellow',
    })
  },
}
export default myToast
