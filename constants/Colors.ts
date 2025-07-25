const green = '#34C759';
const orange = '#FFA500';
const darkText = '#222';
const lightBackground = '#F8F8F8';
const cardBackground = '#E8F5E9';
const cardTitle = '#388E3C';
const statBackground = '#FFF3E0';
const statText = '#333';
const helloText = '#999';
const usernameText = '#111';
const shadowColor = '#000';
const tintColorLight = green;
const tintColorDark = '#fff';

export default {
  light: {
    text: darkText,
    background: lightBackground,
    tint: green,
    tabIconDefault: orange,
    tabIconSelected: green,
    cardBackground: cardBackground,
    cardTitle: cardTitle,
    cardSub: darkText,
    actionBackground: '#fff',
    actionText: statText,
    statBackground: statBackground,
    statText: statText,
    avatarBackground: cardBackground,
    helloText: helloText,
    usernameText: usernameText,
    shadowColor: shadowColor,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: orange,
    tabIconSelected: tintColorDark,
    cardBackground: darkText,
    cardTitle: '#fff',
    cardSub: '#fff',
    actionBackground: statText,
    actionText: '#fff',
    statBackground: statText,
    statText: '#fff',
    avatarBackground: darkText,
    helloText: '#ccc',
    usernameText: '#fff',
    shadowColor: '#fff',
  },
};
