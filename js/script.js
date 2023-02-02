"use strict";

// const reviewObj = {
//     restaurant_id: 1,
//     name: 'Jeremy',
//     rating: 5,
//     comments: "first review"
// };
const url = 'https://round-puffy-blizzard.glitch.me/movies';
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(reviewObj),
// };
// fetch(url)
//     .then( response => console.log(response) ) /* review was created successfully */
//     .catch( error => console.error(error) ); /* handle errors */


// loading message function to disappear and show movie lists after 5 seconds
function startDelay(){
    setTimeout(function() {
            $('#loading').addClass('hide');
            getMovies();
    }, 1000);
}
$(window).load(startDelay());

//ajax request to get a listing of all movies
function getMovies () {
    $.get(url).done(function (data) {
        //do something with the data
        let movies= "";
        $.each(data, function(data,value){
            movies += `
            <div class="movieItem card m-2 p-2" id="moveieItem${value.id}">
                <div>
                    <div class="fs-5 fw-bolder">${value.title}</div>
                    <div>Director: ${value.director}</div>
                    <div>Staring:${value.staring}</div>
                    <div>Rating: ${value.rating}/10</div>
                    <div>Genre: ${value.genre}</div>
                    <div class="fst-italic">"${value.tagline}"</div>
                </div>
            </div>
            `;
        })
        $("#movieContent").html(movies);
    });
}

//submit button functionality for new movies
$("#addMoviesSubmitBtn").click(function(event){
    $.ajax("url", {
        type: "POST",
        movies: {
            title: $("#mtitle").val(),
            rating: $("#mrating").val()
        }
    });

    event.preventDefault();
    console.log("working")
    // $.post(url, {
    //     movies: {
    //         title: $("#mtitle").val(),
    //         rating: $("#mrating").val()
    //     }
    // }).done(function(movies) {
    //     $("#movieContent").prepend(`
    //         <div class="movieItem">
    //             <div>${("#mtitle").val()}</div>
    //             <div>${("#mrating").val()}</div>
    //         </div>`
    //     );
});

function postMovie () {

    $("#addMoviesSubmitBtn").click(function(event) {
        $.post( url, { title: $("#mtitle").val(), rating: $("#mrating").val() } )
        $("#movieContent").prepend(`
                <div class="movieItem">
                    <div>${("#mtitle").val()}</div>
                    <div>${("#mrating").val()}</div>
                </div>`
        );
    });

    // $.post( url, { title: $("#mtitle").val(), rating: $("#mrating").val() } );
    //
    //
    // $.post(url).done(function (data) {
    //     let movie= "";
    //     $("#addMoviesSubmitBtn").click(function(event) {
    //         $("#movieContent").prepend(`
    //             <div class="movieItem">
    //                 <div>${("#mtitle").val()}</div>
    //                 <div>${("#mrating").val()}</div>
    //             </div>`
    //         );
    //     });

    // $("#movieContent").html(movies);
    // });
}
