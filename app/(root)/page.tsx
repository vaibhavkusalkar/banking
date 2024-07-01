import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { parseStringify } from '@/lib/utils';
import React from 'react'

const Home = async () => {
    const loggedInUser = await getLoggedInUser();
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'> 
                    <HeaderBox
                        type = 'greeting'
                        title = 'Welcome'
                        user = {loggedInUser?.name || 'Guest'}
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
                user = {parseStringify(loggedInUser)}
                transactions = {[]}
                banks = {[
                  {
                    $id: "bank_67890",
                    accountId: "acc_12345",
                    bankId: "bank_67890",
                    accessToken: "access_abcdef123456",
                    fundingSourceUrl: "https://example.com/funding-source",
                    userId: "user_12345",
                    sharableId: "share_54321",
                    id: "acc_12345",
                    availableBalance: 1500.75,
                    currentBalance: 2000.00,
                    officialName: "Checking Account",
                    mask: "6789",
                    institutionId: "inst_12345",
                    name: "My Checking Account",
                    type: "depository",
                    subtype: "checking",
                    appwriteItemId: "item_67890",
                  }]}

            />
        </section>
  )
}

export default Home