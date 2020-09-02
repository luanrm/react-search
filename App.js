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

class HomeScreen extends Component {
  navigation = this.props.navigation;

  prod1 = {
    id: 'r123',
    title: 'Royal Canin',
    unit_price: 100000,
    quantity: 1,
    tangible: true,
    image:
      'https://www.petlove.com.br/images/products/207462/large/Ra%C3%A7%C3%A3o_Royal_Canin_Mini_Adult_para_C%C3%A3es_Adultos_de_Ra%C3%A7as_Pequenas_com_10_Meses_ou_mais_de_Idade_3105614.jpg',
  };

  prod2 = {
    id: 'r123',
    title: 'Flush',
    unit_price: 100000,
    quantity: 1,
    tangible: true,
    image:
      'https://www.petlove.com.br/images/products/207462/large/Ra%C3%A7%C3%A3o_Royal_Canin_Mini_Adult_para_C%C3%A3es_Adultos_de_Ra%C3%A7as_Pequenas_com_10_Meses_ou_mais_de_Idade_3105614.jpg',
  };

  state = {
    itens: [this.prod1, this.prod1, this.prod2, this.prod2],
    filtered: [this.prod1, this.prod1, this.prod2, this.prod2],
  };

  search = (text) => {
    var itens = this.state.itens.filter((item) => {
      return item.title.search(text) > -1;
    });

    this.setState({filtered: itens});
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Icon name="search" style={{marginTop: 15}} size={20} color="black" /> */}
        <TextInput
          placeholder="Pesquise"
          style={{
            marginLeft: 15,
            marginRight: 15,
            borderWidth: 1,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 20,
            borderColor: '#888888',
            fontSize: 18,
            height: 50,
          }}
          onChangeText={(text) => this.search(text)}
        />
        <FlatList
          data={this.state.filtered}
          keyExtractor={(item) => item.id + Math.random()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.navigation.navigate('Details', item);
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
