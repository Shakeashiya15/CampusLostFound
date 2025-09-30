import React, { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, ImageBackground, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
//////////////////
// Navigation types
type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  HomeTabs: undefined;
};

type RegistrationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Registration">;
type RegistrationScreenProps = { navigation: RegistrationScreenNavigationProp };

const { width, height } = Dimensions.get("window");

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
  { label: "Arabic", value: "ar" },
  { label: "Hindi", value: "hi" },
];

export default function RegistrationScreen({ navigation }: RegistrationScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    preferredLanguage: "en",
    voiceSupport: false,
    acceptTerms: false,
  });

  const [privacyPreferences, setPrivacyPreferences] = useState({
    profileType: "transparent",
    dataStorage: "encrypted",
    participation: "non-anonymous",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: "" });
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  // Validation
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile: string) => /^\+?[1-9]\d{1,14}$/.test(mobile);

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let feedback = "";
    if (!password) return { score: 0, feedback: "" };
    if (password.length < 6) return { score: 1, feedback: "Too short" };
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    feedback = score <= 2 ? "Weak" : score === 3 ? "Fair" : score === 4 ? "Good" : "Strong";
    return { score, feedback };
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "password" && typeof value === "string") setPasswordStrength(calculatePasswordStrength(value));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const toggleVoiceSupport = () => handleInputChange("voiceSupport", !formData.voiceSupport);
  const toggleAcceptTerms = () => handleInputChange("acceptTerms", !formData.acceptTerms);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email";
    if (formData.mobileNumber && !validateMobile(formData.mobileNumber)) newErrors.mobileNumber = "Invalid mobile number";
    if (!formData.password) newErrors.password = "Password required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.acceptTerms) newErrors.acceptTerms = "Accept terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 2000));
      Alert.alert("Success", "Account created!", [{ text: "OK", onPress: () => navigation.navigate("Login") }]);
    } catch {
      Alert.alert("Error", "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "#e74c3c";
      case 2:
        return "#f39c12";
      case 3:
        return "#f1c40f";
      case 4:
      case 5:
        return "#27ae60";
      default:
        return "#bdc3c7";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{ uri: "https://i.ibb.co/6vD7n3K/bg.jpg" }} style={styles.background}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoid}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.registerBox}>
              <Text style={styles.title}>Join Our Community</Text>

              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} />
                <TextInput placeholder="Full Name" style={styles.input} value={formData.fullName} onChangeText={v => handleInputChange("fullName", v)} />
              </View>
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

              <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.registerButtonText}>Register</Text>}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 40 },
  registerBox: { width: width * 0.9, backgroundColor: "#fff", borderRadius: 20, padding: 30, elevation: 15 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputWrapper: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 12, paddingHorizontal: 10, height: 50, marginBottom: 10 },
  input: { flex: 1 },
  registerButton: { backgroundColor: "#27ae60", borderRadius: 12, height: 50, justifyContent: "center", alignItems: "center", marginTop: 10 },
  registerButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 12 },
});

// ---------------------------
// Wrap in NavigationContainer
const Stack = createNativeStackNavigator<RootStackParamList>();
export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
