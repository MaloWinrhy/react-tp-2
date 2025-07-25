import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { PrimaryButton } from './PrimaryButton'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    try {
      await signOut()
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <PrimaryButton onPress={handleSignOut} label="Sign out" variant='danger' />
  )
}
