import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: {
    desc: 'FIND THE MOST LOVED ACTIVITIES',
    appName: 'BLACK CAT',
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    login: 'SIGN IN'
  },
  zh: {
    desc: '寻找最喜欢的活动',
    appName: '黑猫',
    usernamePlaceholder: '用户名',
    passwordPlaceholder: '密码',
    login: '登录'
  }
}
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true
export default i18n