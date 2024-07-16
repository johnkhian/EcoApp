import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

const logo = require("./assets/logo.png");

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
      try {
        const user = 'username'; // Replace with the username input field value
        const pass = 'password'; // Replace with the password input field value
    
        const formData = new FormData();
        formData.append('username', user);
        formData.append('password', pass);
    
        const response = await fetch('http://localhost/api/login.php', {
          method: 'POST',
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          setIsLoggedIn(true);
          navigation.navigate('Dashboard'); // Navigate to the Dashboard screen
          Alert.alert("Login Successful!", "Welcome back!");
        } else {
          Alert.alert("Login Failed", "Invalid username or password");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Login Failed", "An error occurred while logging in");
      }
    };

    const handleSignUp = async () => {
        const url = 'http://localhost/api/signup.php'; 
      
        try {
          const response = await axios.post(url, {
            username,
            password,
          });
      
          console.log('Response:', response.data);
      
          if (response.status === 201) {
            Alert.alert('Success', 'Sign Up Successful');
          } else {
            Alert.alert('Error', 'Sign Up Failed');
          }
        } catch (error) {
          console.error('Error signing up:', error); 
          Alert.alert('Error', 'Failed to sign up. Please try again later.');
        }
      };
    
    

    const handleLogout = () => {
        
        setIsLoggedIn(false);
        setUsername("");
        setPassword("");
        setName("");
        setAge("");
    };

    useEffect(() => {
        
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {!isLoggedIn ? (
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <Image source={logo} style={styles.logo} resizeMode='contain' />
                    <Text style={styles.title}>{showSignUp ? 'Sign Up' : 'Login'}</Text>
                    <View style={styles.inputView}>
                        {showSignUp && (
                            <>
                                
                            </>
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder='Username or Email'
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        {showSignUp ? (
                            <>
                                <Pressable style={styles.button} onPress={handleSignUp}>
                                    <Text style={styles.buttonText}>SIGN UP</Text>
                                </Pressable>
                                <Text style={styles.orText}>OR</Text>
                                <Pressable onPress={() => setShowSignUp(false)}>
                                    <Text style={styles.signupText}>Back to Login</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Pressable style={styles.button} onPress={handleLogin}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </Pressable>
                                <Text style={styles.orText}>OR</Text>
                                <Pressable onPress={() => setShowSignUp(true)}>
                                    <Text style={styles.signupText}>SIGN UP</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.dashboardContainer}>
                    <Text style={styles.welcomeText}>Welcome, {username}!</Text>
                    
                    <Pressable style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>LOGOUT</Text>
                    </Pressable>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
    dashboardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 160,
        width: 170,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingVertical: 40,
        color: 'red',
    },
    inputView: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 60,
        paddingHorizontal: 20,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 18,
    },
    buttonView: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'red',
        width: '100%',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    orText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    signupText: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: 'red',
        width: '80%',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});

