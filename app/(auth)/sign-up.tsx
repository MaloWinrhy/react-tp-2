import * as React from 'react'
import { Toast } from '@/components/Toast';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

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

export default function SignUpScreen() {
  const [toast, setToast] = React.useState<{ message: string; type?: 'success' | 'error'; visible: boolean }>({ message: '', type: 'error', visible: false });
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    if (!emailAddress && !password) {
      setToast({ message: 'Adresse email et mot de passe requis', type: 'error', visible: true });
      setTimeout(() => setToast({ ...toast, visible: false }), 2000);
      return;
    }
    if (!emailAddress) {
      setToast({ message: 'Adresse email requise', type: 'error', visible: true });
      setTimeout(() => setToast({ ...toast, visible: false }), 2000);
      return;
    }
    if (!password) {
      setToast({ message: 'Mot de passe requis', type: 'error', visible: true });
      setTimeout(() => setToast({ ...toast, visible: false }), 2000);
      return;
    }
    try {
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
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

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        setToast({ message: 'Mauvais identifiant', type: 'error', visible: true });
        setTimeout(() => setToast({ ...toast, visible: false }), 2000);
      }
    } catch (err: any) {
      setToast({ message: 'Erreur inconnue', type: 'error', visible: true });
      setTimeout(() => setToast({ ...toast, visible: false }), 2000);
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Vérifie ton email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Code de vérification"
          onChangeText={setCode}
        />
        <PrimaryButton label="Vérifier" onPress={onVerifyPress} style={{ marginBottom: 16, width: 260 }} />
        <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
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
      <PrimaryButton label="Continuer" onPress={onSignUpPress} style={{ marginBottom: 16, width: 260 }} />
      <View style={styles.linkRow}>
        <Text>Déjà un compte ?</Text>
        <Link href="/sign-in">
          <Text style={styles.linkText}>Connexion</Text>
        </Link>
      </View>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </View>
  )
}