/* Global Variables */

const myURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const myKey = ",&appid=547c4e2b5631146c3151a0b7052ffdf2&units=metric";
const zipEl = document.getElementById("zip");
const feelingsEL = document.getElementById("feelings");
const generatEL = document.getElementById("generate");

// Create a new date instance dynamically with JS
const d = new Date();

const today = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// genral btn
generatEL.addEventListener("click", onSomit);

function onSomit() {
  const url = `${myURL}${zipEl.value}&appid${myKey}&units=metric`;
  getWeather(url)
    .then((data) => {
      sendToServer({
        temp: data.main.temp,
        date: today,
        feelings: feelingsEL.value,
      });
    })
    .then((data) => {
      console.log(data);
      updateUI();
    });
}

// Async get
async function getWeather(url) {
  const request = await fetch(url);
  try {
    const result = await request.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

// Async post to server
async function sendToServer(data) {
  const request = await fetch("/send", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await request.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

//updateUI
async function updateUI() {
  const request = await fetch("/data");

  try {
    const result = await request.json();
    document.getElementById("date").innerHTML = `date:${result.Date}`;
    document.getElementById("temp").innerHTML = `temperatuer:${result.temp}`;
    document.getElementById("content").innerHTML = `Ifeel:${result.content}`;
    return result;
  } catch (error) {
    console.log(error);
  }
}
