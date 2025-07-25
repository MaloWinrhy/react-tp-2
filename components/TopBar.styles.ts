import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const topBarStyles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  hello: { fontSize: 16, color: Colors.light.tabIconDefault },
  username: { fontSize: 22, fontWeight: 'bold', color: Colors.light.text },
  avatarCircle: {
    width: 42,
    height: 42,
    backgroundColor: Colors.light.background,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
    textAlign: 'center',
  },
});

export default topBarStyles;
