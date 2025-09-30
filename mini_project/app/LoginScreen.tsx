import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native"; 
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width, height } = Dimensions.get("window");

// ✅ Navigation types
type RootStackParamList = {
  Login: undefined;
  RegistrationScreen: undefined;
  HomeTabs: undefined;
  Openpage: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation?: LoginScreenNavigationProp;
}

// ✅ Form and error types
interface FormData {
  emailOrUsername: string;
  password: string;
  mfaCode: string;
  rememberMe: boolean;
}
type Errors = Partial<Record<keyof FormData, string>>;

export default function LoginScreen({ navigation: propNavigation }: Props) {
  // Use the navigation hook as a fallback
  const hookNavigation = useNavigation<LoginScreenNavigationProp>();
  const navigation = propNavigation || hookNavigation;

  // Initialize state with proper defaults
  const [formData, setFormData] = useState<FormData>({
    emailOrUsername: "",
    password: "",
    mfaCode: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // Validation functions
  const validateEmail = useCallback((email: string) => {
    if (!email || typeof email !== "string") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Errors = {};

    const emailOrUsername = formData.emailOrUsername || "";
    const password = formData.password || "";
    const mfaCode = formData.mfaCode || "";

    if (!emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email or Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (showMFA) {
      if (!mfaCode) {
        newErrors.mfaCode = "MFA code is required";
      } else if (mfaCode.length !== 6) {
        newErrors.mfaCode = "MFA code must be 6 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, showMFA]);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value || "",
      }));

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    },
    []
  );

  const handleMFACodeChange = useCallback(
    (value: string) => {
      const numericValue = (value || "").replace(/\D/g, "").slice(0, 6);
      handleInputChange("mfaCode", numericValue);
    },
    [handleInputChange]
  );

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const emailOrUsername = formData.emailOrUsername;

      if (!showMFA && emailOrUsername.toLowerCase().includes("mfa")) {
        setShowMFA(true);
        setIsLoading(false);
        Alert.alert(
          "MFA Required",
          "Please enter your 6-digit authentication code"
        );
        return;
      }

      Alert.alert("Success", `Welcome back, ${emailOrUsername}!`, [
        {
          text: "Continue",
          onPress: () => {
            if (navigation && typeof navigation.navigate === "function") {
              // navigation.navigate("CommunitySelection");
            }
          },
        },
      ]);

      setFormData({
        emailOrUsername: "",
        password: "",
        mfaCode: "",
        rememberMe: false,
      });
      setShowMFA(false);
      setErrors({});
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [formData, showMFA, validateForm, navigation]);

  const handleForgotPassword = useCallback(() => {
    Alert.alert(
      "Reset Password",
      "Enter your email address to receive password reset instructions",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Reset Link",
          onPress: () =>
            Alert.alert("Reset Link Sent", "Check your email for reset instructions"),
        },
      ]
    );
  }, []);

  const toggleRememberMe = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: !prev.rememberMe,
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleRegisterNavigation = useCallback(() => {
    try {
      if (navigation && typeof navigation.navigate === "function") {
        navigation.navigate("RegistrationScreen");
      } else {
        Alert.alert("Navigation Error", "Unable to navigate to registration.");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [navigation]);

  const { emailOrUsername, password, mfaCode, rememberMe } = formData;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: "https://i.ibb.co/6vD7n3K/bg.jpg" }}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.loginBox}>
              <View style={styles.header}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>
                  Sign in to access your communities
                </Text>
              </View>

              <View style={styles.form}>
                {/* Email/Username Input */}
                <View style={styles.inputContainer}>
                  <View
                    style={[
                      styles.inputWrapper,
                      errors?.emailOrUsername && styles.inputError,
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Email or Username"
                      placeholderTextColor="#999"
                      style={styles.input}
                      value={emailOrUsername}
                      onChangeText={(value) =>
                        handleInputChange("emailOrUsername", value)
                      }
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                    />
                  </View>
                  {errors?.emailOrUsername && (
                    <Text style={styles.errorText}>{errors.emailOrUsername}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <View
                    style={[
                      styles.inputWrapper,
                      errors?.password && styles.inputError,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#999"
                      style={styles.input}
                      value={password}
                      onChangeText={(value) => handleInputChange("password", value)}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={togglePasswordVisibility}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors?.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* MFA Code Input */}
                {showMFA && (
                  <View style={styles.inputContainer}>
                    <View
                      style={[
                        styles.inputWrapper,
                        errors?.mfaCode && styles.inputError,
                      ]}
                    >
                      <Ionicons
                        name="shield-checkmark-outline"
                        size={20}
                        color="#666"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        placeholder="6-digit MFA Code"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={mfaCode}
                        onChangeText={handleMFACodeChange}
                        keyboardType="numeric"
                        maxLength={6}
                      />
                    </View>
                    {errors?.mfaCode && (
                      <Text style={styles.errorText}>{errors.mfaCode}</Text>
                    )}
                  </View>
                )}

                {/* Remember Me */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={toggleRememberMe}
                >
                  <View
                    style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Remember me</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  style={[styles.loginButton, isLoading && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.loginButtonText}>Sign In</Text>
                  )}
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity
                  onPress={handleForgotPassword}
                  style={styles.forgotPasswordContainer}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot your password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={styles.registerPrompt}>
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={handleRegisterNavigation}>
                  <Text style={styles.registerLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

// ✅ styles unchanged
const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loginBox: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  header: { alignItems: "center", marginBottom: 30 },
  title: { fontSize: 32, fontWeight: "bold", color: "#2c3e50", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#7f8c8d", textAlign: "center", lineHeight: 22 },
  form: { marginBottom: 20 },
  inputContainer: { marginBottom: 20 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e1e8ed",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    height: 55,
  },
  inputError: { borderColor: "#e74c3c" },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#2c3e50", paddingVertical: 0 },
  eyeIcon: { padding: 5 },
  errorText: { color: "#e74c3c", fontSize: 12, marginTop: 5, marginLeft: 5 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: "#3498db" },
  checkboxLabel: { fontSize: 14, color: "#555" },
  loginButton: {
    backgroundColor: "#27ae60",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonDisabled: { backgroundColor: "#95a5a6" },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  forgotPasswordContainer: { alignItems: "center" },
  forgotPasswordText: { color: "#3498db", fontSize: 14, fontWeight: "500" },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
  registerPrompt: { color: "#7f8c8d", fontSize: 14 },
  registerLink: { color: "#3498db", fontSize: 14, fontWeight: "600" },
});
