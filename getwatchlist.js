
document.addEventListener("click",function(e){
    if(e.target.dataset.deleteMovie){
        deleteMovie(e.target.dataset.deleteMovie)
    }
})
function getListMovie(){
    const data=allStorage()
    document.getElementById("retrieved-list").innerHTML+=data.map(function(ele){
        if(ele!=="honey:core-sdk:*"){
            return ele
        } 
    }).join("")
}
function allStorage() {
    let values = [],
        keys = Object.keys(localStorage),
        i=keys.length
    /*let filterKey= keys.filter(function(ele){
        return ele!=="debug"
    })
    console.log(filterKey)
    let i=filterKey.length
    */while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
}
function deleteMovie(id){
    localStorage.removeItem(`item-${id}`)
    document.getElementById("retrieved-list").innerHTML=""
    getListMovie()
}

getListMovie()