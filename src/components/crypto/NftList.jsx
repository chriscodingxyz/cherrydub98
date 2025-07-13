import React, { useState } from 'react'
import Bitcoin from '../icons/Bitcoin'
import Ethereum from '../icons/Ethereum'
import Solana from '../icons/Solana'
import { useNftCollections } from '../../hooks/useNft'
import { getDecimalPrecision } from '../../services/nftService'

const MAX_NAME_LENGTH = 15

const handleImageError = event => {
  event.target.src =
    'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png'
}

const abbreviateNumber = value => {
  const suffixes = ['', 'k', 'M', 'B', 'T']
  let tier = (Math.log10(Math.abs(value)) / 3) | 0

  if (tier === 0) return value

  const suffix = suffixes[tier]
  const scale = Math.pow(10, tier * 3)

  const scaledValue = value / scale

  return scaledValue.toFixed(1) + suffix
}

// Currency icon mapping function
const getCurrencyIcon = currency => {
  const iconProps = { className: 'inline w-3 h-3 ml-1' }

  switch (currency?.toLowerCase()) {
    case 'btc':
    case 'bitcoin':
      return <Bitcoin {...iconProps} />
    case 'eth':
    case 'ethereum':
      return <Ethereum {...iconProps} />
    case 'sol':
    case 'solana':
      return <Solana {...iconProps} />
    default:
      return <span className='ml-1 text-xs'>{currency?.toUpperCase()}</span>
  }
}

export default function NftList () {
  const [inNative, setInNative] = useState(true)

  // Use TanStack Query for caching and data management
  const {
    data: nftCollections = [],
    isLoading,
    isError,
    error,
    isFetching,
    isStale
  } = useNftCollections()

  // Show error state
  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center p-4'>
        <img
          src='https://win98icons.alexmeub.com/icons/png/error-0.png'
          alt='Error'
          width='48'
        />
        <p className='mt-2 text-center'>NFT data temporarily unavailable</p>
        <p className='text-xs text-center text-gray-600'>
          {error?.message || 'API connection failed'}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Show loading indicator only on initial load, not background refetch */}
      {isLoading ? (
        <div className='flex flex-col justify-center items-center'>
          <p>
            <img
              src='https://win98icons.alexmeub.com/icons/png/world_network_directories-4.png'
              alt='Loading'
            />
          </p>
          <br />
          <p className='flex'>
            Fetching from{' '}
            <a
              href='https://nftpricefloor.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                style={{
                  width: '20px',
                  border: '1px solid black',
                  marginLeft: '2px'
                }}
                src='https://pbs.twimg.com/profile_images/1671145224565841920/LLJEyIe__400x400.jpg'
                alt='NFT Price Floor'
              />
            </a>
          </p>
          <br />
        </div>
      ) : nftCollections && nftCollections.length > 0 ? (
        // Render NFT data with background refresh indicator
        <div>
          <div className='flex justify-end items-center'>
            {isFetching && !isLoading && (
              <div className='flex items-center text-xs text-gray-500'>
                <span className='animate-pulse'>↻</span>
                <span className='ml-1'>Updating...</span>
              </div>
            )}
          </div>
          {/* currency{" "}
          <select
            name=""
            id=""
            //  onChange={currencyOnChange} value={currency}
          >
            <option value="usd">$</option>
            <option value="gbp">£</option>
            <option value="eur">€</option>
          </select> */}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th className=''>Name</th>
                <th
                  onClick={() => setInNative(curr => !curr)}
                  className='text-right cursor-pointer'
                >
                  Floor {!inNative && <i class='las la-dollar-sign'></i>}
                </th>
                <th className='text-right'>Supply</th>
                {/* <th>MCap {inEth ? "ETH" : "USD"}</th> */}
              </tr>
            </thead>
            <tbody>
              {nftCollections.map(item => (
                <tr key={item.ranking}>
                  <td className='border'>{item.ranking}</td>
                  <td className='border'>
                    <div className='flex'>
                      <div>
                        <img
                          style={{
                            border: '1px solid black',
                            width: '20px',
                            height: '20px',
                            padding: '0px',
                            margin: '1px',
                            objectFit: 'cover'
                          }}
                          onError={handleImageError}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className='ml-1 font-bold'>
                        {item.name.length > MAX_NAME_LENGTH ? (
                          <a
                            href={item.collectionUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {`${item.name.slice(0, MAX_NAME_LENGTH)}...`}
                          </a>
                        ) : (
                          <a
                            href={item.collectionUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {item.name}
                          </a>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className='text-right border'>
                    {inNative ? (
                      <>
                        {item.floorNative
                          ? item.floorNative.toFixed(
                              getDecimalPrecision(item.nativeCurrency)
                            )
                          : '0.' +
                            '0'.repeat(
                              getDecimalPrecision(item.nativeCurrency)
                            )}
                        {getCurrencyIcon(item.nativeCurrency)}
                      </>
                    ) : (
                      <>
                        ${item.floorUsd ? item.floorUsd.toLocaleString() : '0'}
                      </>
                    )}
                  </td>
                  <td className='text-right border'>
                    {item.totalSupply.toLocaleString()}
                  </td>
                  {/* {inEth ? (
                    <td>
                      {Number(
                        (item.floorEth * item.totalSupply).toFixed(0)
                      ).toLocaleString()}{" "}
                      E
                    </td>
                  ) : (
                    <td>
                      $
                      {abbreviateNumber(
                        item.floorUsd * item.totalSupply
                      ).toLocaleString()}
                    </td>
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center p-4'>
          <img
            src='https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-3.png'
            alt='No Data'
            width='48'
          />
          <p className='mt-2 text-center'>No NFT collections found</p>
          <p className='text-xs text-center text-gray-600'>
            No BTC/ETH/SOL collections available
          </p>
        </div>
      )}
    </>
  )
}
