import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton, Checkbox, Button } from 'react-native-paper';

// import {
// 	addToFavorites,
// 	removeFromFavorites,
// 	favorites,
// 	otherCollections,
// } from '../features/collectionSlice';
// import { useDispatch, useSelector } from 'react-redux';

const otherCollections = {
	favorites: [1, 2, 3],
	wantToTry: [4, 5, 6],
	notRecommended: [7, 8, 9],
};

const CollectionsPopUpScreen = () => {
	const navigation = useNavigation();
	// const dispatch = useDispatch();
	// const favoritesCollection = useSelector(favorites);
	// const additionalCollections = useSelector(otherCollections);
	// const [checkedList, setCheckedList] = useState([]);
	// const [uncheckedList, setUncheckedList] = useState([]);

	const collectionNames = Object.entries(otherCollections);

	const [checkedList, setCheckedList] = useState([]);
	const [uncheckedList, setUncheckedList] = useState([]);

	useEffect(() => {
		const newCheckedList = [];
		const newUncheckedList = [];

		Object.keys(otherCollections).map((collection) => {
			if (
				otherCollections[collection].includes(7) &&
				!newCheckedList.includes(collection)
			) {
				newCheckedList.push(collection);
				// console.log("new checked: " + newCheckedList);
			} else if (
				!otherCollections[collection].includes(7) &&
				!newUncheckedList.includes(collection)
			) {
				newUncheckedList.push(collection);
				// console.log("new unchecked: " + newUncheckedList);
			}

			setCheckedList(newCheckedList);
			setUncheckedList(newUncheckedList);
		});
		// console.log("ran useEffect")
	}, []);

	function handleCollection(collection) {
		const newCheckedList = checkedList;
		const newUncheckedList = uncheckedList;

		if (checkedList.includes(collection)) {
			// const index = checkedList.indexOf(collection);
			// newCheckedList.splice(index, 1);
			// newUncheckedList.push(collection);
			// console.log("new unchecked: " + newUncheckedList);

			setCheckedList(checkedList.filter((checked) => checked != collection));
			setUncheckedList([...checkedList, collection]);
		} else {
			// const index = uncheckedList.indexOf(collection);
			// newUncheckedList.splice(index, 1);
			// newCheckedList.push(collection);
			// console.log("new checked: " + newCheckedList);
			setUncheckedList(
				uncheckedList.filter((unchecked) => unchecked != collection)
			);
			setCheckedList([...checkedList, collection]);
		}

		// setCheckedList(newCheckedList);
		// setUncheckedList(newUncheckedList);

		// console.log("checked: " + checkedList);
		// console.log("not checked: " + uncheckedList);
		// console.log(checkedList.includes(collection));
	}

	// const {
	// 	params: { data },
	// } = useRoute();

	const toggleFavorites = (id) => {
		if (favoritesCollection.includes(id)) {
			dispatch(removeFromFavorites(data));
		} else {
			dispatch(addToFavorites(data));
		}
	};

	// {Object.keys(additionalCollections).map((name, i) => {
	// 	return (
	// 		<TouchableOpacity
	// 			className="flex-row items-center"
	// 			key={i}
	// 			onPress={() => setChecked(!checked)}
	// 		>
	// 			<Checkbox
	// 				status={
	// 					additionalCollections[name].includes(id)
	// 						? 'checked'
	// 						: 'unchecked'
	// 				}
	// 				onPress={() => setChecked(!checked)}

	// 				// onPress={() => handleTopping(topping)}
	// 			/>
	// 			<View>
	// 				<Text>{name}</Text>
	// 			</View>
	// 		</TouchableOpacity>
	// 	);
	// })}

	return (
		<View className="my-4 mx-8">
			<Text>Collections</Text>
			<View>
				{/* <Checkbox
					status={favoritesCollection.includes(id) ? 'checked' : 'unchecked'}
					onPress={() => {
						setChecked(!checked);
					}}
				/> */}
				{Object.keys(otherCollections).map((collection, i) => {
					return (
						<TouchableOpacity
							className="flex-row items-center"
							key={i}
							onPress={() => handleCollection(collection)}
						>
							<Checkbox
								status={
									checkedList.includes(collection) ? 'checked' : 'unchecked'
								}
								onPress={() => handleCollection(collection)}
							/>
							<Text>{collection}</Text>
						</TouchableOpacity>
					);
				})}

				{/* <input
					type="checkbox"
					value="collection"
					checked={otherCollections.favorites.includes(7) ? true : false}
				/> */}
				<TouchableOpacity className="my-4 mx-8" onPress={navigation.goBack}>
					<Button color="#FF0000" mode="contained">
						Save
					</Button>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CollectionsPopUpScreen;
