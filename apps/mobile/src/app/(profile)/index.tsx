import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileResponse, profileApi } from '../../services/api/profile';
import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';

import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await profileApi.getProfile('me');
      setProfile(data);
    } catch {
      setError(t('profile.error'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile]),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile?.username?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>
        <Text style={styles.username}>{profile?.username}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>{t('profile.about')}</Text>
        <Text style={styles.bio}>{profile?.bio || t('profile.noBio')}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>{t('profile.preferredLanguage')}</Text>
        <Text style={styles.language}>{profile?.preferredLanguage || 'English'}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push('/(profile)/edit')}
      >
        <Text style={styles.editButtonText}>{t('profile.edit')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  bio: {
    fontSize: 16,
    color: '#333',
  },
  language: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});
