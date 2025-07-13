import React, { useState } from 'react'
import { useMarketData } from '../../hooks/useCrypto'

// Function to abbreviate numbers (e.g., 10K, 1M, 1.3M)
const abbreviateNumber = value => {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  let tier = (Math.log10(Math.abs(value)) / 3) | 0

  if (tier === 0) return value

  const suffix = suffixes[tier]
  const scale = Math.pow(10, tier * 3)

  const scaledValue = value / scale

  return scaledValue.toFixed(1) + suffix
}

const currencyObj = {
  usd: '$',
  eur: '€',
  gbp: '£'
}

export default function CryptoList () {
  const [displayAmount, setDisplayAmount] = useState(100)
  const [currency, setCurrency] = useState('usd')

  // Use TanStack Query hook instead of manual state management
  const {
    data: coins = [],
    isLoading: loading,
    isError: error,
    isFetching,
    refetch
  } = useMarketData(currency, displayAmount, 1)

  const currencies = ['usd', 'eur', 'gbp']

  function cycleCurrency () {
    const currentIndex = currencies.indexOf(currency)
    const nextIndex = (currentIndex + 1) % currencies.length
    setCurrency(currencies[nextIndex])
  }

  if (error) {
    return (
      <div className='p-4 text-center'>
        <div className='mb-2 text-sm text-gray-600'>
          📡 Crypto data temporarily unavailable
        </div>
        <button
          onClick={() => refetch()}
          className='text-sm text-blue-600 hover:underline'
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      {/* <div className="mb-2 text-center">
        <h4>Top {displayAmount} Crypto</h4>
      </div> */}

      <div>
        <div className='flex justify-end items-center mb-2'>
          {isFetching && !loading && (
            <div className='flex items-center text-xs text-gray-500'>
              <span className='animate-pulse'>↻</span>
              <span className='ml-1'>Updating...</span>
            </div>
          )}
        </div>

        <table className='w-full'>
          <thead>
            <tr>
              <th>#</th>
              <th className='col-span-2'>Coin</th>
              <th
                className='text-right cursor-pointer hover:bg-gray-100'
                onClick={cycleCurrency}
              >
                Price {currencyObj[currency]}
              </th>
              <th className='text-right'>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? // Show loading skeleton rows
                Array.from({ length: displayAmount }, (_, index) => (
                  <tr key={`loading-${index}`}>
                    <td className='text-center border'>
                      <span className='animate-pulse'>...</span>
                    </td>
                    <td className='border'>
                      <div className='flex items-center space-x-2'>
                        <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse'></div>
                        <span className='animate-pulse'>Loading...</span>
                      </div>
                    </td>
                    <td className='text-right border'>
                      <span className='animate-pulse'>...</span>
                    </td>
                    <td className='text-right border'>
                      <span className='animate-pulse'>...</span>
                    </td>
                  </tr>
                ))
              : coins.map((coin, index) => (
                  <tr key={coin.id}>
                    <td className='border'>{index + 1}</td>
                    <td className='col-span-2 border'>
                      <div className='flex items-center space-x-2'>
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className='w-4 h-4 rounded-full'
                          style={{ margin: '1px' }}
                        />
                        <span className='font-bold text-md'>{coin.symbol}</span>
                      </div>
                    </td>
                    <td className='text-right border'>
                      {coin.current_price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className='text-right border'>
                      {abbreviateNumber(coin.market_cap)}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
