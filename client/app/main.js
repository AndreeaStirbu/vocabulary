import wordListComponent from '/app/components/words.js'
import searchBarComponent from '/app/components/searchBar.js'

const mainContainer = new Container('#mainContainer');
const wordsList = wordListComponent;
mainContainer.addComponent(wordsList);
mainContainer.showComponent(wordsList.name);

const searchContainer = new Container('#searchContainer');
const searchBar = searchBarComponent;
searchContainer.addComponent(searchBar);
searchContainer.showComponent(searchBar.name);

