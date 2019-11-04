import React from "react";
import PropTypes from "prop-types";

const PlaceCard = (props) => {
  const {place, onNameClick} = props;
  const {name, type, price, priceText, picture, isPremium, isBookmarked} = place;

  return <article className="cities__place-card place-card">
    <div className="place-card__mark" style={isPremium ? {display: `none`} : ``}>
      <span>Premium</span>
    </div>
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={picture} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;{priceText}</span>
        </div>
        <button className={`place-card__bookmark-button button` + isBookmarked ? `place-card__bookmark-button--active` : ``} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `100%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" onClick={onNameClick}>{name}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};


PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
  onNameClick: PropTypes.func.isRequired,
};

export default PlaceCard;
