import React, { useState, useRef } from "react";
import UserCard from "./UserCard"; // Import your existing UserCard component
import "../style/SwipeDeck.css"

const SwipeDeck = ({ users = [] }) => { // Default to an empty array if users is undefined
  const [currentIndex, setCurrentIndex] = useState(users.length - 1); // Track the current card index
  const [startX, setStartX] = useState(0); // Track the starting X position of the swipe
  const [currentTranslate, setCurrentTranslate] = useState(0); // Track the current translation of the card
  const cardRef = useRef(null); // Reference to the current card

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX); // Record the starting X position
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const translate = currentX - startX; // Calculate the translation
    setCurrentTranslate(translate); // Update the translation
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${translate}px) rotate(${translate / 20}deg)`;
    }
  };

  const handleTouchEnd = () => {
    if (currentTranslate > 100) {
      // Swiped right
      console.log(`Swiped right on user ${users[currentIndex]?._id}`);
      setCurrentIndex((prevIndex) => prevIndex - 1); // Move to the next card
    } else if (currentTranslate < -100) {
      // Swiped left
      console.log(`Swiped left on user ${users[currentIndex]?._id}`);
      setCurrentIndex((prevIndex) => prevIndex - 1); // Move to the next card
    } else {
      // Reset position if swipe is not strong enough
      if (cardRef.current) {
        cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
      }
    }
    setCurrentTranslate(0); // Reset translation
  };

  if (!users || users.length === 0) {
    return <div className="no-users">No users to display</div>; // Handle empty users array
  }

  return (
    <div className="swipe-deck">
      {users.map((user, index) => (
        index === currentIndex && ( // Show only the current card
          <div
            key={user._id}
            className="swipe-card"
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <UserCard user={user} />
          </div>
        )
      ))}
    </div>
  );
};

export default SwipeDeck;