import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function ProfileLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t('profile.title'),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: t('profile.title'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: t('profile.editTitle'),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
