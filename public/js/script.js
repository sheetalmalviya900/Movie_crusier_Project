function getMovies() {
	return fetch("http://localhost:3000/movies").then((res) => {
		if (res.ok) {
			return res.json();
		}
		else if (res.status == 404) {
			return Promise.reject(new Error('Invalid URL'))
		}
		else if (res.status == 401) {
			return Promise.reject(new Error('UnAuthorized User...'));
		}
		else {
			return Promise.reject(new Error('Internal Server Error'));
		}
	}).then(data2 => {
		useData = data2
		displayData(data2)
		return data2
	})

}



function getFavourites() {
	return fetch('http://localhost:3000/favourites').then((res) => {
		if (res.ok) {
			return res.json()
		}
		else if (res.status == 404) {
			return Promise.reject(new Error('Invalid URL'))
		}
		else if (res.status == 401) {
			return Promise.reject(new Error('UnAuthorized User...'));
		}
		else {
			return Promise.reject(new Error('Internal Server Error'));
		}
	}).then(data3 => {
		favData = data3
		displayFavouriteData(favData)
		return data3
	})
}

function addFavourite(id) {
	for (let item of useData) {
		if (item.id == id) {
			var favmovie = item
			break
		}
	}
	let flag = false
	for (let item of favData) {
		if (item.id == favmovie.id) {
			flag = true
		}
	}
	if (flag) {
		return Promise.reject(new Error('Movie is already added to favourites'));
	}
	else {
		return fetch('http://localhost:3000/favourites', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(favmovie)
		})
			.then(res => {
				if (res.ok)
					return res.json()
			}).then(addfav => {
				favData.push(addfav)
				displayFavouriteData(favData)
				return addfav
			})
	}
}
function displayFavouriteData(result) {
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

let displayData = (result) => {
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
module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


