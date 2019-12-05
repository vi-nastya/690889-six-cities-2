import React from "react";
import PropTypes from "prop-types";

const Review = (props) => {
  const {reviewData} = props;
  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">{reviewData.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style="width: 94%"></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {reviewData.comment}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
    </div>
  </li>;
};

Review.propTypes = {
  reviewData: PropTypes.object.isRequired,
};


export default Review;
