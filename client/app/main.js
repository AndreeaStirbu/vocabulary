import {wordListComponent} from '/app/components/words.js'
import searchBarComponent from '/app/components/searchBar.js'
import {addBtnComponent} from '/app/components/addForm.js'
import {initContainer} from '/app/lib/utils.js'
import {flipOnClick} from '/app/lib/utils.js'

const mainContainer = initContainer('#mainContainer', wordListComponent); 
const searchContainer = initContainer('#headerContainer', searchBarComponent); 
//const footerContainer = initContainer('#addBtnContainer', addBtnComponent); 

flipOnClick(mainContainer, '.card', wordListComponent);