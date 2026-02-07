import { Image as ExpoImage } from 'expo-image';
import { useState } from 'react';
import { Linking, Image as RNImage, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const getImageSources = () => [
  require('@/assets/images/michael-schlierf-1.jpg'),
  require('@/assets/images/michael-schlierf-2.jpg'),
  require('@/assets/images/michael-schlierf-3.jpg'),
  require('@/assets/images/michael-schlierf-4.jpg'),
];

export default function HomeScreen() {
  const [showRNImage, setShowRNImage] = useState(false);
  const [showExpoImage, setShowExpoImage] = useState(false);
  const [imageSources, setImageSources] = useState<ReturnType<typeof getImageSources> | null>(null);

  const loadImages = () => {
    if (!imageSources) {
      setImageSources(getImageSources());
    }
  };

  const handleRNImageToggle = (value: boolean) => {
    if (value) loadImages();
    setShowRNImage(value);
  };

  const handleExpoImageToggle = (value: boolean) => {
    if (value) loadImages();
    setShowExpoImage(value);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Image Comparison</ThemedText>

      <View style={{ padding: 10, backgroundColor: '#e0e0e0', borderRadius: 8, marginBottom: 30 }}>
        <Text>Images by Michael Schlierf</Text>
        <Text onPress={() => {
          Linking.openURL('https://www.pexels.com/@michael-schlierf-757699958/').catch(() => {});
        }}>https://www.pexels.com/@michael-schlierf-757699958/</Text>
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>RN Image:</ThemedText>
        <Switch value={showRNImage} onValueChange={handleRNImageToggle} />
        <ScrollView horizontal style={[styles.imageContainer]}>
          {showRNImage && imageSources && (
            <>
              <RNImage source={imageSources[0]} style={styles.image} resizeMode="contain" />
              <RNImage source={imageSources[1]} style={styles.image} resizeMode="contain" />
              <RNImage source={imageSources[2]} style={styles.image} resizeMode="contain" />
              <RNImage source={imageSources[3]} style={styles.image} resizeMode="contain" />
            </>
          )}
        </ScrollView>
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>Expo Image:</ThemedText>
        <Switch value={showExpoImage} onValueChange={handleExpoImageToggle} />
        <ScrollView horizontal style={[styles.imageContainer]}>
          {showExpoImage && imageSources && (
            <>
              <ExpoImage source={imageSources[0]} style={styles.image} contentFit="contain" />
              <ExpoImage source={imageSources[1]} style={styles.image} contentFit="contain" />
              <ExpoImage source={imageSources[2]} style={styles.image} contentFit="contain" />
              <ExpoImage source={imageSources[3]} style={styles.image} contentFit="contain" />
            </>
          )}
        </ScrollView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: 100,
  },
  imageContainer: {
    flex: 1,
    height: 200,
    marginLeft: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  image: {
    width: 180,
    height: 180,
  },
});
