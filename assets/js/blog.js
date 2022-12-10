// get blog container div by id
let blogBlock = document.getElementById('blog-block');

// get all blog post data from local storage
let blogPostsStr = localStorage.getItem('blogs');
let blogPostsJson = JSON.parse(blogPostsStr);
let blogPostsTxt = '';

// get all saved blog posts
let likedBlogsStr = localStorage.getItem('likedBlogs');
let likedBlogsJson = JSON.parse(likedBlogsStr);

// get all bookmarked blog posts
let bookmarkedBlogsStr = localStorage.getItem('bookmarkedBlogs');
let bookmarkedBlogsJson = JSON.parse(bookmarkedBlogsStr);


// create function to remove the item from the list
const removeFromLikes = (blogId) => {
    // get id of deleted item
    const idx = likedBlogsJson.indexOf(blogId.replace('heart-', ''));
    // check if the idx exists in array
    if(idx >= 0) {
        // update data in storage
        likedBlogsJson.splice(idx, 1);
        likedBlogsStr = JSON.stringify(likedBlogsJson);
        localStorage.setItem('likedBlogs', likedBlogsStr);
    };
    // alert with count of items in liked list
    alert(`You have liked ${likedBlogsJson.length} items.`);
};

// create function to add item to saved list
const addToLikes = (blogId) => {
    // get id of the saved item
    const idx = likedBlogsJson.indexOf(blogId.replace('heart-', ''));
    // add item to the saved item array
    if(!idx >= 0){
         // update data in storage
        likedBlogsJson.push(blogId.replace('heart-', ''));
        likedBlogsStr = JSON.stringify(likedBlogsJson);
        localStorage.setItem('likedBlogs', likedBlogsStr);
    };
    // alert with count of items in liked list
    alert(`You have liked ${likedBlogsJson.length} items.`);
};

const removeBookmark = (blogId) => {
    // get id of bookmarked item
    const idx = bookmarkedBlogsJson.indexOf(blogId.replace('bm-', ''));
    console.log('removeBookmark', idx);
    // remove item from bookmark array
    if(idx >= 0){
        // update data in localstorage
        bookmarkedBlogsJson.splice(idx, 1);
        bookmarkedBlogsStr = JSON.stringify(bookmarkedBlogsJson);
        localStorage.setItem('bookmarkedBlogs', bookmarkedBlogsStr);
    }
    // alert number of bookmarked items
    alert(`You have ${bookmarkedBlogsJson.length} item bookmarked`);
};

const addBookmark = (blogId) => {
    // get id of bookmarked item
    const idx = bookmarkedBlogsJson.indexOf(blogId.replace('bm-', ''));
    console.log('addBookmark', idx);
    console.log(blogId.replace('bm-', ''), blogId);
    // add blog item to bookmarks
    if(!idx >= 0){
        // update data in storage
        bookmarkedBlogsJson.push(blogId.replace('bm-', ''));
        bookmarkedBlogsStr = JSON.stringify(bookmarkedBlogsJson);
        localStorage.setItem('bookmarkedBlogs', bookmarkedBlogsStr);
    }
    // alert number of bookmarked items
    alert(`You have ${bookmarkedBlogsJson.length} item bookmarked`);
};

const addComment = (blogId, comment) => {
    // get blog post idx
    let idx = blogPostsJson.findIndex(item => item.id == blogId);
    // add comment to ['comments'] node of object
    blogPostsJson[idx].comments.push(comment);
    // add to session storage
    blogPostsStr = JSON.stringify(blogPostsJson);
    localStorage.setItem('blogs', blogPostsStr);
    // refresh comments
    refreshComments(blogId);
}

const deleteComment = (blogId, commentIdx) => {
    // get blog index
    blogIdx = blogPostsJson.findIndex(item => item.id == blogId);

    // check that blog post exists
    if(blogIdx >= 0){
        // remove comment from array
        blogPostsJson[blogIdx].comments.splice(commentIdx, 1);
        // update local storage
        blogPostsStr = JSON.stringify(blogPostsJson);
        localStorage.setItem('blogs', blogPostsStr);
        // refresh comments
        refreshComments(blogId);
    }
}

const refreshComments = (blogId) => {
    
    // get blog post from array
    let blogPost = blogPostsJson.filter(item => item.id == blogId);
    let commentContainer = document.getElementById(`comment-container-${blogId}`);
    commentContainer.innerHTML = '';

    // loop comments and build html
    blogPost[0].comments.forEach((item, idx) => {
        // intitalise comments html
        let commentItem = document.createElement('div');
        let commentText = document.createElement('span');
        let commentDelete = document.createElement('span');
        commentItem.classList.add('comment-item');
        commentText.innerHTML = item;
        commentDelete.classList.add('delete-comment');
        commentDelete.setAttribute('id', `delete-comment-${blogId}-${idx}`);
        commentDelete.innerHTML = '&#10006;';
        commentItem.appendChild(commentText);
        commentItem.appendChild(commentDelete);
        // add delete eventlistener to cross 
        commentDelete.addEventListener("click", (e) => {
            // call delete comment function
            deleteComment(blogId, idx);
        });
        // add comments html to comment container
        commentContainer.appendChild(commentItem);
    });
    
}


// initiate image src strings
let likedImgSrc = '';
let bookmarkedImgSrc = '';
// initial class flags
let likedClass = '';
let bookmarkClass = '';

// loop through each item in blog data
blogPostsJson.forEach(item => {
    // check if blog post id is in saved blog post list
    if(likedBlogsJson.includes(String(item.id))){ 
        // set image to liked
        likedImgSrc = './assets/img/heart-red.png';
        likedClass = ' liked';
    } else {
        // set image to not liked
        likedImgSrc = './assets/img/heart-black.png';
    }
    // check blog is in liked posts
    if(bookmarkedBlogsStr.includes(String(item.id))){
        // set image to bookmarked
        bookmarkedImgSrc = './assets/img/bookmark-red.png';
        bookmarkClass = ' bookmarked';
    } else {
        // set image to not bookmarked
        bookmarkedImgSrc = './assets/img/bookmark-empty.png';
    }

    // create blog post
    blogBlock.innerHTML += `<div class="blog-item" id="${item.id}">
                                <div class="blog-head">
                                    <h2>${item.title}</h2>
                                    <img class="bm-link${bookmarkClass}" id="bm-${item.id}" src="${bookmarkedImgSrc}" alt="">
                                </div>
                                <div class="blog-content">
                                    <p>
                                        ${item.content}
                                    </p>
                                </div>
                                <div class="save-content">
                                    <div class="post-info">
                                        <img class="like-link${likedClass}" id="heart-${item.id}" src="${likedImgSrc}" alt="">
                                    </div>
                                    <div class="comments">
                                        <div class="comment-form">
                                            <form class="comment-input">
                                                <input type="text" id="comment-input-${item.id}" placeholder="Leave a comment" />
                                            </form>
                                        </div>
                                        <div class="comment-container" id="comment-container-${item.id}">
                                        </div>
                                    </div>
                                </div>
                            </div>`;
});

// get all save link buttons
let likeBtns = document.getElementsByClassName('like-link');

// loop through all save link buttons
Array.from(likeBtns).forEach(element => {
    // add event listener to the save button
    element.addEventListener('click', (e) => {
        // get the heart container
        let heartIcon = document.getElementById(e.target.id);
        // check if'liked class is present
        if(element.classList.contains('liked')){
            // call remove function with id
            removeFromLikes(e.target.id);
            // switch image
            heartIcon.src = "./assets/img/heart-black.png";
            heartIcon.classList.remove('liked');
        } else {
            // call add function with id
            addToLikes(e.target.id);
            // switch image
            heartIcon.src = "./assets/img/heart-red.png";
            heartIcon.classList.add('liked');
        }
    });
});

// get all bookmark buttons
let bookmarkBtns = document.getElementsByClassName('bm-link');

Array.from(bookmarkBtns).forEach(element => {
    element.addEventListener("click", (e) => {
        // get target bookmark clicked
        bookmarkIcon = document.getElementById(e.target.id);
        console.log(e.target, e.target.id);
        if(element.classList.contains('bookmarked')){
            // call function to remove bookmark from list
            removeBookmark(e.target.id);
            // switch image
            bookmarkIcon.src = "./assets/img/bookmark-empty.png";
            bookmarkIcon.classList.remove('bookmarked');
        } else {
            // call function to add bookmark to list
            addBookmark(e.target.id);
            // switch image
            bookmarkIcon.src = "./assets/img/bookmark-red.png";
            bookmarkIcon.classList.add('bookmarked');
        }
    });
});

// get comment input boxes
let commentInputs = document.getElementsByClassName('comment-input');

// add event listener loop
Array.from(commentInputs).forEach((element) => {
    element.addEventListener("submit", (e) => {
        // prevent default action
        e.preventDefault();
        // get input value
        let comment = e.target.childNodes[1].value;
        // get blog id
        let blogId = Number(e.target.childNodes[1].id.replace('comment-input-', ''));
        // call add comment
        addComment(blogId, comment);
        // clear text box 
        e.target.childNodes[1].value = '';
        // display comment to screen
    });
});

// refresh the comments for all posts
blogPostsJson.forEach(item => {
    refreshComments(item.id); 
})