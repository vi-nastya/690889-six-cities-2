import React from "react";
import PropTypes from "prop-types";
import {offerPropTypes} from "../../props-types-validation";
import {Link} from "react-router-dom";
import {RATING_PERCENT} from "../../constants";

const PlaceCard = (props) => {
  const {place, onHoverOn, onHoverOff, cardType} = props;
  const {title, type, price, images, rating, isPremium, isFavorite} = place;

  return <article className={`${cardType.cardClass} place-card`} onMouseEnter={onHoverOn ? () => onHoverOn() : null} onMouseLeave={onHoverOff ? () => onHoverOff() : null}>
    <div className="place-card__mark" style={!isPremium ? {display: `none`} : {}}>
      <span>Premium</span>
    </div>
    <div className={`${cardType.imageClass} place-card__image-wrapper`}>
      <a href="#">
        <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button` + (isFavorite ? ` place-card__bookmark-button--active` : ``)} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${Math.round(rating) * RATING_PERCENT}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${place.id}`}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};


PlaceCard.propTypes = {
  place: offerPropTypes,
  onHoverOn: PropTypes.func,
  onHoverOff: PropTypes.func,
  cardType: PropTypes.shape({
    imageClass: PropTypes.string,
    cardClass: PropTypes.string
  })
};

export default PlaceCard;
