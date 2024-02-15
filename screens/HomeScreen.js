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

const HomeScreen = () => {
	const navigation = useNavigation();

	return (
		<SafeAreaView className="flex" style={styles.centered}>
			<Text>I Want to</Text>
			<TouchableOpacity>
				<Text>Get Recommendations</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>Make Recommendations</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Search')}>
				<Text>See What's Nearby</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('CollectionsPopUp')}>
				<Text>Test Page</Text>
			</TouchableOpacity>
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

export default HomeScreen;
