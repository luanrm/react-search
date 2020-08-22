import React, {Component} from 'react';
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
Icon.loadFont();

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

  return (
    <View style={styles.container}>
      <FlatList
        data={[
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
        ]}
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
        <Icon name="add" size={20} color="black" />
        <TextInput onChangeText={(search) => this.setState({search})} />
      </View>
    );
  }
}

const Stack = createStackNavigator();

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
