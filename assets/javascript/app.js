/**********************************************
*Author: Baruch Flores                        *
*Homework 5: GifTastic                        *
*UCB Extension - Full-Stack Bootcamp          *
*June 2018                                    *
***********************************************/
//Brands to show
var brands = [
    "Audi",
    "Porsche",
    "Lamborghini",
    "Bugatti",
    "Louis Vuitton",
    "Hermès",
    "Gucci",
    "Chanel",
    "Hennessy",
    "Rolex",
    // "Moët",
    "Moët",
    "Cartier",
    "Tiffany & Co",
    "Dior",
    "Estee Lauder",
    "Prada",
    "Salvatore Ferragamo",
    "Burberry",
    "Fendi",
    "Oscar De La Renta",
    "Dolce & Gabbana",
    "Armani",
    "Versace",
    "Ralph Lauren",
    "Lancome",
    "Valentino",
    "Yves Saint Laurent ",
    "Lacoste",
    "Audemars Piguet"
];

//Brands iterable
var iterBrand = brands.entries();
var brand = iterBrand.next();

//Holds giphy ID
var id = 0;

//API response data
var giphyData;

//Giphy key
var key = "3n5xHETMjimryPtSbS5skithIVaiQNHS";

function printGiphy(giphyData) {

    var iterGiphy = giphyData.entries();
    var giphy = iterGiphy.next();
    id = 0;

    while (!giphy.done) {

        var div = $("<div>").addClass("gif_wrapper bg-transparent float-left m-2");
        var ratingInfo = $("<p>").addClass("ratingInfo text-light m-0");
        var rating = $("<span>").addClass("rating text-light m-0");
        var slug = $("<p>").addClass("ratingInfo slug text-light m-0");
        var source = $("<p>").addClass("ratingInfo source text-light m-0");
        var download = $("<a>").addClass("ratingInfo download text-light btn btn-success m-0");
        var img = $("<img>").addClass("giphy img-fluid");

        ratingInfo.text("Rating: ");
        rating.text(giphy.value[1].rating);
        ratingInfo.append(rating);
        slug.text("Slug: " + giphy.value[1].slug);
        source.text("Date uploaded: " + giphy.value[1].import_datetime);
        download.text("Download!").attr("href",giphy.value[1].images.fixed_height.url).attr("download", true);

        img.attr("src", giphy.value[1].images.fixed_height_still.url);
        img.attr("data-state", "still");
        img.attr("data-id", id++);
        div.append(img).append(ratingInfo).append(slug).append(source).append(download);

        $(".gifs_wrapper").append(div);
        giphy = iterGiphy.next();
    }

}

function getGiphy() {

    var queryURL = "https://api.giphy.com/v1/gifs/search?" + $.param({ "api_key": key, "q": $(this).text(), "limit": "10" });
    console.log(queryURL);
    var method = "GET";

    $(".gifs_wrapper").text("");

    $.ajax({

        url: queryURL,
        method: method
    }).then(function (response) {
        giphyData = response.data
        printGiphy(giphyData);
    });
}

function animateGiphy() {
    id = $(this).data("id");
    if ($(this).data("state") == "still") {
        $(this).attr("src", giphyData[id].images.fixed_height.url);
        $(this).data("state", "animate");
    }
    else {
        $(this).attr("src", giphyData[id].images.fixed_height_still.url);
        $(this).data("state", "still");
    }
}


function addBrand(e) {
    e.preventDefault();
    var brand = $("#addBrand").val().trim();

    if (brand != "") {
        console.log(brand);
        var newBtn = $("<button>").addClass("btn btn-dark brandBtn m-2").text(brand);
        $(".icons_wrapper").append(newBtn);
        $("#addBrand").val("");

        // TODO:
        // add more gifts
        // mark as favorite
    }
}



$(document).ready(function () {

    while (!brand.done) {
        var btn = $("<button>").addClass("btn btn-dark brandBtn m-2").text(brand.value[1]);
        $(".icons_wrapper").append(btn);
        brand = iterBrand.next();
    }

    // $(".brandBtn").click(getGiphy);
    $(".addBrandBtn").click(event, addBrand);
    $(document).on("click", ".giphy", animateGiphy);
    $(document).on("click", ".brandBtn", getGiphy);


});