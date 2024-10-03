// 
// global function 
// 
function getTimeString(time){
    // get hour and rest sec
    const hour = parseInt(time / 3600);
    let remainSecond = time % 3600;
    // get minute adn rest sec
    const minute = parseInt(remainSecond / 60);
    remainSecond = remainSecond % 60;
    return `${hour} hour ${minute} minute ${remainSecond} second ago`;
}
    // for removing class in btn
const removeActiveClass = () =>{
const buttons = document.getElementsByClassName('category-btn');
for (let btn of buttons){
    btn.classList.remove('active')
}
}

// 
// fetch,load and show category on html
// 

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
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id = "btn-${item.category_id}" onclick = "loadCategoryVideos(${item.category_id})"  class= "btn category-btn">
        ${item.category}
        </button>
        `
        // add button to category container
        categoryContainer.append(buttonContainer);
    });
}
//  load category videos
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // removing existing btn class
            removeActiveClass();
            // adding btn class
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))
    }
    

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
    videoContainer.innerHTML = "";
    if(videos.length == 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class = "min-h-[500px] flex flex-col justify-center items-center gap-5">
        <img src = "assests/icon.png"/>;
        <h2 class = "font-bold text-2xl text-center">No Content Here In This Category</h2>
        </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add("grid");
    }
    // create card for each video
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = "h-[260px]"
        card.innerHTML = `
    <figure class = "h-[200px] relative">
    <img class = "w-full h-full object-cover rounded-t-2xl "
    src= ${video.thumbnail}/>
    ${
        video.others.posted_date?.length == 0 ? "" : `<span class = "absolute text-xs right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(video.others.posted_date)} </span>`
    }
    </figure>
    
    <div class="px-0 py-3 flex items-center gap-2">
     <div>
      <img class = "w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
     </div>
     <div>
     <h2 class = "font-bold">${video.title}</h2>
     <div class = "flex items-center gap-2">
      <p class = "text-gray-400">${video.authors[0].profile_name}</p>
      ${
        video.authors[0].verified === true ? '<img class = "w-5 h-5 "  src = "https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>' : ""
      }
     </div>
     </div>
    </div>
    `
        // add card to videos container
        videoContainer.append(card);
    });
}

loadCategories();
loadVideos();