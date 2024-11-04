import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss';

interface NavbarProps {
  onSearch: (searchQuery: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState('User Name');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [isBellClicked, setIsBellClicked] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInEmail = localStorage.getItem('userEmail');
      if (!loggedInEmail) {
        console.error('No user email found');
        return;
      }

      try {
        const response = await fetch('https://contentapi-m9vl.onrender.com/');
        const data = await response.json();

        console.log("API response:", data);

        if (Array.isArray(data) && data.length > 0) {

          // Log the email being searched for
          console.log(`Searching for user with email: ${loggedInEmail}`);

          // Find  user with the matching email
          const user = data.find((user) => {
            const userEmail = user.personalInfo?.email || '';

            // Log the current user's email for comparison
            console.log(`Comparing with user email: ${userEmail}`);
            return userEmail.toLowerCase() === loggedInEmail.toLowerCase();
          });

          if (user && user.personalInfo?.userName) {
            setUserName(user.personalInfo.userName);
            console.log(`User found: ${user.personalInfo.userName}`);
          } else {
            console.error('User not found or does not contain personalInfo or userName');
          }
        } else {
          console.error('User data is not an array or is empty');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleBellClick = () => {
    setIsBellClicked((prevState) => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    navigate('/');
    console.log("Logout clicked");
  };

  return (
    <nav className='nav-container'>
      <div className='nav-content'>
        <a href="">
          <img src="./images/logo.svg" alt="Logo" className='logo' />
        </a>

        <form onSubmit={handleSearch} className="form-container">

          <div className="input-container">
            <input
              type="text"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={handleInputChange}
              className="input"
            />
            <button className="btn" type="submit"><img src="/images/search.svg" alt="" /></button>
          </div>

        </form>

        <div className="end-icons">
          <a className='doc' href="/">Docs</a>
          <img
            src="./images/vector.png"
            alt="Bell Icon"
            className={`bell-icon ${isBellClicked ? 'clicked' : ''}`}
            onClick={handleBellClick}
          />
          <div className='end-icon'>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="profile-pic-upload"
            />
            <label htmlFor="profile-pic-upload" className="profile-pic-label">
              <img
                src={profileImage || "./images/avatar.png"}
                alt="Profile"
                className="profile-pic"
                onClick={() => document.getElementById('profile-pic-upload')?.click()}
              />
            </label>
            <span className="profile-name">{userName}</span>

            <div className="dropdown">
                ▼    
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

