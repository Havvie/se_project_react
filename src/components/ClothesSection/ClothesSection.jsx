import { useContext } from "react"
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({ 
  clothingItems, 
  onCardClick, 
  handleAddClick,
  onCardLike,
  isLoggedIn,
 }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = currentUser
    ? clothingItems.filter((item) => {
      const ownerId =
        typeof item.owner === "string" ? item.owner : item.owner?._id;
      return ownerId === currentUser._id;
    })
  : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>

        <button
            type="button"
            className="clothes-section__btn"
            onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}
