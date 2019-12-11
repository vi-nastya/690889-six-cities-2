import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer";
import PlacesList from "../places-list/places-list.jsx";
import Map from "../map/map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Sorting from "../sorting/sorting.jsx";
import {connect} from "react-redux";
import {compose} from "recompose";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import {getCitiesList, getOffersForCity} from "../../selectors/selectors";
import Header from "../header/header.jsx";

const MainPage = (props) => {
  const {city, offersForCity, citiesList, activeItem, setActiveItem, changeCityHandler} = props;
  return <section className="welcome">
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol id="icon-arrow-select" viewBox="0 0 7 4">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
        </symbol>
        <symbol id="icon-bookmark" viewBox="0 0 17 18">
          <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
        </symbol>
        <symbol id="icon-star" viewBox="0 0 13 12">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
        </symbol>
      </svg>
    </div>

    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList
            activeCity={city}
            changeCityHandler={(newCity) => changeCityHandler(newCity)}
            cities={citiesList}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersForCity.length} places to stay in {city.name}</b>
              <Sorting/>
              <PlacesList places={offersForCity} setActiveItem={setActiveItem}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map points={offersForCity.map((offer) => [offer.location.latitude, offer.location.longitude])} activePoint={activeItem} city={[city.location.latitude, city.location.longitude]}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </section>;
};

MainPage.propTypes = {
  city: PropTypes.object.isRequired,
  offersForCity: PropTypes.arrayOf(PropTypes.object).isRequired,
  citiesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  changeCityHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offersForCity: getOffersForCity(state),
  citiesList: getCitiesList(state),
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  changeCityHandler: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {MainPage};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withActiveItem
)(MainPage);
