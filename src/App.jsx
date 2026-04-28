import { useEffect, useState } from "react";
import Swal from "sweetalert2";

{
  /* States on to select the city and the other to set the wather with the info retrievede from te api */
}

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_APIKEY;

  useEffect(() => {
    Swal.fire({
      title:
        "This is Weatherson, to play with weather and locations",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );
      const data = await res.json();
  /*     console.log(data); */
      if (data.cod === 200) {
        setWeather({
          name: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          sensation: data.main.feels_like,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
          lon: data.coord.lon,
          lat: data.coord.lat,
        });
      } else {
        Swal.fire({
          title:
            "This city might not exist or is mispelled... Please Try again!",
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
          },
        });

        setWeather(null);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Server Error",
        showClass: {
          popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
        },
      });
    }
  };

 const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

  return (
    <>
    {/* Background */}
<div  style={{
    backgroundImage: `url('https://pdr-assets.b-cdn.net/collections/maps-from-geographicus/745px-1739_Bretez_-_Turgot_View_and_Map_of_Paris2C_France_28c._1900_Taride_issue29_-_Geographicus_-_Paris-turgot-1909.jpg?fit=max&w=2400')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    inset: 0,
    zIndex: -2,
  }}>
    <div  style={{
    backgroundColor: "#2e1d8a", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    opacity: .8,
  }}></div>
        <h1 className="text-start px-5  text-white  font-bold py-1 hidden md:block">Weatherson - {today} </h1>
      <div className="flex flex-col md:flex-row justify-evenly items-center  m-3 ">
        <div className="flex flex-col items-center justify-center align-center">
          <div className="border border-stone-400/40  bg-indigo-400/50 z-0 rounded-2xl p-2 mt-1 shadow-2xl">
            <div className=" flex justify-center items-center md:mt-5">
              <input
                className=" h-10 border-gray-300 border rounded-2xl mr-10 pl-4 bg-white"
                type="text"
                placeholder="Pick a city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                className=" bg-gray-900/30 border hover:border-amber-400 rounded-2xl px-3 h-10 text-white text-xl not-only:font-bold transition-all duration-300 shadow-md hover:bg-indigo-500 hover:px-4 hover:animate-pulse"
                onClick={fetchWeather}
              >
                Search
              </button>
            </div>

            {weather ? (
              <div className="border border-indigo-500/60 rounded-3xl m-3 flex flex-col md:mt-10 hover:bg-indigo-500/60 hover:text-white hover:px-2 hover:md:px-20 transition-all duration-600 shadow-2xl">
                <div className="flex jsutify-evenly items-center mx-auto pt-2">
                  {" "}
                  <a
                    className="p-3"
                    href={
                      weather
                        ? `https://www.google.com/maps?q=${weather.lat},${weather.lon}`
                        : `https://en.wikipedia.org/wiki/${name}`
                    }
                    target="_blank"
                  >
                    <h3 className="font-bold text-2xl text-center hover:text-indigo-200 transition-all duration-400">
                      {weather.name}
                    </h3>
                  </a>
                  <h4 className="text-2xl font-bold text-center">
                    ({weather.country})
                  </h4>
                </div>

                <div className="mx-auto">
                  <img
                    className="h-20 w-20 animate-bounce mx-auto transition-all duration-300"
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    onError={(e) =>
                      console.error("Icon failed to load:", e.currentTarget.src)
                    }
                  />
                </div>

                <div className="text-xl font-bold flex flex-col gap-4 text-start mx-auto">
                  <p>Today: {weather.description}</p>
                  <p> Temp: {weather.temp} °C</p>
                  <p>Feels like: {weather.sensation} °C</p>
                  <p>Humidity: {weather.humidity}%</p>
                  <p>Wind: {weather.wind}m/s</p>
                </div>

                <div className="p-3">
                  <iframe
                    className="w-75 h-75 m-10"
                    src={`https://www.google.com/maps?q=${weather?.lat},${weather?.lon}&z=12&t=k&output=embed`}
                    style={{ border: "0", borderRadius: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="hover:animate-pulse border border-stone-400/80 bg-indigo-300 border-3xl mt-10 p-10 rounded-xl">
                <h3 className="text-2xl text-center text-white font-bold">
                  Hawaii perhaps?
                </h3> 
              </div>
            )}
          </div>
        </div>
      </div>
</div>
    </>
  );
};

export default App;
