import React, { useState } from 'react';
import '../styles/Sidebar.scss';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <> 
        {/* button */}
            <button className="hamburger" onClick={toggleSidebar}>
                <span className={`bar ${isOpen ? 'change' : ''}`}></span>
                <span className={`bar ${isOpen ? 'change' : ''}`}></span>
                <span className={`bar ${isOpen ? 'change' : ''}`}></span>
            </button>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>

                <div className="category">
                    <ul className="subcategory-list">
                        <li className="subcategory">
                            <img src="./images/v9.svg" className="subcategory-icon" alt="Icon" />
                            Switch Organization
                            <img src="./images/left.svg" className="right" alt="Dropdown Icon" />
                        </li>
                    </ul>
                </div>

                <div className="category">
                    <ul className="subcategory-list">
                        <a href="/Dashboard">
                        <li className="subcategory">
                            <img src="./images/v1.svg" className="subcategory-icon" />
                            Dashboard
                        </li>
                        </a>
                    </ul>
                </div>

                <div className="category">
                    <h3 className="category-title">CUSTOMERS</h3>
                    <ul className="subcategory-list">
                        <a href="/User">
                            <li className="subcategory">
                                <img src="./images/v2.svg" className="subcategory-icon" />
                                Users
                            </li>
                        </a>
                        <li className="subcategory">
                            <img src="./images/v3.svg" className="subcategory-icon" />
                            Guarantors
                        </li>
                        <li className="subcategory">
                            <img src="./images/v4.svg" className="subcategory-icon" />
                            Loans
                        </li>
                        <li className="subcategory">
                            <img src="./images/v5.svg" className="subcategory-icon" />
                            Decision Models
                        </li>
                        <li className="subcategory">
                            <img src="./images/v6.svg" className="subcategory-icon" />
                            Savings
                        </li>
                        <li className="subcategory">
                            <img src="./images/v10.svg" className="subcategory-icon" />
                            Loan Requests
                        </li>
                        <li className="subcategory">
                            <img src="./images/v7.svg" className="subcategory-icon" />
                            Whitelist
                        </li>
                        <li className="subcategory">
                            <img src="./images/v8.svg" className="subcategory-icon" />
                            Karma
                        </li>
                    </ul>
                </div>

                <div className="category">
                    <h3 className="category-title">BUSINESSES</h3>
                    <ul className="subcategory-list">
                        <li className="subcategory">
                            <img src="./images/v9.svg" className="subcategory-icon" />
                            Organization
                        </li>
                        <li className="subcategory">
                            <img src="./images/v10.svg" className="subcategory-icon" />
                            Loan Products
                        </li>
                        <li className="subcategory">
                            <img src="./images/v11.svg" className="subcategory-icon" />
                            Savings Products
                        </li>
                        <li className="subcategory">
                            <img src="./images/v12.svg" className="subcategory-icon" />
                            Fees and Charges
                        </li>
                        <li className="subcategory">
                            <img src="./images/v13.svg" className="subcategory-icon" />
                            Transactions
                        </li>
                        <li className="subcategory">
                            <img src="./images/v14.svg" className="subcategory-icon" />
                            Services
                        </li>
                        <li className="subcategory">
                            <img src="./images/v15.svg" className="subcategory-icon" />
                            Service Account
                        </li>
                        <li className="subcategory">
                            <img src="./images/v16.svg" className="subcategory-icon" />
                            Settlements
                        </li>
                        <li className="subcategory">
                            <img src="./images/v17.svg" className="subcategory-icon" />
                            Reports
                        </li>
                    </ul>
                </div>

                <div className="category">
                    <h3 className="category-title">SETTINGS</h3>
                    <ul className="subcategory-list">
                        <li className="subcategory">
                            <img src="./images/v18.svg" className="subcategory-icon" />
                            Preferences
                        </li>
                        <li className="subcategory">
                            <img src="./images/v19.svg" className="subcategory-icon" />
                            Fees and Pricing
                        </li>
                        <li className="subcategory">
                            <img src="./images/v20.svg" className="subcategory-icon" />
                            Audit Logs
                        </li>
                    </ul>
                </div>
                <hr />

                <div className="category">
                    <ul className="subcategory-list">
                        <li className="subcategory">
                            <img src="./images/logout.svg" className="subcategory-icon" />
                            <a href="/" className='log'>
                                logout
                            </a>
                        </li>
                        <li className="subcategory">
                            <img src="./images/v19.svg" className="subcategory-icon" />
                            Fees and Pricing
                        </li>
                        <li className="subcategory">
                            <img src="./images/v20.svg" className="subcategory-icon" />
                            Audit Logs
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default Sidebar;
