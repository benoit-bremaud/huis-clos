import { AuthProvider } from '../context/AuthContext';
import { I18nextProvider } from 'react-i18next';
import { Stack } from 'expo-router';
import i18n from '../services/i18n';

export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="auth/login"
            options={{
              title: 'Login'
            }}
          />
          <Stack.Screen
            name="auth/register"
            options={{
              title: 'Register'
            }}
          />
        </Stack>
      </AuthProvider>
    </I18nextProvider>
  );
}
