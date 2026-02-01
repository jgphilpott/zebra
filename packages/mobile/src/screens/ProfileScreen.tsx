import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Race, Gender } from '@zebra/shared';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState<Race | null>(null);
  const [gender, setGender] = useState<Gender | null>(null);
  const [bio, setBio] = useState('');

  const handleSave = () => {
    if (!name || !age || !race || !gender) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Profile saved successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Age *</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Race *</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                race === Race.BLACK && styles.selectedOption,
              ]}
              onPress={() => setRace(Race.BLACK)}
            >
              <Text
                style={[
                  styles.optionText,
                  race === Race.BLACK && styles.selectedOptionText,
                ]}
              >
                Black
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                race === Race.WHITE && styles.selectedOption,
              ]}
              onPress={() => setRace(Race.WHITE)}
            >
              <Text
                style={[
                  styles.optionText,
                  race === Race.WHITE && styles.selectedOptionText,
                ]}
              >
                White
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Gender *</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                gender === Gender.MALE && styles.selectedOption,
              ]}
              onPress={() => setGender(Gender.MALE)}
            >
              <Text
                style={[
                  styles.optionText,
                  gender === Gender.MALE && styles.selectedOptionText,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                gender === Gender.FEMALE && styles.selectedOption,
              ]}
              onPress={() => setGender(Gender.FEMALE)}
            >
              <Text
                style={[
                  styles.optionText,
                  gender === Gender.FEMALE && styles.selectedOptionText,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
