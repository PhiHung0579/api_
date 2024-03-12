const asyncRequest = require("async-request")

const getWeather = async (location) => {
    const access_key = "ed96a839e636cf34640d12928ff65cdb"
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`
    const res = await asyncRequest(url);
    const data = JSON.parse(res.body)

    try {
        const weather = {
            isSuccess: true,
            region: data.location.region,
            country: data.location.country,

            temperature: data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover: data.current.cloudcover,
        }
        console.log(weather)
        return weather;
    } catch (error) {
        console.log(error);
        return {
            isSuccess: false,
            error,
        }


    }

}


const express = require("express");//khai bao thu vien express (server)
const app = express();
const path = require("path");//thu vien de lay hinh anh

const pathPublic = path.join(__dirname, "./public")
app.use(express.static(pathPublic))

app.get("/", async (req, res) => {
    const params = req.query;
    const location = params.address;
    const weather = await getWeather(location)
    console.log(weather)
    res.render("weather", {
        region: weather.region,
        country: weather.country,
        temperature: weather.temperature,
        wind_speed: weather.wind_speed,
        cloudcover: weather.cloudcover,
        precip: weather.precip,
    })
})


app.set("view engine", "hbs")
const port = 7000;
app.listen(port, () => {
    console.log(`app run on: ${port}`)
})