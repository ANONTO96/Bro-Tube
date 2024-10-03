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

// create load video
const loadVideos = () => {
    //  fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
}
// create display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    // create card for each video
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = "h-[260px]"
        card.innerHTML = `
    <figure class = "h-[200px]">
    <img class = "w-full h-full object-cover rounded-t-2xl "
      src= ${video.thumbnail}
    </figure>
    <div class="px-0 py-3 flex items-center gap-2">
     <div>
      <img class = "w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
     </div>
     <div>
     <h2 class = "font-bold">${video.title}</h2>
     <div class = "flex items-center gap-2">
      <p class = "text-gray-400">${video.authors[0].profile_name}</p>
      ${video.authors[0].verified === true ? '<img class = "w-5 h-5 "  src = "https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>' : ""
      }
     </div>
     </div>
    </div>
    `
        // add card to videos container
        videoContainer.append(card);
    });
}
loadVideos();