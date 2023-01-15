const inputMovie=document.getElementById("movie-input")
const movieCatalog=document.getElementById("movie-catalog")

document.addEventListener("click",function(e){
    if(e.target.id==="my-search-btn"){
        document.getElementById("movie-catalog").style.background="none"
        handleSearch()
    }
    else if(e.target.dataset.read){
        readMore(e.target.dataset.read)
    }
    else if(e.target.dataset.addMovie){
        if(localStorage.getItem(`item-${e.target.dataset.addMovie}`)){
            console.log("hola")
            document.getElementById(`add${e.target.dataset.addMovie}`).style.display="none"
            alert("You've already saved this movie")
        }
        else{
            addListMovie(e.target.dataset.addMovie)
        }
    }
})
function handleSearch(){
   const formattedMovie=inputMovie.value.replace(/ /g,"+")
    fetch(`https://www.omdbapi.com/?apikey=5c004d00&s=${formattedMovie}`)
        .then(res => res.json())
        .then(data => {
            render(data.Search)
        })
}
function render(data){
    movieCatalog.innerHTML=""
    data.forEach((movie)=>{
        if(movie.Poster!=="N/A"){
            fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=5c004d00`)
                .then(res => res.json())
                .then(data => {
                    //console.log(data.Title+" "+data.Poster)
                    const read= data.Plot.slice(data.Plot.length-3)
                    movieCatalog.innerHTML+=`
                        <div class="catalog-list" id=item${data.imdbID}>
                            <img class="catalog-img" src=${data.Poster} alt=${data.Title}>
                            <div class="section-two">
                                <h2>
                                    ${data.Title}
                                    <span class="point"><i class="fa-solid fa-star point"></i> ${data.imdbRating}</span>
                                </h2>
                                <div class="add-movie">
                                    
                                        <span class="runtime">${data.Runtime}</span>
                                        <span class="genre">${data.Genre}</span>
                                        <button class="add-watchlist" data-add-movie=${data.imdbID} id=add${data.imdbID}>
                                            <i class="fa-solid fa-folder-plus add"></i> Watchlist
                                        </button>
                                </div>
                                <p id="plot-${data.imdbID}">${data.Plot} <span 
                                class="read" 
                                id=${data.imdbID}
                                data-read=${data.imdbID}
                                >
                                    Read more</span></p>
                            </div>
                        </div>    
                            ` 
                    if(read==="..."){
                        document.getElementById(data.imdbID).style.display="inline"
                    }
                })                       
    }})
}
function readMore(id){
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=5c004d00&plot=full`)
        .then(res => res.json())
        .then(data => {
            document.getElementById(`plot-${id}`).innerHTML=data.Plot
        })
}
function addListMovie(id){

    document.getElementById(`add${id}`).style.display="none"
    const item=`<div class="catalog-list">`+document.getElementById(`item${id}`).innerHTML+`
                <button class="delete-btn" data-delete-movie=${id}><i class="fa-solid fa-trash delete"
                data-delete-movie=${id}></i></button>
                </div>`
    localStorage.setItem(`item-${id}`, item)
}
