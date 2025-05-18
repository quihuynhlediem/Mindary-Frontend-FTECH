"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Header from '@/components/general/Header';
import DataBlock from '@/components/insight/DataBlock';
import MoodChart from '@/components/insight/MoodChart';
import useAuthStore from '@/hooks/useAuthStore';
// import ApexRadialChart from '@/components/insight/ApexRadialChart';

import dynamic from 'next/dynamic';

// Dynamically import ApexRadialChart with SSR disabled
const ApexRadialChart = dynamic(() => import('@/components/insight/ApexRadialChart'), {
  ssr: false, // Disable server-side rendering for this component
});

const Insight = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const router = useRouter();

  // Redirect to login page
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Prevent rendering while redirecting
  {
    if (!isAuthenticated) {
      return null
    }

    const emojiDict = {
      "streak": '⚡',
      "fire": '🔥',
      "calendar": '📆'
    }

    return (
      <div className='relative max-w-screen min-w-screen min-h-screen py-14 bg-primary space-y-6'>
        <Header page="Insights" />
        <div className='px-4 flex gap-2'>
          <DataBlock emoji={emojiDict['streak']} data={65} field='Longest streak' />
          <DataBlock emoji={emojiDict['fire']} data={58} field='Current streak' />
          <DataBlock emoji={emojiDict['calendar']} data={482} field='Lifetime days' />
        </div>
        <MoodChart />

        <ApexRadialChart />
      </div>
    );
  }
}

export default Insight;