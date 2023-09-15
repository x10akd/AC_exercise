const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const movieList = require("./movies.json");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { movies: movieList.results });
});

app.get("/search", (req, res) => {
  console.log('req.query', req.query)
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie =>{
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render("index", { movies: movies, keyword: keyword});
});

app.get("/movies/:movie_id", (req, res) => {
  // console.log('req.params.movie_id', req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  // const movieOne = {
  //   id: 1,
  //   title: "Jurassic World: Fallen Kingdom",
  //   description:
  //     "Several years after the demise of Jurassic World, a volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar. Claire Dearing, the former park manager and founder of the Dinosaur Protection Group, recruits Owen Grady to help prevent the extinction of the dinosaurs once again.",
  //   release_date: "2018-06-06",
  //   img: "c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
  // };
  res.render("show", { movie: movie });
});



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
