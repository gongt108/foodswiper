import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	SafeAreaView,
	Button,
} from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	ArrowLeftIcon,
	StarIcon,
	BookmarkIcon as BookmarkIconSolid,
} from 'react-native-heroicons/solid';
import {
	StarIcon as StarIconOutline,
	UserCircleIcon,
	BookmarkIcon as BookmarkIconOutline,
} from 'react-native-heroicons/outline';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { API_KEY } from '@env';

import { addToFavorites, favorites } from '../features/collectionSlice';
import { useDispatch, useSelector } from 'react-redux';

const ABBR_DAY_OF_WEEK = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];

const RestaurantDetailScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const favoritesCollection = useSelector(favorites);

	// const data = response.data;
	// const [business, setBusiness] = useState({});

	// const {
	// 	params: { alias },
	// } = useRoute();

	// const alias = 'north-india-restaurant-san-francisco';

	// const config = {
	// 	method: 'GET',
	// 	headers: {
	// 		Authorization: `Bearer ${API_KEY}`,
	// 	},
	// };

	// useEffect(() => {
	// 	axios
	// 		.get(`https://api.yelp.com/v3/businesses/${alias}`, config)
	// 		.then((response) => {
	// 			setBusiness(response.data);
	// 		});

	// }, []);

	const {
		params: { data },
	} = useRoute();

	const [restaurantReviews, setRestaurantReviews] = useState([]);
	const menuPhotos = data.photos;

	const config = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${API_KEY}`,
		},
	};

	useEffect(() => {
		axios
			.get(
				`https://api.yelp.com/v3/businesses/${data.alias}/reviews?limit=20&sort_by=yelp_sort`,
				config
			)
			.then((response) => {
				setRestaurantReviews(response.data.reviews);
			});
	}, []);

	const operatingDays = {};
	if (data.hours) {
		ABBR_DAY_OF_WEEK.forEach((weekday, index) => {
			const operatingHours = data?.hours[0]?.open;
			let currentDay = operatingHours.find((hours) => hours.day === index);

			operatingDays[weekday] = currentDay || { day: index };
		});
	}

	function getCategoryNames(categories) {
		const namesArray = categories?.map((category) => category.title);
		return namesArray?.join(', ');
	}

	function militaryToStandardTime(militaryTime) {
		const suffix = militaryTime > 1200 ? 'PM' : 'AM';

		// console.log(militaryTime.slice(2, 4));

		if (militaryTime > 1200) {
			const hour = Math.floor((militaryTime - 1200) / 100).toString();
			const minute = militaryTime.slice(2, 4);
			return `${hour}:${minute} ${suffix}`;
		} else if (militaryTime == '0000' || militaryTime == '1200') {
			return `12:00 ${suffix}`;
		} else {
			const hour = militaryTime.slice(0, 2);
			const minute = militaryTime.slice(2, 4);
			return `${hour}:${minute} ${suffix}`;
		}
	}

	function getHours(operatingHours, index) {
		let currentDay = operatingHours.find((hours) => hours.day === index);
		if (currentDay) {
			const startTime = militaryToStandardTime(currentDay.start);
			const endTime = militaryToStandardTime(currentDay.end);
			return `${startTime} to ${endTime} `;
		} else {
			return 'CLOSED';
		}
	}

	const collectionManagement = () => {
		dispatch(addToFavorites(data.id));
	};

	// console.log(data.transactions.join(', '));

	return (
		<SafeAreaView>
			<ScrollView>
				<Image
					source={{
						uri: data?.image_url,
					}}
					className="h-96 w-full bg-gray-100"
				/>
				<View className="bg-white">
					<View className="px-4 pt-4">
						<Text className="text-3xl font-bold">{data.name}</Text>
						<View className="flex-row space-x-2 my-1 items-center">
							<View className="flex-row">
								<Stars
									display={data.rating}
									count={5}
									half={true}
									fullStar={<Icon name={'star'} size={22} />}
									emptyStar={<Icon name={'star-outline'} size={22} />}
									halfStar={<Icon name={'star-half'} size={22} />}
								/>
							</View>
							<Text className="text-lg">{data.review_count} Review(s)</Text>
						</View>
						{data.hours && (
							<View className="mt-2 flex flex-row space-x-2">
								{data?.hours[0].is_open_now ? (
									<View className="flex-row space-x-2">
										<Text className="font-bold text-green-500 text-lg">
											OPEN
										</Text>
										<Text className="text-gray-500 text-lg">•</Text>
										<Text className="text-gray-500 text-lg">
											Available for {data.transactions.join(', ')}
										</Text>
									</View>
								) : (
									<Text className="font-bold text-red-500 text-lg">CLOSED</Text>
								)}
							</View>
						)}

						<Text className="text-gray-500 mt-2 pb-4 text-md">
							{data?.price} {getCategoryNames(data.categories)}
						</Text>
					</View>
				</View>

				<View className="bg-white mt-4 px-4 py-2">
					<Text className="font-bold text-xl">Location &amp; Phone Number</Text>

					<Text>{data.location?.display_address[0]} </Text>
					<Text>{data.location?.display_address[1]} </Text>
					<Text>{data.location?.display_address[2]} </Text>

					<Text className="font-semibold">Call</Text>
					<Text>{data.display_phone} </Text>
				</View>

				<View id="hours" className="bg-white mt-4 px-4 py-2">
					<Text className="font-bold text-xl">Hours</Text>
					{!data.hours && (
						<Text className="text-slate-500 font-semibold text-lg">
							Hours Not Available
						</Text>
					)}

					{data.hours &&
						ABBR_DAY_OF_WEEK.map((day, index) => {
							return (
								<View key={index}>
									<Text className="font-bold mt-2">{day}</Text>
									<Text>{getHours(data?.hours[0]?.open, index)}</Text>
								</View>
							);
						})}
				</View>

				<View className="bg-white mt-4 px-4 py-2">
					<Text className="font-bold text-xl">PHOTOS</Text>
					<View className="flex-row mt-2 space-x-2 items-center">
						{data.photos.map((photo, index) => {
							return (
								<Image
									key={index}
									style={{ width: 100, height: 100, objectFit: 'cover' }}
									source={{ uri: photo }}
								/>
							);
						})}
					</View>
					<Text></Text>
				</View>

				<View className="bg-white mt-4 pb-4">
					<View className="p-4">
						<Text className="font-bold text-2xl mb-2">Reviews</Text>
						<View>
							<Text>
								{restaurantReviews.map((review, index) => {
									return (
										<View className="mt-2" key={index}>
											<Text className="font-semibold">{review.user.name}</Text>
											<View className="flex-row">
												<Text>Rating: </Text>
												<Stars
													display={review.rating}
													count={5}
													fullStar={<Icon name={'star'} size={16} />}
													emptyStar={<Icon name={'star-outline'} size={16} />}
													halfStar={<Icon name={'star-half'} size={16} />}
												/>
												<Text className="ml-2 text-slate-500">
													{review.time_created.split(' ')[0]}
												</Text>
											</View>

											<Text>{review.text}</Text>
										</View>
									);
								})}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={navigation.goBack}
				className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
			>
				<ArrowLeftIcon size={20} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={navigation.goBack}
				className="absolute top-14 right-5 p-2 bg-gray-100 rounded-full"
			>
				<BookmarkIconOutline size={20} color="black" />
			</TouchableOpacity>
			<View>
				<Text>Add Review</Text>
				<StarIconOutline color="black" size={22} />
				<Text>
					<StarIcon color="black" size={22} />
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default RestaurantDetailScreen;
