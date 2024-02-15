import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	favorites: [],
	otherCollections: { favorites: [], wantToTry: [], notRecommended: [] },
};

export const collectionSlice = createSlice({
	name: 'collection',
	initialState,
	reducers: {
		addToFavorites: {
			reducer: (state, action) => {
				state.favorites = [...state.favorites, action.payload];
			},
		},
		removeFromFavorites: (state, action) => {
			const index = state.favorites.findIndex(
				(item) => item.id === action.payload.id
			);
			let newFavorites = [...state.favorites];

			if (index >= 0) {
				newFavorites.splice(index, 1);
			} else {
				console.warn(`Item not in favorites. Try again.`);
			}
			state.favorites = newBasket;
		},
		createCollection: (state, action) => {
			const foundCollection = state.otherCollections.filter(
				(collection) => otherCollections.collection.name === action.payload.name
			);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites, clearBasket } =
	collectionSlice.actions;

export const favorites = (state) => state.collection.favorites;
export const otherCollections = (state) => state.collection.otherCollections;

export default collectionSlice.reducer;
