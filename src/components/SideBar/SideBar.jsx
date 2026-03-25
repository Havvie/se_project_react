import { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const username = currentUser?.name || "User";
  const avatar = currentUser?.avatar || "";
  const firstLetter = username.charAt(0).toUpperCase();

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [avatar]);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {avatar && !imageError ? (
          <img
            className="sidebar__avatar"
            src={avatar}
            alt={username}
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {firstLetter}
          </span>
        )}

        <div className="sidebar__user-name">{username}</div>
      </div>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>

        <button type="button" className="sidebar__button" onClick={onSignOut}>
          Log out
        </button>
      </div>
    </aside>
  );
}