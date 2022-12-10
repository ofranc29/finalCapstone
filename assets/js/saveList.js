// get blog data from local storage
let savedBlogListStr = localStorage.getItem('bookmarkedBlogs');
let savedBlogListJson = JSON.parse(savedBlogListStr);
let blogListStr = localStorage.getItem('blogs');
let blogListJson = JSON.parse(blogListStr);

// get details for saved blog items
let savedBlogDetailsJson = blogListJson.filter(item => savedBlogListJson.includes(String(item.id)));

function refreshSavedList(){
    // get saved list container
    let savedContainer = document.getElementById('saved-list-container');
    savedContainer.innerHTML = '';
    // loop through all saved blog posts
    savedBlogDetailsJson.forEach((element, idx) => {
        // build html elements
        let savedItem = document.createElement('span');
        let savedTitle = document.createElement('span');
        let deleteSavedItem = document.createElement('span');
        savedItem.classList.add('saved-item');
        savedItem.setAttribute('id', `saved-item-${idx}`);
        savedTitle.classList.add('saved-title');
        savedTitle.innerHTML = element.title;
        savedItem.appendChild(savedTitle);
        deleteSavedItem.classList.add('delete-saved-item');
        deleteSavedItem.innerHTML = '&#10006;';
        savedItem.appendChild(deleteSavedItem);
        deleteSavedItem.addEventListener("click", (e) => {
            removeBlog(element.id);
        });
        // append to container
        savedContainer.appendChild(savedItem);
    });
}

// function to remove the item from the list
function removeBlog (blogId){
    // get id of deleted item
    const idx = savedBlogListJson.indexOf(String(blogId));
    // check if the idx exists in array
    if(idx >= 0) {
        // update data in storage
        savedBlogListJson.splice(idx, 1);
        savedBlogListStr = JSON.stringify(savedBlogListJson);
        localStorage.setItem('bookmarkedBlogs', savedBlogListStr);
    };
    // hide saved element
    let savedItem = document.getElementById(`saved-item-${idx}`);
    savedItem.style.display = 'none';
    // alert with count of items in saved list
    alert(`You have ${savedBlogListJson.length} items saved.`);
};

// refresh list
refreshSavedList();