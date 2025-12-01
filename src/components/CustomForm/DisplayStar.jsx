import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const DisplayStar = ({ rating }) => {
  // Convert the rating to a number
  const numStars = parseFloat(rating);

  // Round the rating to the nearest half
  const roundedRating = Math.round(numStars * 2) / 2;

  // Generate an array of stars
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (roundedRating >= i + 0.75) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (roundedRating >= i + 0.25) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }

  return (
    <div className="flex items-center justify-center p-2.5 xl:p-5">
      {stars}
    </div>
  );
};

export default DisplayStar;
