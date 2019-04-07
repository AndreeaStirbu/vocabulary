const searchBar = `<input type="text" id="search-bar" placeholder="Looking for a word?"></input>`;
const searchBarComponent = new Component('searchBar', {});

searchBarComponent.view = function() {
    return searchBar;
};

export default searchBarComponent;