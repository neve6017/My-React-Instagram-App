import { useEffect, useState } from "react";
import getPhotoUrl from "get-photo-url";
import profileIcon from "../assets/profileIcon.svg";
import { db } from "../dexie";

const Bio = () => {
  const [userDetails, setUserDetails] = useState({
    name: "User Name Not Available",
    about: "User Description Not Available",
  });

  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(profileIcon);

  useEffect(() => {
    const setDataFromDb = async () => {
      const userDetailsFromDb = await db.bio.get("info");
      const profilePhotoFromDb = await db.bio.get("profilePhoto");
      userDetailsFromDb && setUserDetails(userDetailsFromDb);
      profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb);
    };

    setDataFromDb();
  }, []);

  const updateUserDetails = async (event) => {
    event.preventDefault();
    const objectData = {
      name: event.target.nameOfUser.value,
      about: event.target.aboutUser.value,
    };
    setUserDetails(objectData);
    await db.bio.put(objectData, "info");
    setEditFormIsOpen(false);
  };

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    setProfilePhoto(newProfilePhoto);
    await db.bio.put(newProfilePhoto, "profilePhoto");
  };

  const editForm = (
    <form className="edit-bio-form" onSubmit={(e) => updateUserDetails(e)} autoComplete="off">
      <input type="text" name="nameOfUser" placeholder="Your name" required />
      <input type="text" name="aboutUser" placeholder="About you" required />
      <br />
      <button type="submit" className="save-button">
        Save
      </button>
      <button type="reset" className="reset-button">
        Reset
      </button>
      <button type="button" className="cancel-button" onClick={() => setEditFormIsOpen(false)}>
        Cancel
      </button>
    </form>
  );

  const editButton = <button onClick={() => setEditFormIsOpen(true)}>Edit</button>;

  return (
    <section className="bio">
      <div className="pfp-container">
        <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
        <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
          <div className="profile-photo" role="button">
            <img src={profilePhoto} alt="profile" />
            <div className="profile-mid">
              <div className="profile-inner">
                <input type="file" className="profile-input" />
                <label>
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="bevel">
                    <line x1="9" y1="6" x2="9" y2="20"></line>
                    <line x1="2" y1="13" x2="16" y2="13"></line>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="profile-info">
        <p className="name">{userDetails.name}</p>
        <p className="about">{userDetails.about}</p>
        {editFormIsOpen ? editForm : editButton}
      </div>
    </section>
  );
};

export default Bio;
