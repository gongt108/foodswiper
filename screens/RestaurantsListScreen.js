import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native';
// import Stars from 'react-native-stars';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { ChevronLeftIcon } from 'react-native-heroicons/mini';

import Location from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
	ArrowLeftIcon,
	StarIcon,
	BookmarkIcon as BookmarkIconSolid,
} from 'react-native-heroicons/solid';

import { API_KEY } from '@env';

import Search from '../components/Search';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantsListScreen = () => {
	const [isSearching, setIsSearching] = useState(false);
	const [restaurantsList, setRestaurantsList] = useState([]);

	const navigation = useNavigation();

	const {
		params: { location, searchCategory },
	} = useRoute();

	// const API_KEY =
	// 	'hxMDZzJ53QAfYopN3GBNOsosTeC0CVeXsi5_Zf8vP3kHrLs2TO1JvbroekF0Gzhh2uHc80BfyEmpopByxTF2LhNB_urK53QWNwYP_uhHiMFHEYtDcjYiq_2yWNBBZHYx';

	const config = {
		headers: {
			Authorization: `Bearer ${API_KEY}`,
		},
		params: {
			term: searchCategory,
			location: location,
			radius: 1609,
			sort_by: 'rating',
			limit: 20,
		},
	};

	// console.log(location);

	useEffect(() => {
		axios
			.get('https://api.yelp.com/v3/businesses/search', config)
			.then((response) => {
				console.log(response.data.businesses[0]);
				setRestaurantsList(response.data.businesses);
			});
	}, []);

	return (
		<View className="px-6 py-8">
			{!isSearching && (
				<View>
					<TouchableOpacity
						onPress={navigation.goBack}
						className="flex-row py-2 bg-gray-100 rounded-full"
					>
						<ChevronLeftIcon size={20} color="black" />
						<Text className="text-md">Back</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="h-12 items-center px-2 flex flex-row border-2 border-gray-400 rounded"
						onPress={() => setIsSearching(true)}
					>
						<MagnifyingGlassIcon color="gray" size={20} />
						<Text
							// placeholder="sandwiches, Chinese, Taco Bell"
							className="text-gray-400 ml-2"
						>
							sandwiches, Chinese, Taco Bell...
						</Text>
					</TouchableOpacity>
				</View>
			)}

			{isSearching && (
				<TouchableOpacity>
					<Search classname="mt-8 flex" />
				</TouchableOpacity>
			)}
			{/* <TouchableWithoutFeedback onPress={() => setIsSearching(false)}> */}
			{restaurantsList[0] ? (
				<ScrollView
					onScroll={() => setIsSearching(false)}
					scrollEventThrottle={16}
					showsVerticalScrollIndicator={false}
					className="mt-8"
				>
					{restaurantsList.map((business, key) => {
						return (
							// <TouchableOpacity
							// 	key={key}
							// 	onPress={() => {
							// 		navigation.navigate('RestaurantDetails');
							// 	}}
							// >
							<RestaurantCard key={key} business={business} />
							// </TouchableOpacity>
						);
					})}
				</ScrollView>
			) : (
				<Text className="text-slate-500 mt-4 font-semibold text-lg">
					No results found
				</Text>
			)}
			{/* </TouchableWithoutFeedback> */}
		</View>
	);
};

export default RestaurantsListScreen;
