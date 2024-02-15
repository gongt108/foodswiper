import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
	const [location, setLocation] = useState('New York City');
	const [searchCategory, setSearchCategory] = useState('restaurants');
	const navigation = useNavigation();

	function updateLocation(event) {
		setLocation(event);
	}

	function updateCategory(event) {
		setSearchCategory(event);
	}

	return (
		<View className="flex">
			<Text className="font-bold text-lg">What are you craving?</Text>
			<View className="">
				<TextInput
					placeholder="sandwiches, Chinese, Taco Bell"
					keyboardType="default"
					onChangeText={updateCategory}
					className="h-8 w-48 mt-2"
				/>
				<TextInput
					placeholder="City, State, Country"
					keyboardType="default"
					onChangeText={updateLocation}
					className="h-8 w-48"
				/>

				<TouchableOpacity
					className="bg-red-500 mt-4 h-8 flex justify-center"
					onPress={() => {
						// navigation.navigate('RestaurantsList', {
						navigation.navigate('Home');
						navigation.navigate('RestaurantsList', {
							location,
							searchCategory,
						});
					}}
				>
					<Text
						className="text-white font-bold text-center  text-lg"
						// color="#ffffff"
						// title="Search"
						// accessibilityLabel="Search button"
					>
						Search
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Search;
