import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({ clothingItems, onCardClick, onAddClick }) {
    return (
        <div className="profile">
            <SideBar />
            <ClothesSection 
                onCardClick={onCardClick} 
                clothingItems={clothingItems} 
                handleAddClick={onAddClick}
            />
        </div>
    );
}