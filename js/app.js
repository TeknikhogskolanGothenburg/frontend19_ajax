$(() => {
    $("#submit").click(() =>{
        $("#movies").empty();
        let movieSearch = $("#movie-search").val();
        let movieVal = document.querySelector("#movies").children[0].dataset.value;
        fetch("http://127.0.0.1:5000/api/v.1.0/movies/" + movieVal,
            {
                headers: {
                    "api_key": "497daff4-48c7-11ea-8548-7c2a31c2792c"
                }
            })
            .then(response => response.json())
            .then(json => {
                $("#title").text(json.original_title);
                $("#year").text(json.release_date);
                $("#poster").html(`<img src="http://image.tmdb.org/t/p/w185${json.poster_path}">`);
                $("#plot").text(json.overview);
            })
    });

    $("#movie-search").on("input", () =>{
        if($("#movie-search").val().length > 3) {
            let queryUrl = "http://127.0.0.1:5000/api/v.1.0/movies/partial?partial_title=" + $("#movie-search").val();
            
            $.ajax({
                url: queryUrl,
                dataType: 'json',
                headers: {"api_key": "497daff4-48c7-11ea-8548-7c2a31c2792c"},
                success: (result) => {
                    $("#movies").empty();
                    for(let i = 0; i < result.length; i++) {
                        let [id, name] = result[i];
                        $("#movies").append("<option data-value='" + id + "'>" + name + "</option>");
                    }
                },
                error: (xhr, status, error) => {
                    console.log(xhr + " " + status + " " + error);
                }
            });
        }
    });
});