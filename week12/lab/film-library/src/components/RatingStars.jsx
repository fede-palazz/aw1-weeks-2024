import { useState } from "react";
import { StarFill, Star } from "react-bootstrap-icons";

function RatingStars({ rating, size = 16, mode = "view", handleChangeRating, isInvalid = false }) {
  const [hoverRate, setHoverRate] = useState(rating);
  const stars = [];

  if (mode === "view") {
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarFill key={i} size={size} />);
      } else {
        stars.push(<Star key={i} size={size} />);
      }
    }
  } else if (mode === "hover") {
    for (let i = 1; i <= 5; i++) {
      if (i <= hoverRate) {
        stars.push(
          <StarFill
            key={i}
            size={size}
            className={isInvalid ? "text-danger" : ""}
            onMouseOver={() => handleHover(i)}
            onClick={() => handleClick(i)}
            onMouseOut={() => handleLeave()}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            size={size}
            className={isInvalid ? "text-danger" : ""}
            onMouseOver={() => handleHover(i)}
            onClick={() => handleClick(i)}
            onMouseOut={() => handleLeave()}
          />
        );
      }
    }
  }

  const handleHover = (starId) => {
    setHoverRate(starId);
  };

  const handleLeave = () => {
    setHoverRate(rating);
  };

  const handleClick = (starId) => {
    handleChangeRating(starId);
  };

  return <div>{stars}</div>;
}

export default RatingStars;
