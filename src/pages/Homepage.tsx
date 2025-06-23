import React, { useState } from 'react'
import History from '@/components/History'
import WeatherForm from '@/components/WeatherForm'

function Homepage(): React.JSX.Element {
  const [refreshHistory, setRefreshHistory] = useState(0)
  
  const handleWeatherFetched = () => {
    setRefreshHistory(prev => prev + 1)
  }
  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <WeatherForm onWeatherFetched={handleWeatherFetched} />
        </div>
        <div className="xl:col-span-2">
          <History key={refreshHistory} />
        </div>
      </div>
    </div>
  )
}

export default Homepage
