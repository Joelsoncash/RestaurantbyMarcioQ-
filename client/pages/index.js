import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Restaurant Management System</h1>
      <p>Select a feature to manage:</p>
      <ul>
        <li><Link href="/menu"><a>Menu Management</a></Link></li>
        <li><Link href="/orders"><a>Order Management</a></Link></li>
        <li><Link href="/inventory"><a>Inventory Management</a></Link></li>
        <li><Link href="/reservations"><a>Reservations</a></Link></li>
        <li><Link href="/billing"><a>Billing and Payment Management</a></Link></li>
        <li><Link href="/users"><a>User Management</a></Link></li>
      </ul>
    </div>
  );
};

export default HomePage;