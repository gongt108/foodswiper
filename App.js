import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import RestaurantsListScreen from './screens/RestaurantsListScreen';
import RestaurantDetailScreen from './screens/RestaurantDetailScreen';
import CollectionsPopUpScreen from './screens/CollectionsPopUpScreen';

import { Provider } from 'react-redux';

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			{/* <Provider store={store}> */}
			<TailwindProvider>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Search"
						component={SearchScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RestaurantsList"
						component={RestaurantsListScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RestaurantDetails"
						component={RestaurantDetailScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="CollectionsPopUp"
						component={CollectionsPopUpScreen}
						options={{ presentation: 'modal', headerShown: false }}
					/>

					{/* 
                <Stack.Screen name="Cart" component={CartScreen} options={{presentation: "modal", headerShown: false}} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown: false}}/>
				*/}
				</Stack.Navigator>
			</TailwindProvider>
			{/* </Provider> */}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
