import { AuthProvider } from '../../context/AuthContext';
import { I18nextProvider } from '../../services/i18n';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <I18nextProvider>
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
