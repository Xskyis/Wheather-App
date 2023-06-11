import { CircularProgress, Slide, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [cityName, setCityName] = useState('Malang')
  const [inputText, setInputText] = useState('')
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=600bf87aa9cc95083e724eeb14383486&units=metric`)
      .then(res => {
        if (res.status === 200) {
          error && setError(false)
          return res.json()
        } else {
          throw new Error('Something went wrong!')
        }
      })
      .then(data => {
        setData(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [cityName, error])

  const handleSearch = e => {
    if (e.key === 'Enter') {
      setCityName(e.target.value)
      setInputText('')
    }
  }

  return (
    <div className='bg_image'> 
      <div className='card'>
        {!loading ? (
          <>
            <h1 className='title'>Mini Wheater Forecast</h1>
            <p className='author'><span>by</span> nabilfgrza</p>
            <TextField
              variant='filled'
              label='Search location'
              className='input'
              value={inputText}
              error={error}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleSearch}
            />
            {data.name && <h1 className='city'>{data.name}</h1>}
            {data.weather && (
              <div className='group'>
                <img
                  className='icon'
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt=''
                />
                <h1>{data.weather[0].main}</h1>
              </div>
            )}
            {data.main && (
              <h1 className='temp'>{data.main.temp.toFixed()} °C</h1>
            )}
            <Slide direction='right' timeout={800} in={!loading}>
              <div className='box_container'>
                {data.main && (
                  <>
                    <div className='box'>
                      <p>Humidity</p>
                      <h1>{data.main.humidity.toFixed()} %</h1>
                    </div>
                    <div className='box'>
                      <p>Wind</p>
                      <h1>{data.wind.speed.toFixed()} km/h</h1>
                    </div>
                    <div className='box'>
                      <p>Feels Like</p>
                      <h1>{data.main.feels_like.toFixed()} °C</h1>
                    </div>
                  </>
                )}
              </div>
            </Slide>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  )
}

export default App
