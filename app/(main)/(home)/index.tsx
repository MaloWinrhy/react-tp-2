import { useRouter, Link } from 'expo-router'
import { View, Text } from 'react-native'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { SignOutButton } from '@/components/buttons/SignOutButton'
import { MealList, Meal } from '@/components/MealList/MealList'
import { AddMealButton } from '@/components/AddMealButton/AddMealButton'
import { styles } from '@/components/MealList/styles'

const meals: Meal[] = [
  { id: '1', name: 'Poulet rôti', calories: 520 },
  { id: '2', name: 'Salade César', calories: 340 },
  { id: '3', name: 'Pâtes Bolognaise', calories: 610 },
]

export const unstable_settings = {
  title: 'Accueil',
};

export default function Page() {
  const router = useRouter()
  const { user } = useUser()

  const handleMealPress = (id: string) => {
    router.push(`/home/${id}`)
  }

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#fff' }}>
      <SignedIn>
        <Text style={styles.header}>Bonjour {user?.emailAddresses[0].emailAddress}</Text>
        <MealList meals={meals} onMealPress={handleMealPress} />
        <AddMealButton onPress={() => router.push('/add')} />
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}