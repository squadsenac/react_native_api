import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import {Image, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const btn_style = {
    margin: "20px",
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Consumo de API: Json Placeholder</Text>
      <div style={btn_style}>
        <Button title='Ir para consumo de API'
        onPress={() => navigation.navigate('API')}
        />
      </div>
    
    </View>
  );
}

function ImageScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Férias dos sonhos</Text>
      <Image source={{uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/f9/1c/swiss-alps.jpg?w=700&h=500&s=1'}}
       style={{width: 400, height: 400}} />
    </View>
  );
}

function APIconsume() {
  const [posts, setPosts] = useState([]);
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Consumo de API</Text>
          <div className="posts-container">
          {posts.map((post) => {
            return (
                <div className="post-card" key={post.id}>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-body">{post.body}</p>
                  <div className="button">
                  <div className="delete-btn">Recebido</div>
                  </div>
                </div>
            );
          })}
      </div>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Página de Fábio' }} />
        <Stack.Screen name="Imagem" component={ImageScreen} />
        <Stack.Screen name="API" component={APIconsume} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
