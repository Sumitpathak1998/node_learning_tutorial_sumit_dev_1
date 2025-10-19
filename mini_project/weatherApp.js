import { error } from "console";
import { LOADIPHLPAPI } from "dns";
import readLine from "readline/promises";

const rl = readLine.createInterface({
    input:process.stdin,
    output:process.stdout
})
const apiKey = "51388639e590f8dc71bfc642c5f17f4e";
const BASEURL = "https://api.openweathermap.org/data/2.5/weather";


const getWeather = async(city) => {
    const url = `${BASEURL}?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        console.log(response);
        if(!response.ok) {
            throw new Error('City not found,Please check the city name');
        }
        const weatherData = await response.json();
        console.log(`Weather Report of ${city}`);
        for (const key in weatherData) {
            console.log(`${key} : ${weatherData[key]}`);
        }
    } catch (error) {
        console.log(error);
    }
}

const city = await rl.question("Enter the City name to get its Weather : ");
await getWeather(city);
rl.close();