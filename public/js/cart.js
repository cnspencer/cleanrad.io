let watches = {
  products: [
    {
      name: "Maroon 5",
      description:
        "V (2014)",
      img: "https://upload.wikimedia.org/wikipedia/en/5/53/Maroon_5_-_V_%28Official_Album_Cover%29.png",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Michael Jackson",
      description:
        "Thriller (1982)",
      img: "https://images-na.ssl-images-amazon.com/images/I/61DyGbsly8L._SL1000_.jpg",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Eagles",
      description:
        "Their Greatest Hits (1976)",
      img: "https://i.pinimg.com/originals/71/24/ea/7124eaab7ae01bf7dde96e519331ef04.jpg",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Led Zeppelin",
      description: "Led Zeppelin (1969).",
      img: "https://res-4.cloudinary.com/ybmedia/image/upload/c_scale,f_auto,q_auto,w_700/v1/m/a/2/a2427aadf53e76d88c15e97a7a270b478d53664a/04LedZep.jpg",
      price: 14.99,
      id: 1,
      stars: 3.5
    },
    {
      name: "The Beatles",
      description: "Abbey Road (1969)",
      img: "https://res-2.cloudinary.com/ybmedia/image/upload/c_scale,f_auto,q_auto,w_700/v1/m/0/6/065fe874298662a7127bb961c226e8219b5ba730/05AbbeyRoad.jpg",
      price: 12.99,
      id: 2,
      stars: 1.6666666666666667
    },
    {
      name: "Pink Floyd",
      description:
        "Dark Side of the Moon (1973)",
      img: "https://res-3.cloudinary.com/ybmedia/image/upload/c_scale,f_auto,q_auto,w_700/v1/m/4/f/4fe9cb6bef84732ed7eb16cd47bdabba11eb5f74/11PinkFloyd.jpg",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Billie Eilish",
      description:
        "Dont Smile at Me (2017)",
      img: "https://i.pinimg.com/originals/78/6e/a3/786ea3d49748ab17966e4301f0f73bb6.jpg",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Carrie Underwood",
      description:
        "Play On (2009)",
      img: "https://cdn.shopify.com/s/files/1/0896/2534/products/3_grande.jpg?v=1571269681",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Taylor Swift",
      description:
        "Fearless (2008)",
      img: "https://www.udiscovermusic.com/wp-content/uploads/2018/10/Taylor-Swift-Fearless-album-cover-web-optimised-820-820x600.jpg",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "AC/DC",
      description:
        "Back In Black (1980)",
      img: "https://miro.medium.com/max/900/1*BHn7gMe-se8CeeW1CG3u3g.jpeg",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Celine Dion",
      description:
        "Let's Talk About Love (1997)",
      img: "https://images.recordsale.de/600/600/celinedion-letstalkaboutlove.jpg",
      price: 11.99,
      id: 3,
      stars: 2.75
    },
    {
      name: "Elton John",
      description:
        "Elton John Greatest Hits 1970-2002 (2002)",
      img: "https://static.bhphoto.com/images/images750x750/1493205772_1332591.jpg",
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
            <img src="${watch.img}" class="card-img-top" alt="bootstraplogo">
            <div class="card-body">
              <h5 class="card-title">${watch.name}</h5>
              <p class="card-text">${watch.description}</p>
              <p class="card-price">$${watch.price}</p>
              <a href="${watch.img}" class="btn btn-primary">Add to Cart</a>
            </div>
            
          </div>
        </div>`}).join("\n\t")
// The ‘\n’ and ‘\t’ are escape sequences. The first creates a newline the second creates a tab.
const mydiv = document.createElement("div");
mydiv.innerHTML = `\n\t${lis}\n`;

document.getElementById("displaywatchesdiv").innerHTML = "";
document.getElementById("displaywatchesdiv").innerHTML = mydiv.innerHTML;
