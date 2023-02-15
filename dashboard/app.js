$(document).ready(() => {
    const apiBaseUrl = "http://localhost:3200/"
    //initialisation d'une variable null
    let selectedButtonValue = null;
    //ecoute du click du bouton pour récupérer sa valeur correspondant au tableau sélectionné
    $(".get_all_movie_button").click(function(){
        selectedButtonValue = $(this).val()
    });
    //fonction pour créer un noveau film dans le fichier
    function createMovie() {
        //recupération des input
        const movieData = { titre: $("#create_movie").val(), annee: $("#year_movie").val() };
        $.ajax({
            type: "POST",
            url: apiBaseUrl + selectedButtonValue,
            data: JSON.stringify(movieData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (result) => {
                console.log(result);
                alert(result.message)
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error)
            }
        })
    }

    //event listener sur le bouton
    $("#create_button").click(createMovie);
    //appel à la fonction de récupération de tout le tableau
    function getAllMovie() {
        const movies = $("#all_movies");
        $.ajax({
            type: "GET",
            url: apiBaseUrl + selectedButtonValue,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (result) => {
                let myTab = `<br><table id="table">
                <tr>
                    <th>N°</th>
                    <th>Titre</th>
                    <th>Année</th>
                </tr>`;
                for (let i in result){
                    myTab += `<tr>`
                    myTab += '<td>' + result[i].id + '</td>'
                    myTab += '<td>' + result[i].titre + '</td>'
                    myTab += '<td>' + result[i].annee + '</td>'
                    myTab += `</tr>`
                }
                myTab += `</table>`;
                movies.html(myTab);
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error);
            }
        })
    }
    //event listener sur le bouton
    $(".get_all_movie_button").click(getAllMovie);

    function getMovieById() {
        const moviesById = $("#movies_id");
        const movieId = $("#get_movies").val();
        $.ajax({
            type: "GET",
            url: apiBaseUrl + selectedButtonValue + "/" + movieId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (result) => {
                let myTab2 = `<br><table id="table">
                <tr>
                    <th>N°</th>
                    <th>Titre</th>
                    <th>Année</th>
                </tr>
                <tr>
                    <td> ${result.id} </td>
                    <td> ${result.titre} </td>
                    <td> ${result.annee} </td>
                </tr>
                </table>`;
                moviesById.html(myTab2);
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error);
            }
        })
    }

    //event listener sur le bouton
    $("#get_movie_by_id").click(getMovieById);

    function deleteMovie() {
        const movieId = $("#get_movies").val();
        $.ajax({
            type: "DELETE",
            url: apiBaseUrl + selectedButtonValue + "/" + movieId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (result) => {
                alert(result.message)
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error)
            }
        })
    }
    //event listener sur le bouton
    $("#delete_the_movie").click(deleteMovie);

    function updateMovie() {
        let movieId = $("#get_modif_movies").val();
        let movieData = {};
    
        if ($("#modif_title_movie").val() !== "") {
            movieData.titre = $("#modif_title_movie").val();
        }
    
        if ($("#modif_year_movie").val() !== "") {
            movieData.annee = $("#modif_year_movie").val();
        }
    
        if ($("#modif_title_movie").val() === "" && $("#modif_year_movie").val() === "") {
            alert("Veuillez remplir au moins un champs de texte");
            return;
        }

        $.ajax({
            type: "PUT",
            url: apiBaseUrl + selectedButtonValue + '/' + movieId,
            data: JSON.stringify(movieData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (result) => {
                alert(result.message)
            },
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error)
            }
        })
    }
    //event listener sur le bouton
    $("#update_button").click(updateMovie);
});