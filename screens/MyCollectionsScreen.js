import { View, Text } from 'react-native';
import React from 'react';

const MyCollectionsScreen = () => {
	return (
		<SafeAreaView>
			<ScrollView>
				<Text>My Collections</Text>
				<ScrollView classname="flex flex-row"></ScrollView>
				<View>
					<Text>MyCollectionsScreen</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyCollectionsScreen;
