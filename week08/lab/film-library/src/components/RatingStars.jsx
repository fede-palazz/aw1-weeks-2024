import { StarFill, Star } from "react-bootstrap-icons";

const RatingStars = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<StarFill key={i} />);
    } else {
      stars.push(<Star key={i} />);
    }
  }

  return <div>{stars}</div>;
};

export default RatingStars;
