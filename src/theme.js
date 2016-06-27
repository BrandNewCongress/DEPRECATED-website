import { onMobile, onDesktop } from './media-queries'

const colors = {
  orange: 'rgb(255, 102, 0)',
  lightGreen: 'rgb(245, 255, 247)',
  blue: 'rgb(20, 127, 215)',
  purple: 'rgb(102, 0, 153)',
  lightBlue: 'rgb(196, 223, 245)',
  darkBlue: 'rgb(13, 81, 139)',
  red: 'rgb(245, 91, 91)',
  lightRed: 'rgb(255, 141, 141)',
  darkRed: 'rgb(237, 60, 57)',
  green: 'rgb(83, 180, 119)',
  darkGreen: 'rgb(24, 154, 52)',
  darkGray: 'rgb(54, 67, 80)',
  gray: 'rgb(153, 155, 158)',
  veryLightGray: 'rgb(240, 242, 240)',
  lightGray: 'rgb(225, 228, 224)',
  white: 'rgb(255,255,255)'
}

const defaultFont = 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif'

const text = {
  link: {
    fontWeight: 400,
    color: colors.darkGray,
    textDecoration: 'none',
    borderBottom: `1px solid ${colors.orange}`,
    ':hover': {
      borderBottom: 0,
      color: colors.orange
    },
    'a:visited': {
      fontWeight: 400,
      color: colors.darkGray,
      textDecoration: 'none'
    },
    fontFamily: defaultFont
  },
  body: {
    fontWeight: 300,
    color: colors.darkGray,
    fontSize: 18,
    [onMobile]: {
      fontSize: 14
    },
    fontFamily: defaultFont
  },
  header: {
    fontWeight: 600,
    display: 'block',
    paddingBottom: 10,
    fontSize: 30,
    [onMobile]: {
      fontSize: 25
    },
    fontFamily: defaultFont,
    color: colors.darkGray
  }
}

const singleColumnLayout = {
  maxWidth: 1024,
  marginLeft: 'auto',
  marginRight: 'auto'
}

const layouts = {
  singleColumn: singleColumnLayout,
  multiColumn: {
    container: {
      ...singleColumnLayout,
      display: 'flex',
      [onDesktop]: {
        flexDirection: 'row'
      },
      [onMobile]: {
        flexDirection: 'column'
      }
    },
    flexColumn: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column'
    }
  }
}

export default {
  colors,
  text,
  layouts
}
