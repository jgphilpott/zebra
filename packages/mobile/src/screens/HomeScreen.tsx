import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🦓 Zebra</Text>
        <Text style={styles.subtitle}>
          Where Black and White Hearts Meet
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Setup Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Matching')}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              Start Matching
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Zebra connects people across racial lines:
          </Text>
          <Text style={styles.bulletPoint}>• Black women ↔ White men</Text>
          <Text style={styles.bulletPoint}>• Black men ↔ White women</Text>
          <Text style={styles.bulletPoint}>• White women ↔ Black men</Text>
          <Text style={styles.bulletPoint}>• White men ↔ Black women</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  primaryButtonText: {
    color: '#fff',
  },
  infoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  bulletPoint: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
  },
});
