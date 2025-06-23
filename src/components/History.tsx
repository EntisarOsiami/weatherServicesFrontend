import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { getWeatherHistory, type WeatherHistoryItem } from '../services/history'
import {
    RefreshCw,
    Calendar,
} from 'lucide-react'

interface HistoryState {
    items: WeatherHistoryItem[]
    loading: boolean
}

function History(): React.JSX.Element {    
    const [state, setState] = useState<HistoryState>({
        items: [],
        loading: true,
    })

    const loadHistory = async () => {
        setState(prev => ({ ...prev, loading: true }))

        try {
            const historyData = await getWeatherHistory({ sort: '-requestedAt' })

            setState(prev => ({
                ...prev,
                items: historyData,
                loading: false
            }))
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false
            }))
        }
    }
    useEffect(() => {
        loadHistory()
    }, [])

    const formatDate = (dateString: string) => new Date(dateString).toLocaleString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })


    const formatTemp = (temp: number) => `${Math.round(temp)}°C`


    if (state.loading && state.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <RefreshCw className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading your weather history...</p>
            </div>
        )
    }

    if (state.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Calendar className="h-16 w-16 text-muted-foreground" />
                <div className="text-lg font-medium text-muted-foreground">No weather history found</div>
                <p className="text-sm text-muted-foreground">start checking weather to see your history here</p>
            </div>
        )
    } return (
        <div className="space-y-6">

            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-primary" />
                    Weather History
                </h1>
                <p className="text-muted-foreground">Your recent weather searches</p>
            </header>      
            
            <section className="grid gap-4 sm:gap-6">
                {state.items.map((item) => (
                    <Card key={item.requestedAt} className="bg-slate-50">
                         
                         <CardHeader className="pb-3">
                            <div className="space-y-1">
                                <CardTitle className="text-lg sm:text-xl font-bold">
                                    {item.weather.location || `unknown location`}
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    {formatDate(item.requestedAt)}
                                </CardDescription>
                            </div>
                        </CardHeader>

                          <CardContent className="pt-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="text-2xl sm:text-3xl font-bold">
                                        {formatTemp(item.weather.tempC)}
                                    </div>
                                    <div className="text-sm text-muted-foreground capitalize">
                                        {item.weather.description}
                                    </div>
                                </div>
                                <div className="text-left sm:text-right space-y-1">
                                    <div className="text-xs font-medium text-muted-foreground">Coordinates</div>
                                    <div className="text-sm text-muted-foreground">
                                        {item.lat >= 0 ? `${item.lat.toFixed(2)}°N` : `${Math.abs(item.lat).toFixed(2)}°S`}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {item.lon >= 0 ? `${item.lon.toFixed(2)}°E` : `${Math.abs(item.lon).toFixed(2)}°W`}
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                    </Card>
                ))}
            </section>
        </div>
    )
}

export default History