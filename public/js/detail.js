let album = {
        artist: "Maroon 5",
        description:
          "The debut album of American band Maroon 5. Contains 1 explicit track that has been edited to daytime airing standards.",
        img: "https://upload.wikimedia.org/wikipedia/en/0/0e/Maroon_5_-_Harder_to_Breathe.png",
        price: 11.99,
        id: 3,
        stars: 2.75,
        tracks: [
            {
                audio: "/samples/HardertoBreatheMaroon5.mp3",
                title: "Harder to Breathe"
        }
        ]
}

const lis = album.map(function () {
    return ` <div class="col-lg-4 col-md-6 col-mb-4">
                <p>${album.description}</p>
            </div>`}).join("\n\t")
  const mydiv = document.createElement("div");
  mydiv.innerHTML = `\n\t${lis}\n`;

const lis2 = album.tracks.map(function (track) {
    return ` <div class="col-lg-4 col-md-6 col-mb-4">
                <audio controls>
                    <source src=${track.audio} type="audio/mp3">
                    <!---<a href="">${track.title}</a>--->
                    Your browser does not support this media type
                </audio>
            </div>`}).join("\n\t")
  const mydiv2 = document.createElement("div");
  mydiv2.innerHTML = `\n\t${lis2}\n`;


document.getElementById("description").innerHTML = "";
document.getElementById("description").innerHTML = mydiv.innerHTML;
document.getElementById("tracksdiv").innerHTML = "";
document.getElementById("tracksdiv").innerHTML = mydiv2.innerHTML;