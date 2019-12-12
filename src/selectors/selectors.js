import {createSelector} from 'reselect';
import _ from "lodash";

const MAX_NEARBY_PLACES = 3;

const sortOffers = (offers, sortType) => {
  switch (sortType) {
    case `DEFAULT`:
      return offers;
    case `PRICE_ASC`:
      return offers.sort((offer1, offer2) => (offer1.price > offer2.price) ? 1 : -1);
    case `PRICE_DESC`:
      return offers.sort((offer1, offer2) => (offer1.price < offer2.price) ? 1 : -1);
    case `RATING`:
      return offers.sort((offer1, offer2) => (offer1.rating < offer2.rating) ? 1 : -1);
  }
  return offers;
};

const getCity = (state) => state.city;
const getOffers = (state) => state.offers;
const getFavoriteOffers = (state) => state.favoriteOffers;
const getSortType = (state) => state.sortType;


export const getCitiesList = createSelector(
    [getOffers],
    (offers) => {
      return _.uniqBy(offers.map((offer) => offer.city), `name`);
    }
);

export const getOfferById = (state, offerId) => state.offers.find((offer) => offer.id === parseInt(offerId, 10));
export const getNearbyPlaces = (state, offerId) => state.offers
  .filter((offer) => offer.id !== parseInt(offerId, 10))
  .slice(0, MAX_NEARBY_PLACES);

export const getOffersForCity = createSelector(
    [getOffers, getCity, getSortType],
    (offers, city, sortType) => {
      return sortOffers(offers.filter((offer) => offer.city.name === city.name), sortType.name);
    }
);

export const getGroupedFavoriteOffers = createSelector(
    [getFavoriteOffers],
    (offers) => {
      const groupedOffers = {};
      for (let i = 0; i < offers.length; i++) {
        const currentCity = offers[i].city.name;
        if (groupedOffers[currentCity] !== undefined) {
          groupedOffers[currentCity].push(offers[i]);
        } else {
          groupedOffers[currentCity] = [offers[i]];
        }
      }
      const groupedOffersArray = Object.entries(groupedOffers)
      .map(([city, offersList]) => ({city, offersList}));
      return groupedOffersArray;
    }
);
