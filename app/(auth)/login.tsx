import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import React from 'react'
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { Toast } from '@/components/Toast';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
  },
  input: {
    width: 260,
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#007AFF',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default function Page() {
  const [toast, setToast] = React.useState<{ message: string; type?: 'success' | 'error'; visible: boolean }>({ message: '', type: 'error', visible: false });
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        setToast({ message: 'Mauvais identifiant', type: 'error', visible: true });
        setTimeout(() => setToast({ ...toast, visible: false }), 2000);
      }
    } catch (err: any) {
      let showError = false;
      if (err && err.errors && Array.isArray(err.errors)) {
        for (const e of err.errors) {
          if (
            e.code === 'form_identifier_not_found' ||
            e.code === 'form_password_incorrect' ||
            e.code === 'form_param_nil' ||
            e.code === 'form_conditional_param_missing'
          ) {
            showError = true;
            break;
          }
        }
      }
      setToast({ message: showError ? 'Mauvais identifiant' : 'Erreur inconnue', type: 'error', visible: true });
      setTimeout(() => setToast({ ...toast, visible: false }), 2000);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Mot de passe"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <PrimaryButton label="Continuer" onPress={onSignInPress} style={{ marginBottom: 16, width: 260 }} />
      <PrimaryButton label="Inscription" onPress={() => router.replace('/sign-up')} variant="secondary" style={{ marginBottom: 16, width: 260 }} />
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </View>
  )
}