const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");

const city_name = document.getElementById("city_name")
const temp_real = document.getElementById("temp_real_val")
const temp_status = document.getElementById("temp_status")
const currDate = document.getElementById("date")
const currDay = document.getElementById("day")
// const temp = document.getElementById("temp")
const datahide = document.querySelector('.middle_layer')

getInfo = async(event) =>{
    event.preventDefault();
        const getCurrentDay = () => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        let currentTime = new Date();
        let day = weekday[currentTime.getDay()];
        return day;
      };

      const getCurrentTime = () => {
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        var now = new Date();
        var month = months[now.getMonth() + 1];
        var date = now.getDate();

        let hours = now.getHours();
        let mins = now.getMinutes();

        let periods = "AM";

        if (hours > 11) {
          periods = "PM";
          if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
          mins = "0" + mins;
        }

        return `${month} ${date} | ${hours}:${mins}${periods}`;
      };

      currDate.innerHTML = getCurrentTime();
      currDay.innerHTML = getCurrentDay();

    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Please write the name before search`;
        datahide.classList.add('data_hide')

    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=3c2979212ef609b3938cc43a92f44b17`
            const response = await fetch(url);
            const data = await response.json()
            const arrData = [data];

            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp_real.innerText = (((arrData[0].main.temp)-273.15).toFixed(1));

            const tempStatus = arrData[0].weather[0].main;
            //condition to check sunny or cloudy
            if (tempStatus == "Clear") {
                temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempStatus == "Rain" || "Light rain") {
                temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color:#feccc68;'></i>";
            }
            datahide.classList.remove('data_hide') 

        }
        catch{
            city_name.innerText = `Please enter the city name properly`;
            datahide.classList.add('data_hide')
        }      
    }
}
submitBtn.addEventListener('click',getInfo)