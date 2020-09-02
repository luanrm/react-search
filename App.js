import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  item: {
    padding: 20,
    fontSize: 22,
    borderColor: '#dbdbdb',
    borderBottomWidth: 1,
  },
});

function HomeScreen({navigation}) {
  const prod = {
    id: 'r123',
    title: 'Royal Canin',
    unit_price: 100000,
    quantity: 1,
    tangible: true,
    image:
      'https://www.petlove.com.br/images/products/207462/large/Ra%C3%A7%C3%A3o_Royal_Canin_Mini_Adult_para_C%C3%A3es_Adultos_de_Ra%C3%A7as_Pequenas_com_10_Meses_ou_mais_de_Idade_3105614.jpg',
  };

  let itens = [
    prod,
    prod,
    prod,
    prod,
    prod,
    prod,
    prod,
    prod,
    prod,
    prod,
    prod,
    prod,
  ];

  const search = (text) => {
    itens = itens.filter(function (item) {
      console.log(item.title.search(text))
      return item.title.search(text) > -1;
    });

    return itens;
  };

  return (
    <View style={styles.container}>
      {/* <Icon name="search" style={{marginTop: 15}} size={20} color="black" /> */}
      <TextInput
        placeholder="Pesquise"
        style={{
          margin: 15,
          borderWidth: 1,
          padding: 12,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          borderColor: '#888888',
          fontSize: 18,
          height: 50,
        }}
        onChangeText={(text) => search(text)}
      />
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id + Math.random()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details', item);
            }}>
            <Text style={styles.item}>
              <Image style={styles.logo} source={{uri: item.image}} />
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetailScreen({route}) {
  const {title} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.item}>{title}</Text>
    </View>
  );
}

class Header extends Component {
  state = {
    search: '',
  };

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            padding: 20,
            fontSize: 22,
          }}>
          Header
        </Text>
      </View>
    );
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: ({scene, previous, navigation}) => {
              const {options} = scene.descriptor;

              return <Header />;
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={({route}) => ({title: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
