import React, { useState, useEffect } from 'react'
import {
  useBitcoinPrice,
  useEthereumPrice,
  useSolanaPrice
} from '../hooks/useCrypto'
import LastGitPush from '../components/LastGitPush'
import ESTtime from '../components/ESTtime'
import ConsoleCrypto from '../components/ConsoleCrypto'
import SolanaAlt from '../components/icons/SolanaAlt'

export default function WelcomeContent () {
  const [lastPushTime, setLastPushTime] = useState(null)
  const [dataErrors, setDataErrors] = useState({})
  const [openCrypto, setOpenCrypto] = useState(false)

  // Use TanStack Query hooks for crypto prices
  const { data: btcPrice = '--', isError: btcError } = useBitcoinPrice()
  const { data: ethPrice = '--', isError: ethError } = useEthereumPrice()
  const { data: solPrice = '--', isError: solError } = useSolanaPrice()

  useEffect(() => {
    const fetchData = async () => {
      const errors = {}

      try {
        const pushTime = await LastGitPush()
        setLastPushTime(pushTime)
      } catch (error) {
        console.warn('Failed to fetch last push time:', error)
        setLastPushTime(null)
        errors.github = true
      }

      setDataErrors(errors)
    }

    fetchData()
  }, [])

  // Update data errors when crypto queries fail
  useEffect(() => {
    setDataErrors(prev => ({
      ...prev,
      btc: btcError,
      eth: ethError,
      sol: solError
    }))
  }, [btcError, ethError, solError])

  const toggleCrypto = () => {
    setOpenCrypto(curr => !curr)
  }

  return (
    <div className='text-white cursor-not-allowed'>
      <pre className='text-center text-white bg-black'>
        <div className='pre-extra'>
          <div className='flex'>
            <div className='flex-1 text-left'>cherrydub©</div>

            <div
              style={{ cursor: 'pointer' }}
              onClick={() => toggleCrypto()}
              className='flex-1 text-right border-t-0 border-x-0'
            >
              {openCrypto ? (
                'close [x]'
              ) : (
                <>
                  <i class='lab la-bitcoin'></i> {btcPrice}{' '}
                  <i class='lab la-ethereum'></i> {ethPrice}{' '}
                  <SolanaAlt className='inline self-center pb-[2px] size-[9px]' />{' '}
                  {solPrice}
                  {/* Only show emoji if both prices are valid numbers */}
                  {/* {btcPrice !== '--' &&
                  ethPrice !== '--' &&
                  !isNaN(ethPrice) &&
                  !isNaN(btcPrice) &&
                  ethPrice > 1800 &&
                  btcPrice > 27000
                    ? ' 🙂'
                    : btcPrice !== '--' &&
                      ethPrice !== '--' &&
                      !isNaN(ethPrice) &&
                      !isNaN(btcPrice)
                    ? ' 🙃'
                    : ''} */}
                </>
              )}
            </div>
          </div>
          <div>{openCrypto && <ConsoleCrypto />}</div>
          <div className='text-left'>
            <ESTtime />
          </div>
          <br />
          <div className='flex'>
            <div className='flex-initial'>Latest push:</div>
            <div className='flex-grow text-right'>
              {lastPushTime
                ? `${lastPushTime.split('T')[0]} @ ${
                    lastPushTime.split('T')[1].substring(0, 5) + ' UTC'
                  }`
                : dataErrors.github
                ? 'offline'
                : 'Loading...'}
            </div>
          </div>
          {/* Small error indicator if any data failed to load */}
          {Object.keys(dataErrors).length > 0 && (
            <div className='mt-1 text-xs text-right text-gray-400'>
              {dataErrors.btc && '₿'}
              {dataErrors.eth && 'Ξ'}
              {dataErrors.sol && '◎'}
              {dataErrors.github && '📡'} offline
            </div>
          )}
        </div>

        {`
               .__                               
__  _  __ ____ |  |   ____  ____   _____   ____  
\\ \\/ \\/ // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\ 
 \\     /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/ 
  \\/\\_/  \\___  >____/\\___  >____/|__|_|  /\\___  >
             \\/          \\/            \\/     \\/
      `}

        <div className='text-left pre-extra'>
          C:\WINDOWS{'>'}
          <span className='animate-blink'>_</span>
        </div>
      </pre>
    </div>
  )
}
