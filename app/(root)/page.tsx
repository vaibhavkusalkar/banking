import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
    const loggedIn = { firstName: 'Vaibhav', lastName: 'Kusalkar', email: "vaibhavkusalkar@gmail.com"};

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'> 
                <HeaderBox
                    type = 'greeting'
                    title = 'Welcome'
                    user = {loggedIn?.firstName || 'Guest'}
                    subtext = 'Access and manage your account and transactions effiiently.'
                />
            </header>
            <TotalBalanceBox 
                accounts = {[]}
                totalBanks = {1}
                totalCurrentBalance = {1250.35}
            />

            Recent Transactions
        </div>

        <RightSidebar
            user = {loggedIn}
            transactions = {[]}
            banks = {[{currentBalance: 125.20}, {}]}
        />
    </section>
  )
}

export default Home