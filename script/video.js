// fetch,load and show category on html

// create load categories
const loadCategories = () => {
    //  fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
// create display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    // create button for each category
    categories.forEach(item => {
        // create a button for each item
        const button = document.createElement('button');
        button.classList = "btn";
        button.innerText = item.category;

        // add button to category container
        categoryContainer.append(button);
    });

}
loadCategories();