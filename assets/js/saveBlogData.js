// set data to the 
const data = [
    {
        id: 1,
        title: "Title 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non luctus ipsum. Phasellus non aliquet ex. Quisque posuere cursus viverra. Curabitur pellentesque, ligula ac consequat tristique, nulla eros dictum eros, a porttitor orci neque at augue. Vestibulum ac lorem vel metus pretium dictum. Duis tincidunt purus ex, quis cursus nunc laoreet sit amet.",
        comments: []
    },
    {
        id: 2,
        title: "Title 2",
        content: "Phasellus sit amet libero vel turpis dictum ultrices et eget dolor. Morbi arcu augue, pulvinar vitae rhoncus quis, aliquet nec dui. Suspendisse in porta ex.",
        comments: []
    },
    {
        id: 3,
        title: "Title 3",
        content: "Ut gravida, turpis et gravida molestie, purus velit pretium ante, sollicitudin mollis justo arcu et dolor. Pellentesque tempus mauris eu sollicitudin blandit. Nullam viverra turpis metus, eget feugiat neque suscipit non. Pellentesque nec elementum ante, eu facilisis leo.",
        comments: []
    },
    {
        id: 4,
        title: "Title 4",
        content: "Nullam ac nunc sem. Ut nec imperdiet mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti.",
        comments: []
    },
    {
        id: 5,
        title: "Title 5",
        content: "Pellentesque sem tellus, dignissim a nulla vel, commodo hendrerit arcu. Aliquam congue, metus et vehicula luctus, odio ipsum efficitur ex, eu porttitor quam tellus eget nisl. Nunc porttitor id lacus quis condimentum. ",
        comments: []
    },
    {
        id: 6,
        title: "Title 6",
        content: "Nulla ultrices urna iaculis urna varius, nec elementum magna convallis. Mauris pulvinar metus velit, at blandit lacus vestibulum non. Nunc at interdum tellus. Nam sit amet accumsan tellus. Proin vitae nulla augue. Mauris porta cursus urna et tristique. Proin in facilisis orci. Nunc auctor eget nunc at scelerisque. ",
        comments: []
    }
];

// set data to localstorage
let jsonBlogDataLS = localStorage.getItem('blogs');
if(!jsonBlogDataLS){
    let jsonBlogData = JSON.stringify(data);
    localStorage.setItem('blogs', jsonBlogData);
}

// set place holder for saved List 
let likedList = localStorage.getItem('likedBlogs');
let bookmarkedList = localStorage.getItem('bookmarkedBlogs');

// if there is no saved list
if(!likedList){
    // add empty place holder list to localstorage
    localStorage.setItem('likedBlogs', '[]');
}

// if there are no bookmarked blogs
if(!bookmarkedList){
    // add empty array to localstorage
    localStorage.setItem('bookmarkedBlogs', '[]');
}