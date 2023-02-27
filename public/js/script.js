function getMovies() {
	return fetch('http://localhost:3000/movies').then(
		res =>{
		  if(res.status==200){         
				  return res.json();          
		  }
		  else if(res.status == 404){
			  return Promise.reject(new Error('Invalid URL'))
		  }
		  else if(res.status == 401){
			  return Promise.reject(new Error('UnAuthorized User...'));
		  }
		  else{
			  return Promise.reject(new Error('Internal Server Error'));
		  } }).then(moviesListRes =>{
			moviesList = moviesListRes;  
			  displaymoviesList(moviesList);
			  return moviesListRes;
	  	})
}

function getFavourites() {
	return fetch('http://localhost:3000/favourites').then(res =>{
		  if(res.status ==200){         
				  return res.json();          
		  }
		  else if(res.status == 404){
			  return Promise.reject(new Error('Invalid URL'))
		  }
		  else if(res.status == 401){
			  return Promise.reject(new Error('UnAuthorized User...'));
		  }
		  else{
			  return Promise.reject(new Error('Internal Server Error'));
		  }}).then(favouriteMoviesRes =>{
			favouriteMovies = favouriteMoviesRes;  
			displayFavouriteMovies(favouriteMovies);
			return favouriteMoviesRes;
		})
}

function addFavourite(id) {
    let movieName = moviesList.find(movie =>{
        if(movie.id == id){
            return movie;
        }
    });
    let favExists = favouriteMovies.find(favMovie => {
        if( favMovie.id == movieName.id ){
            return favMovie;
        }
    });
    if(favExists) {
        return Promise.reject(new Error('Movie is already added to favourites'));
    }else{
		return fetch(`http://localhost:3000/favourites`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(movieName)
		}
		).then(res => {
				if(res.status ==200){
					return res.json();
				}
			}
		).then(addedMovie => {
				favouriteMovies.push(addedMovie);
				displayFavouriteMovies(favouriteMovies);
				return favouriteMovies;
			}
		)
	}
}

function displaymoviesList(result){
	let moviesData1 = ''
	result.map((item) => {
		moviesData1 += `<div class="card" style="width: 18rem;">
		<img src=${item.posterPath} class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">${item.title}</h5>
			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			<a href="#" onclick="addFavourite(${item.id})" class="btn btn-primary">Add to Favourite</a>
		</div>
	</div>`
	})
	document.getElementById('moviesList').innerHTML = moviesData1
}

function displayFavouriteMovies(result){
	let favouriteData1 = ''
	result.map((item) => {
		favouriteData1 +=

			`<div class="card" style="width: 18rem;">
				<img src=${item.posterPath} class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">${item.title}</h5>
					<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				</div>
			</div>`
	})
	document.getElementById(`favouritesList`).innerHTML = favouriteData1
}


module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};