const colors = {
  orange: 'rgb(241, 100, 50)',
  lightGreen: 'rgb(245, 255, 247)',
  blue: 'rgb(20, 127, 215)',
  purple: 'rgb(134, 41, 140)',
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

export default {
  fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;',
  colors,
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
    }
  }
}
