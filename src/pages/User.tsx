import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/User.scss';
import Sidebar from '../components/Sidebar';

interface PersonalInfo {
  organisation: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status?: string;
}

interface DashboardProps {
  results: {
    educationAndEmployment: any;
    id: number;
    personalInfo: PersonalInfo;
  }[];
}

interface Organization {
  id: number;
  name: string;
}

const ITEMS_PER_PAGE = 9;

const User: React.FC<DashboardProps> = () => {
  const [results, setResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const targetStats = {
    total: 2453,
    active: 1200,
    loans: 12453,
    savings: 102453,
  };

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [usersWithLoans, setUsersWithLoans] = useState(0);
  const [usersWithSavings, setUsersWithSavings] = useState(0);

  useEffect(() => {
    const incrementStats = (
      target: number,
      setStat: React.Dispatch<React.SetStateAction<number>>,
      delay: number
    ) => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.ceil(target / 100);
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        setStat(count);
      }, delay);
    };

    incrementStats(targetStats.total, setTotalUsers, 20);
    incrementStats(targetStats.active, setActiveUsers, 20);
    incrementStats(targetStats.loans, setUsersWithLoans, 10);
    incrementStats(targetStats.savings, setUsersWithSavings, 5);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://contentapi-m9vl.onrender.com');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const filteredResults = results.filter((item) => {
    const itemString = JSON.stringify(item).toLowerCase();
    return itemString.includes(searchQuery.toLowerCase());
  });

  const totalResults = searchQuery ? filteredResults : results;
  const indexOfLastResult = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstResult = indexOfLastResult - ITEMS_PER_PAGE;
  const currentResults = totalResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(totalResults.length / ITEMS_PER_PAGE);



  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const paginationItems = [];

    // Previous button
    paginationItems.push(
      <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
    );

    paginationItems.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? 'active' : ''}
      >
        1
      </button>
    );

    if (totalPages > 1) {
      paginationItems.push(
        <button
          key={2}
          onClick={() => handlePageChange(2)}
          className={currentPage === 2 ? 'active' : ''}
        >
          2
        </button>
      );
    }

    if (totalPages > 2) {
      paginationItems.push(
        <button
          key={3}
          onClick={() => handlePageChange(3)}
          className={currentPage === 3 ? 'active' : ''}
        >
          3
        </button>
      );
    }

    if (totalPages > 3) {
      paginationItems.push(<span key="ellipsis1">...</span>);
    }

    if (totalPages >= 15) {
      paginationItems.push(
        <button
          key={15}
          onClick={() => handlePageChange(15)}
          className={currentPage === 15 ? 'active' : ''}
        >
          15
        </button>
      );
    }

    if (totalPages >= 16) {
      paginationItems.push(
        <button
          key={16}
          onClick={() => handlePageChange(16)}
          className={currentPage === 16 ? 'active' : ''}
        >
          16
        </button>
      );
    }

    // Next button
    paginationItems.push(
      <button key="next" onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
    );

    // return
    return (
      <span>
        {paginationItems}
      </span>
    );
  };


  const showingMessage = () => {
    const startResult = indexOfFirstResult + 1;
    const endResult = Math.min(indexOfLastResult, totalResults.length);

    return (
      <div className="showing-message">
        Showing
        <span className="result-container" style={{ border: '1px solid #ccc', paddingLeft: '10px', paddingRight: '10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', margin: '0 4px', height: '30px' }}>

          {startResult}
          <img src="./images/dropd.svg" alt="Description" className="dropd-icon" style={{ marginLeft: '10px' }} />
        </span>
        out of {totalResults.length}
      </div>
    );

  };
  const [organizations, setOrganizations] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('https://contentapi-m9vl.onrender.com');
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const resetFilters = () => {
    setOrganizations('');
    setUsername('');
    setEmail('');
    setDate('');
    setNumber('');
    setStatus('');
  };

  const applyFilters = () => {
    console.log('Filters applied:', { username, email, date, number, status });
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <Sidebar />
      <div className="dashboard">

        <div className='stats'>
          <h2 className='title'>Users</h2>
          <div className="user-stats-container">
            <div className="stat-box">
              <img src="./images/icon1.svg" alt="Total Users" className="stat-image" />
              <div className="stat-title">TOTAL USERS</div>
              <div className="stat-number">{totalUsers.toLocaleString()}</div>
            </div>
            <div className="stat-box">
              <img src="./images/icon2.svg" alt="Active Users" className="stat-image" />
              <div className="stat-title">ACTIVE USERS</div>
              <div className="stat-number">{activeUsers.toLocaleString()}</div>
            </div>
            <div className="stat-box">
              <img src="./images/icon3.svg" alt="Users with Loans" className="stat-image" />
              <div className="stat-title">USERS WITH LOANS</div>
              <div className="stat-number">{usersWithLoans.toLocaleString()}</div>
            </div>
            <div className="stat-box">
              <img src="./images/icon4.svg" alt="Users with Savings" className="stat-image" />
              <div className="stat-title">USERS WITH SAVINGS</div>
              <div className="stat-number">{usersWithSavings.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className='user-list-container'>


          {currentResults.length === 0 ? (
            <p>Loading API Data, please wait!</p>
          ) : (
            <div className='user-details-table'>
              <div className='user-details-row'>



                <div className='user-details-item'>

                  <p className='user-details-title' onClick={toggleDropdown}>
                    Organisation
                    <img src='images/dropdown.svg' alt='Toggle Dropdown' className='user-details-image' />
                  </p>
                  <div className='user-list-content'>
                    <ul className='ul'>
                      {currentResults.map((item) => (
                        <li className='li' key={item.id}>
                          <Link to={`/UserDetails?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className='hi'>{item.personalInfo?.organisation || 'No Organisation Provided'}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {dropdownOpen && (
                    <div className='dropdown-content'>
                      <p className='user-details-title'>Organization</p>

                      <select
                        className='status-select'
                        value={organizations}
                        onChange={(e) => setOrganizations(e.target.value)}
                      >
                        <option value=''>Select</option>
                        <option value='lendsqr'>Lendsqr</option>
                        <option value='irorun'>Irorun</option>
                        <option value='techConnect'>TechConnect</option>
                        <option value='buildzpr'>Buildzpr</option>


                      </select>

                      <p className='user-details-title'>Username</p>
                      <input
                        type='text'
                        className='user-details-input'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <p className='user-details-title'>Email</p>
                      <input
                        type='email'
                        className='user-details-input'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <p className='user-details-title'>Date</p>
                      <input
                        type='date'
                        className='user-details-input'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder='date'
                      />

                      <p className='user-details-title'>Phone Number</p>
                      <input
                        type='text'
                        className='user-details-input'
                        placeholder='Phone Number'
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />

                      <p className='user-details-title'>Status</p>
                      <select
                        className='status-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value=''>Select</option>
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                        <option value='pending'>Pending</option>
                        <option value='blacklisted'>Blacklisted</option>
                      </select>

                      <div className='button-container'>
                        <button className='reset' onClick={applyFilters}>Reset</button>
                        <button className='filter' onClick={resetFilters}>Filter</button>
                      </div>
                    </div>
                  )}
                </div>


                <div className='user-details-item'>
                  <p className='user-details-title'>User Name
                    <img src='images/dropdown.svg' alt='User Name' className='user-details-image' />
                  </p>
                  <div className='user-list-content'>
                    <ul className='ul'>
                      {currentResults.map((item) => (
                        <li className='li' key={item.id}>
                          <Link to={`/UserDetails?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className='hi'>{item.personalInfo?.userName || 'No User Name Provided'}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <div className='user-details-item'>
                  <p className='user-details-title'>Email
                    <img src='images/dropdown.svg' alt='Email' className='user-details-image' />
                  </p>
                  <div className='user-list-content'>
                    <ul className='ul'>
                      {currentResults.map((item) => (
                        <li className='li' key={item.id}>
                          <Link to={`/UserDetails?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className='date'>{item.personalInfo?.email || 'No Email Provided'}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='user-details-item'>
                  <p className='user-details-title'>Phone
                    <img src='images/dropdown.svg' alt='Phone' className='user-details-image' />
                  </p>
                  <div className='user-list-content'>
                    <ul className='ul'>
                      {currentResults.map((item) => (
                        <li className='li' key={item.id}>
                          <Link to={`/UserDetails?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p>{item.personalInfo?.phoneNumber || 'No Phone Provided'}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='user-details-item'>
                  <p className='user-details-title'>Date Joined
                    <img src='images/dropdown.svg' alt='Date Joined' className='user-details-image' />
                  </p>
                  <div className='user-list-content'>
                    <ul className='ul'>
                      {currentResults.map((item) => (
                        <li className='li' key={item.id}>
                          <Link to={`/UserDetails?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p className='date'>{item.personalInfo?.dateJoined || 'No Date Provided'}</p>

                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='user-details-item'>
                  <p className='user-details-title'>Status
                    <img src='images/dropdown.svg' alt='Status' className='user-details-image' />
                  </p>
                  <div className='user-list-content'>
                    <ul className='ul'>
                      {currentResults.map((item) => (
                        <li className='li' key={item.id}>
                          <Link to={`/UserDetails?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '5px 15px 5px 15px',
                                margin: '9px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color:
                                  item.personalInfo?.status?.toLowerCase() === 'active'
                                    ? '#155724' // Dark green text for Active
                                    : item.personalInfo?.status?.toLowerCase() === 'blacklisted'
                                      ? '#E4033B' // Dark red text for Blacklisted
                                      : item.personalInfo?.status?.toLowerCase() === 'pending'
                                        ? '#856404' // Dark yellow/brown text for Pending
                                        : item.personalInfo?.status?.toLowerCase() === 'inactive'
                                          ? '#545F7D' // Dark blue/gray text for Inactive
                                          : '#000', // Default text color
                                borderRadius: '100px',
                                minWidth: '80px',
                                backgroundColor:
                                  item.personalInfo?.status?.toLowerCase() === 'active'
                                    ? '#d4edda' // Light green for Active
                                    : item.personalInfo?.status?.toLowerCase() === 'blacklisted'
                                      ? '#F5B3BC' // Light red for Blacklisted
                                      : item.personalInfo?.status?.toLowerCase() === 'pending'
                                        ? '#fff3cd' // Light yellow for Pending
                                        : item.personalInfo?.status?.toLowerCase() === 'inactive'
                                          ? '#f0f0f0' // Light gray for Inactive
                                          : '#545F7D', // Light gray default background
                              }}
                            >
                              {item.personalInfo?.status || 'No Status Provided'}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                <ul className='ul-dot'>
                  {currentResults.map((item) => (
                    <li className='li-dot' key={item.id}>
                      <p>:</p>
                    </li>
                  ))}
                </ul>

              </div> 

            </div>

            
          )}

          



        </div>


            {/* stricly for mobile view */}
            <div className="container">
          {currentResults.length === 0 ? (
            <p>Loading Api Data please wait!</p>
          ) : (
            <ul className='ul'>
              {currentResults.map((item) => (
                <li className='li' key={item.id}>
                  <Link to={`/UserDetails?id=${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                    <p>{item.personalInfo?.organisation || 'No Organisation Provided'}</p>

                    <p>{item.personalInfo?.userName || 'No Username Provided'}</p>

                    <p>{item.personalInfo?.email || 'No Email Provided'}</p>

                    <p>{item.personalInfo?.phoneNumber || 'No Phone Number Provided'}</p>

                    <p>{item.personalInfo?.dateJoined || 'No Date joined Provided'}</p>

                    <p>
                      Status: <span
                        style={{
                          color:
                          item.personalInfo?.status === 'Active' ? '#155724' :
                          item.personalInfo?.status === 'Inactive' ? '#545F7D' :
                          item.personalInfo?.status === 'Blacklisted' ? '#E4033B':
                              item.personalInfo?.status === 'Pending' ? '#856404' :
                                  'gray'
                        }}
                      >
                        {item.personalInfo?.status || 'No Organisation Provided'}
                      </span>
                    </p>

                  </Link>
                </li>
              ))}
            </ul>

          )}

        </div>

        <div className='next'>
                {currentResults.length > 0 ? showingMessage() : 'No pages more found.'}

                <div>
                  {renderPagination()}
                </div>

        </div>

      </div>
    </div>
  );
};

export default User;



















