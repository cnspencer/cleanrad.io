let watches = {
  products: [
    {
      name: "Album 1",
      description: "Rolling green hills with a gentle mist.",
      img: "photo/2015/01/28/23/35/landscape-615429_960_720.jpg",
      price: 14.99,
      id: 1,
      stars: 3.5
    },
    {
      name: "Album 2",
      description: "Scenic fall colors down a peaceful country road.",
      img: "photo/2015/12/01/20/28/road-1072823_960_720.jpg",
      price: 12.99,
      id: 2,
      stars: 1.6666666666666667
    },
    {
      name: "Album 3",
      description:
        "Snowy Mountain background with a stone path.",
      img: "photo/2017/02/01/22/02/mountain-landscape-2031539_960_720.jpg",
      price: 11.99,
      id: 3,
      stars: 2.75
    }
  ],
  count: 8,
  pageNum: 2
};
const lis = watches.products.map(function (watch) {
  return ` <div class="col-lg-4 col-md-6 col-mb-4">
          <div class="card h-100">
            <img src="https://cdn.pixabay.com/${watch.img}" class="card-img-top" alt="bootstraplogo">
            <div class="card-body">
              <h5 class="card-title">${watch.name}</h5>
              <p class="card-text">${watch.description}</p>
              <p class="card-price">$${watch.price}</p>
              <a href="https://cdn.pixabay.com/${watch.img}" class="btn btn-primary">Expand album art</a>
            </div>
          </div>
        </div>`}).join("\n\t")
// The ‘\n’ and ‘\t’ are escape sequences. The first creates a newline the second creates a tab.
const mydiv = document.createElement("div");
mydiv.innerHTML = `\n\t${lis}\n`;

document.getElementById("displaywatchesdiv").innerHTML = "";
document.getElementById("displaywatchesdiv").innerHTML = mydiv.innerHTML;
