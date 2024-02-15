import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Button,
	StyleSheet,
} from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	ClipboardDocumentListIcon,
	UserIcon,
	CalendarDaysIcon,
	BuildingStorefrontIcon,
} from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../components/Search';

const SearchScreen = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView className="flex" style={styles.centered}>
			<Search />
			<View className="w-100 mt-8 mb-8 flex flex-row space-x-2">
				<TouchableOpacity className="items-center w-20">
					<ClipboardDocumentListIcon size={30} color="black" />
					<Text className="mt-2 text-xs">My Lists</Text>
				</TouchableOpacity>
				<TouchableOpacity className="items-center w-20">
					<BuildingStorefrontIcon size={30} color="black" />
					<Text className="mt-2 text-xs">Recommend</Text>
				</TouchableOpacity>
				<TouchableOpacity className="items-center w-20">
					<UserIcon size={30} color="black" />
					<Text className="mt-2 text-xs">My Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity className="items-center w-20">
					<CalendarDaysIcon size={30} color="black" />
					<Text className="mt-2 text-xs">Reservations</Text>
				</TouchableOpacity>
			</View>
			{/* <View className="w-100 mb-8 flex flex-row space-x-4">
				
			</View> */}
			<View>
				<Text className="text-lg font-bold justify-start">
					Nearby Restaurants
				</Text>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		marginVertical: 2,
	},
	subtitle: {
		fontSize: 14,
		color: '#888',
	},
});

export default SearchScreen;
