'use strict'
    let API_KEY='795dbf78';
    let query='';
    
    function search(query,page){
        if(!query || query.length<4){
            alert('Η λέξη πρέπει να έχει τουλάχιστον 4 γράμματα!');
            return;
        }
        fetch(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data.Search);
                if(data.Response=='True'){
                    createMovies(data.Search);
                }
            });
    }

    document.querySelector('#search-input').addEventListener('keyup',function(event){
        if(event.keyCode==13){
            search(this.value,1);
        }
        if(event.keyCode==27){
            this.blur();
        }
    });

    document.querySelector('#search-btn').addEventListener('click',function(event){
        let valueSearch=document.querySelector('#search-input').value;
        console.log(valueSearch);
        search(valueSearch,1);
    });

    function createMovies(data){
        let htmlMovie='';
        data.forEach(m=>{
            htmlMovie+=`<div class="col">
                <div class="card" style="width: 18rem;">
                    <img src="${m.Poster}" class="card-img-top" alt="${m.Poster}">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${m.Year}</li>
                        <li class="list-group-item">${m.Type}</li>
                    </ul>
                </div>
            </div>`;
        });
        document.querySelector('#movies').innerHTML=htmlMovie;
    }
    
    search('formula', 1);
