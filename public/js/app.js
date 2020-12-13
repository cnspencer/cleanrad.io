import { React, ReactDOM } from "https://unpkg.com/es-react@16.8.60/index.js";
import htm from "https://unpkg.com/htm@2.2.1/dist/htm.mjs";
const html = htm.bind(React.createElement);
const shoppingCartData = {
    "order": {
        "orderId": 1,
        "orderDate": new Date().toISOString(),
        "total": 0,
        "userID": 1,
        "completed": 0
    },
    "cartProducts": []
}

function Album(props) {
    const album = props.album;
    return html`
      <div key=${album.id} className="col-lg-4 col-md-6 col-mb-4">
        <div className="card h-100">
          <img
         src=${"/img/albums/" + album.img}
            className="card-img-top"
            alt="bootstraplogo"
          />
          <div className="card-body">
            <h5 className="card-title">${album.name}</h5>
            <p className="card-text">${album.tracknum}</p>
            <p className="card-text">$${album.price}</p>
            <div
              onClick=${() =>
                setShoppingCartQuantity(
                  album.tracks,
                  currentQuantity => currentQuantity + 1
                )}
              className="btn btn-primary"
            >
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    `;
  }
function SortCriteria(props) {
  // The below uncommented line is the same as:
  // const name = props.name;
  // const checked = props.checked
  const { name, checked, onSortPropChange } = props;
  const id = `sort-${title}`;
  return html`
    <span className="sort-prop mx-2">
      <input
        onChange=${e => onSortPropChange(e.target.checked, name)}
        checked=${checked}
        className="mx-1"
        type="radio"
        id=${id}
        name="sortbyprop"
      />
      <label className="mx-1" htmlFor=${id}>${title}</label>
    </span>
  `;
}
function SortingOptions(props) {
  const {
    album,
    sortProp,
    onSortPropChange,
    sortOrder,
    onSortOrderChange
  } = props;
  // props to exclude from the sort
  const propsExcludedFromSort = new Set(["album.track.id", "album.track.img"]);
  const searchableProps = Object.keys(album)
    // filter out excluded props
    .filter(keyProperty => !propsExcludedFromSort.has(keyProperty))
    // map the keys/props to React Components.
    .map(
      (keyProperty, index) => html`
        <${SortCriteria}
          key=${keyProperty}
          name=${keyProperty}
          onSortPropChange=${onSortPropChange}
          checked=${keyProperty === sortProp}
        />
      `
    );
  return html`
    <div className="col-md-12 row">
      <div className="col-md-6">
        Sort By:
        <br />
        ${searchableProps}
      </div>
      <div className="col-md-6">
        Sort:
        <br />
        <span className="mx-2">
          <input
            onChange=${e => onSortOrderChange(e.target.checked, "ascending")}
            className="mx-1"
            type="radio"
            checked=${sortOrder === "ascending"}
            id="sort-ascending"
            name="sortorder"
          />
          <label className="mx-1" htmlFor="sort-ascending">Ascending</label>
        </span>
        ${" "}
        <span className="mx-2">
          <input
            onChange=${e => onSortOrderChange(e.target.checked, "descending")}
            className="mx-1"
            checked=${sortOrder === "descending"}
            type="radio"
            id="sort-descending"
            name="sortorder"
          />
          <label className="mx-1" htmlFor="sort-descending">Descending</label>
        </span>
      </div>
    </div>
  `;
}
function sortTracks(albums, sortProp, sortOrder) {
  return albums.tracks.sort((focusedAlbum, alternateAlbum) => {
    const moveFocusedAlbumLeft = -1,
      moveFocusedAlbumRight = 1,
      dontMoveEitherAlbum = 0;
    if (focusedAlbum.tracks[sortProp] < alternateAlbum.tracks[sortProp]) {
      if (sortOrder === "ascending") {
        // move focusedWatch left of alternateWatch
        return moveFocusedAlbumLeft;
      } else {
        // move focusedWatch right of alternateWatch
        return moveFocusedAlbumRight;
      }
    } else if (focusedAlbum[sortProp] > alternateAlbum[sortProp]) {
      if (sortOrder === "ascending") {
        // move focusedWatch right of alternateWatch
        return moveFocusedAlbumRight;
      } else {
        // move focusedWatch left of alternateWatch
        return moveFocusedAlbumLeft;
      }
    } else {
      // Both watches are equal don't move either.
      return dontMoveEitherAlbum;
    }
  });
}
function Albums(props) {
  const [sortProp, setSortProp] = React.useState("name");
  const [sortOrder, setSortOrder] = React.useState("ascending");
  const albums = sortTracks(props.albums, sortProp, sortOrder);
  return html`
    <div className="col-12 row">
      <div className="col-12 row">
        <${SortingOptions}
          album=${props.albums[0]}
          sortProp=${sortProp}
          sortOrder=${sortOrder}
          onSortPropChange=${(isChecked, sortProperty) => {
            if (isChecked && sortProp != sortProperty) {
              setSortProp(sortProperty);
            }
          }}
          onSortOrderChange=${(isChecked, sortOrdering) => {
            if (isChecked && sortOrdering != sortOrder) {
              setSortOrder(sortOrdering);
            }
          }}
        />
      </div>
      <div className="col-12 row">
        ${albums.map(function(album) {
          return html`
            <${Album} key=${album.id} album="${album}" />
          `;
        })}
      </div>
    </div>
  `;
}
function setShoppingCartQuantity(
  cartItem,
  updateQuantity = quantity => quantity + 1
) {
  const shoppingCartItem = shoppingCartData.cartProducts.find(
    item => item.id === cartItem.id
  );
  if (shoppingCartItem) {
    shoppingCartItem.quantity = updateQuantity(shoppingCartItem.quantity);
  } else {
    // the ... is the spread operator
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    shoppingCartData.cartProducts.push({
      ...cartItem,
      quantity: updateQuantity(0)
    });
  }
  setShoppingCartOrder();
  render();
}
function setShoppingCartOrder() {
  let total = 0;
  for (const item of shoppingCartData.cartProducts) {
    total += item.price * item.quantity;
  }
  shoppingCartData.order.total = total;
}
function ShoppingCartItem(props) {
  const item = props.cartItem;
  return html`
    <div className="row p-2">
    <!--  <img
          style=${{ width: "100%" }}
          src=${item.img}
          alt=${item.title}
        /> 
        -->
        <img
        style=${{ width: "100%" }}
        src=${"/img/albums/" + item.img}
        alt=${item.title}
      />
      <div className="flex-direction-column p-2">
        <h6 className="">${item.title}</h6>
        <div className="text-muted">price: $${item.price}</div>
        <div className="text-muted">quantity: ${item.quantity}</div>
      </div>
    </div>
  `;
}
function ShoppingCart(props) {
  const items = props.shoppingCart.cartProducts;
  return html`
    <div className="dropdown px-2">
      <div data-toggle="dropdown" className="row align-items-center px-2">
        <div className="fa fa-shopping-cart mx-2"></div>
        <div
          id="shopping-cart-toggle"
          className="dropdown-toggle"
          data-toggle="dropdown"
        ></div>
      </div>
      <div
        className="dropdown-menu dropdown-menu-right p-2"
        aria-labelledby="dropdownMenuButton"
      >
        <!--Below lines are using ternary operators-->
        <!--https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator-->
        ${items.length > 0
          ? `Total Price: $${props.shoppingCart.order.total}`
          : ""}
        ${items.length === 0 ? "No items in Cart" : ""}
        ${items.map(
          cartItem =>
            html`
              <${ShoppingCartItem} key=${cartItem.id} cartItem=${cartItem} />
            `
        )}
      </div>
    </div>
  `;
}
function TopBar(props) {
  return html`
    <div className="row align-items-center">
      <${Search} />
      <${ShoppingCart} shoppingCart=${props.shoppingCart} />
    </div>
  `;
}
function Search() {
  const [searchTerm, setSearchTerm] = React.useState("");
  return html`
    <form
      id="search"
      onSubmit=${e => {
        e.preventDefault();
        filterTracks(searchTerm);
      }}
      className="form-inline my-2 my-lg-0"
    >
      <input
        value=${searchTerm}
        onChange=${eventData => setSearchTerm(eventData.target.value)}
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  `;
}
// create a copy of watches;
let filteredTracks;
function filterTracks(searchTerm) {
  filteredTracks = albums.tracks.products.filter(track => {
    const lowerSearchTerm = searchTerm;
    return (
      track.description.toLowerCase().includes(lowerSearchTerm) ||
      track.name.toLowerCase().includes(lowerSearchTerm)
    );
  });
  render();
}
window.render = function render() {
  ReactDOM.render(
    html`
      <${Album} tracks=${filteredTracks} />
    `,
    document.getElementById("albumview")
  );
  ReactDOM.render(
    html`
      <${TopBar} shoppingCart=${shoppingCartData} />
    `,
    document.getElementById("search")
  );
};
/*fetch('/api/getProducts').then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw Error("Something went wrong with that request:", response.statusText);
    }
}).then(function (data) {
  window.watches = data;
  filteredWatches = watches.products.slice();
  render();
});*/
fetch('/api/Products').then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw Error("Something went wrong with that request:", response.statusText);
    }
}).then(function (data) {
  window.albums = data;
  filteredalbums = albums.slice();
  render();
});
