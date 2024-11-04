import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/UserDetails.scss';
import Sidebar from '../components/Sidebar';

interface UserData {
  personalInfo: {
    fullName: string;
    userName: string;
    phoneNumber: string;
    email: string;
    bvn: string;
    maritalStatus: string;
    children: number;
    typeOfResidence: string;
    gender: string;
    organisation: string;
    status: string;
    dateJoined: string;
  };
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullNames: string;
    phoneNumber: string;
    emails: string;
    relationship: string;
  };
}

const UserDetails: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get('id');

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get('https://contentapi-m9vl.onrender.com/');
          console.log('API Response:', response.data);

          const foundUser = response.data.find((user: any) => user.id === parseInt(userId));
          if (foundUser) {
            // Map "loan repayment" to "loanRepayment"
            const mappedUser = {
              ...foundUser,
              educationAndEmployment: {
                ...foundUser.educationAndEmployment,
                loanRepayment: foundUser.educationAndEmployment["loan repayment"]
              }
            };

            setUserData(mappedUser);
          } else {
            setError('User not found');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          setError('Error fetching user details');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user ID provided');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-details-container">
      <Navbar onSearch={() => { } }  />
      <Sidebar />

      <div className="back-to-users">
        <a href="/User">
          <img src="/images/arrow.svg" alt="Back" />
        </a>
        <span>Back to users</span>
      </div>

      <div className="user-details-header">
        <p className='user-details'>User Details</p>
        <div className="status-indicators">
          <span className="blacklist-user">BLACKLIST USER</span>
          <span className="active-user">ACTIVATE USER</span>
        </div>
      </div>

      {userData && (
        <>

          <div className="user-main-info">
            <div className="profile-picture">
              <img src="/images/humanicon.svg" alt="User Icon" />
            </div>

            <div className="full-name">
              <h3>{userData.personalInfo.fullName}</h3>
              <p className='p'>LSQFf587g90</p>
            </div>

            <div className="vertical-line"></div>

            <div className="tier">
              <p className='user-p'>User's Tier</p>
              <div className="star-icon">
                <img src="/images/star1.svg" alt="star" />
                <img src="/images/star2.svg" alt="star" />
                <img src="/images/star2.svg" alt="star" />
              </div>
            </div>

            <div className="vertical-line"></div>

            <div>
              <p className='amount'>₦200,000.00</p>
              <p className='bank'>9912345678/Providus Bank</p>
            </div>
            </div>


          <div className="navigation-tabs">
            <p className='document'>General</p>
            <p className='document'>Documents</p>
            <p className='document'>Bank Details</p>
            <p className='document'>Loans</p>
            <p className='document'>Savings</p>
            <p className='document'>App</p>
          </div>

          <div className='content'>

            {/* PERSONAL INFOR */}
            <div className="user-info-section">
              <p className='header'>Personal Information</p>

              <div className='texts'>

                <div className='header-text'>
                  <p className='content-text'>FULL NAME</p>
                  <p className='detail-text'> {userData.personalInfo.fullName}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>PHONE NUMBER</p>
                  <p className='detail-text'> {userData.personalInfo.phoneNumber}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>EMAIL ADDRESS</p>
                  <p className='detail-text'> {userData.personalInfo.email}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>BVN</p>
                  <p className='detail-text'> {userData.personalInfo.bvn}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>GENDER</p>
                  <p className='detail-text'> {userData.personalInfo.gender}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>MARITAL STATUS</p>
                  <p className='detail-text'> {userData.personalInfo.maritalStatus}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>CHILDREN</p>
                  <p className='detail-text'> {userData.personalInfo.children}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>TYPE OF RESIDENCE</p>
                  <p className='detail-text'> {userData.personalInfo.typeOfResidence}</p>
                </div>

              </div>

            </div>

            <hr />

            {/* EDUCATION AND EMPLOYMENT */}
            <div className="user-info-section">
              <p className='header'>Education and Employment</p>

              <div className='texts'>

                <div className='header-text'>
                  <p className='content-text'>LEVEL OF EDUCATION</p>
                  <p className='detail-text'> {userData.educationAndEmployment.levelOfEducation}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>EMPLOYMENT STATUS</p>
                  <p className='detail-text'> {userData.educationAndEmployment.employmentStatus}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>SECTOR OF EMPLOYMENT</p>
                  <p className='detail-text'> {userData.educationAndEmployment.sectorOfEmployment}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>DURATION OF EMPLOYMENT</p>
                  <p className='detail-text'> {userData.educationAndEmployment.durationOfEmployment}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>OFFICE EMAIL</p>
                  <p className='detail-text'> {userData.educationAndEmployment.officeEmail}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>MONTLY INCOME</p>
                  <p className='detail-text'> {userData.educationAndEmployment.monthlyIncome}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>LOAN REPAYMENT</p>
                  <p className='detail-text'> {userData.educationAndEmployment.loanRepayment}</p>
                </div>

              </div>

            </div>

            <hr />

            {/* SOCIALS */}
            <div className="user-info-section">
              <p className='header'>Socials</p>

              <div className='texts'>

                <div className='header-text'>
                  <p className='content-text'>TWITTER</p>
                  <p className='detail-text'> {userData.social.twitter}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>FACEBOOK</p>
                  <p className='detail-text'> {userData.social.facebook}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>INSTAGRAM</p>
                  <p className='detail-text'> {userData.social.instagram}</p>
                </div>

              </div>

            </div>

            <hr />

            {/* GUARANTOR */}
            <div className="user-info-section">
              <p className='header'>Socials</p>

              <div className='texts'>

                <div className='header-text'>
                  <p className='content-text'>FULL NAME</p>
                  <p className='detail-text'> {userData.guarantor.fullNames}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>PHONE NUMBER</p>
                  <p className='detail-text'> {userData.guarantor.phoneNumber}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>EMAIL ADDRESS</p>
                  <p className='detail-text'>{userData.guarantor.emails}</p>
                </div>

                <div className='header-text'>
                  <p className='content-text'>RELATIONSHIP</p>
                  <p className='detail-text'>{userData.guarantor.relationship}</p>
                </div>


              </div>

            </div>


          </div>


        </>
      )}
      
    </div>
  );
};

export default UserDetails;

