const imageBtn = document.getElementById('image-btn');
const asteroidBtn = document.getElementById('asteroid-btn');
const newsBtn = document.getElementById('news-btn');
const resultDiv = document.getElementById('result');

const apiKey = 'IYW7DEdA6tFlrPPjXbIr3KDel9ncY8xA6QTRTgW1'; // get an API key from NASA API website

// function to fetch the NASA image of the day
function getNasaImage() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
      `;
        });
}

// function to fetch asteroid info
function getAsteroidInfo() {
  fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.near_earth_objects.length);
      const asteroid = data.near_earth_objects[randomIndex];

      const missDistance = asteroid.close_approach_data[0].miss_distance.kilometers;
      const missDistanceStr = typeof missDistance === 'number' ? missDistance.toFixed(2) + ' km' : 'Unknown';

      resultDiv.innerHTML = `
        <h2>${asteroid.name}</h2>
        <p>Diameter: ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
        <p>Closest approach date: ${asteroid.close_approach_data[0].close_approach_date}</p>
        <p>Miss distance: ${missDistanceStr}</p>
      `;
    });
}

// function to fetch astronomy news
function getAstronomyNews() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=5`)
        .then(response => response.json())
        .then(data => {
            let newsHtml = '<ul>';
            data.forEach(item => {
                newsHtml += `
          <li>
            <h3>${item.title}</h3>
            <img src="${item.url}" alt="${item.title}">
            <p>${item.explanation}</p>
          </li>
        `;
            });
            newsHtml += '</ul>';

            resultDiv.innerHTML = newsHtml;
        });
}

// add event listeners to the buttons
imageBtn.addEventListener('click', getNasaImage);
asteroidBtn.addEventListener('click', getAsteroidInfo);
newsBtn.addEventListener('click', getAstronomyNews);
