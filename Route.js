/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Homes from './Menu/Home/Homes';
import Kategori from './Menu/Kategori/Kategori';
import Kota from './Menu/Kota/Kota';
import Masakan from './Menu/Masakan/Masakan';
import Restaurant from './Menu/Restaurant';

const Router = createStackNavigator ({
  Homes: {
    screen: Homes,
  },
  Masakan: {
    screen: Masakan
  },
  Restaurant: {
    screen: Restaurant
  },
  Kota: {
    screen: Kota
  },
  Kategori: {
    screen: Kategori
  }
},
{initialRouteName: 'Homes'}
);

export default createAppContainer(Router);