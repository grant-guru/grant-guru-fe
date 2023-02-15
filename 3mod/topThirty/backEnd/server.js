const express = require("express");
const app = express();
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.locals.title = "Reid's Top Thirty";

app.get("/", (request, response) => {
  response.send("Heyo! From Reid!");
});

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}.`
  );
});

app.locals.artists = [
  {
    id: "1",
    name: "The Beatles",
    image:
      "https://charts-static.billboard.com/img/1970/12/the-beatles-ism-name-chart-6xr-344x344.jpg",
    rank: 1,
  },
  {
    id: "2",
    name: "The Rolling Stones",
    image:
      "https://charts-static.billboard.com/img/1964/05/the-rolling-stones-pxx-344x344.jpg",
    rank: 2,
  },
  {
    id: "3",
    name: "Elton John",
    image:
      "https://charts-static.billboard.com/img/1971/12/elton-john-m6x-name-chart-yw2-344x344.jpg",
    rank: 3,
  },
  {
    id: "4",
    name: "Mariah Carey",
    image:
      "https://charts-static.billboard.com/img/1990/12/mariah-carey-tgq-344x344.jpg",
    rank: 4,
  },
  {
    id: "5",
    name: "Madonna",
    image:
      "https://charts-static.billboard.com/img/2017/05/madonna-344x344.jpg",
    rank: 5,
  },
  {
    id: "6",
    name: "Barbra Streisand",
    image:
      "https://charts-static.billboard.com/img/1970/12/barbra-streisand-98o-name-chart-7km-344x344.jpg",
    rank: 6,
  },
  {
    id: "7",
    name: "Michael Jackson",
    image:
      "https://charts-static.billboard.com/img/1971/10/michael-jackson-9to-344x344.jpg",
    rank: 7,
  },
  {
    id: "8",
    name: "Taylor Swift",
    image:
      "https://charts-static.billboard.com/img/2006/12/taylor-swift-5wo-name-chart-q3b-344x344.jpg",
    rank: 8,
  },
  {
    id: "9",
    name: "Stevie Wonder",
    image:
      "https://charts-static.billboard.com/img/1970/12/stevie-wonder-12f-344x344.jpg",
    rank: 9,
  },
  {
    id: "10",
    name: "Chicago",
    image:
      "https://charts-static.billboard.com/img/1970/12/chicago-9pj-artist-chart-jw3-344x344.jpg",
    rank: 10,
  },
];

app.get("/api/v1/artists", (request, response) => {
  console.log(response);
  const { artists } = app.locals;

  response.json({ artists });
});

app.get("/api/v1/artists/:id", (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const artist = app.locals.artists.find((artist) => artist.id === id);
  if (!artist) {
    return response.status(404).send("No id Matches");
  } else {
    response.status(200).json(artist);
  }
});

app.post("/api/v1/artists", (request, response) => {
  const id = Date.now();
  const artist = request.body;
  for (let requiredParameter of ["name", "rank"]) {
    if (!artist[requiredParameter]) {
      response.status(422).send({
        error: `Expected format: { name: <String>, rank: <Number> }. You're missing a "${requiredParameter}" property.`,
      });
    }
  }
  const { name, rank } = artist;
  app.locals.artists.push({ id, name, image, rank });
  response.status(201).json({ id, name, rank });
});
