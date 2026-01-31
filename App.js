import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_WIDTH = (width - 40) / COLUMN_COUNT;
// Replace with your actual Render backend URL
const BACKEND_URL = 'https://docsnap-backend.onrender.com';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter(img => img.uri !== uri));
  };

  const generatePDF = async () => {
    if (images.length === 0) {
      Alert.alert('No Images', 'Please select at least one image to convert to PDF.');
      return;
    }

    setLoading(true);
    try {
      // Convert images to base64 to ensure they render correctly in the PDF
      const processedImages = await Promise.all(
        images.map(async (img) => {
          try {
            const base64 = await FileSystem.readAsStringAsync(img.uri, {
              encoding: 'base64',
            });
            // Simple mime type detection
            const mimeType = img.uri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
            return `data:${mimeType};base64,${base64}`;
          } catch (e) {
            console.warn('Failed to convert image to base64:', img.uri, e);
            return null;
          }
        })
      );

      // Filter out any failed conversions
      const validImages = processedImages.filter(img => img !== null);

      if (validImages.length === 0) {
        throw new Error('No valid images to generate PDF');
      }

      // Create HTML content with images
      let htmlContent = `
        <html>
          <body style="margin: 0; padding: 0;">
            ${validImages.map(src => `
              <div style="page-break-after: always; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <img src="${src}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
              </div>
            `).join('')}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });

      setLoading(false);
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to generate PDF. Please try again.');
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeImage(item.uri)}
      >
        <Ionicons name="close-circle" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Image2PDF</Text>
        <Text style={styles.subtitle}>Convert Images to PDF instantly</Text>
      </View>

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.uri}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="images-outline" size={80} color="#4A4A6A" />
            <Text style={styles.emptyText}>No images selected yet</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <Ionicons name="add-circle-outline" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Add Images</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.generateButton, images.length === 0 && styles.disabledButton]}
          onPress={generatePDF}
          disabled={loading || images.length === 0}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="document-text-outline" size={24} color="#FFF" />
              <Text style={styles.buttonText}>Generate PDF</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep dark slate
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  listContent: {
    padding: 10,
    paddingBottom: 100,
  },
  imageContainer: {
    margin: 5,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 18,
    marginTop: 16,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  pickButton: {
    flex: 1,
    backgroundColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 16,
    marginRight: 10,
  },
  generateButton: {
    flex: 1.5,
    backgroundColor: '#6366F1', // Indigo premium
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 16,
  },
  disabledButton: {
    backgroundColor: '#1E293B',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
