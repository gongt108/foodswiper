import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Row,
	ScrollView,
} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MapPinIcon } from 'react-native-heroicons/outline';

import Location from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { API_KEY } from '@env';

const RestaurantCard = ({ business }) => {
	const navigation = useNavigation();

	function distanceInMiles(distance) {
		return (distance / 1609).toFixed(2);
	}

	const config = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${API_KEY}`,
		},
	};

	function getRestaurantDetailsScreen() {
		axios
			.get(`https://api.yelp.com/v3/businesses/${business.alias}`, config)
			.then((response) => {
				const data = response.data;
				// console.log(response.data);
				navigation.navigate('RestaurantDetails', {
					data,
				});
			});
	}

	return (
		<TouchableOpacity onPress={() => getRestaurantDetailsScreen()}>
			<View className="flex flex-row space-between items-center">
				<Image
					style={{ width: 100, height: 100, objectFit: 'cover' }}
					source={{ uri: business.image_url }}
				/>
				<View className="ml-4">
					<Text
						ellipsizeMode="tail"
						numberOfLines={1}
						className="font-bold text-lg"
						width={200}
					>
						{business.name}
					</Text>

					<View className="mt-2 flex flex-row items-center">
						<Stars
							display={business.rating}
							count={5}
							half={true}
							fullStar={<Icon name={'star'} size={20} />}
							emptyStar={<Icon name={'star-outline'} size={20} />}
							halfStar={<Icon name={'star-half'} size={20} />}
						/>
						{/* <Text>{business.category.toString()}</Text> */}
						<Text className="ml-2">{business.review_count} Reviews</Text>
					</View>

					<View className="mt-2 flex flex-row items-center">
						<MapPinIcon color="black" />
						<Text>{business.location.city}</Text>
						<Text className="ml-2">
							{distanceInMiles(business.distance)} mi
						</Text>
						<Text className="ml-4">{business.price}</Text>
					</View>
				</View>
			</View>
			<View className="border-gray-300 my-8 border-[0.5rem]" />
		</TouchableOpacity>
	);
};

export default RestaurantCard;
