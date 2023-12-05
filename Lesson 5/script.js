// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(json => console.log(json))
let buttons = document.querySelector('.nav__btns')
let select = document.querySelector('#limitItems')
let responseList = document.querySelector('.responseList')
let data
let key
select.addEventListener('change', () => {
    // console.log(parseInt(select.options[select.selectedIndex].text))
    main()
})
buttons.addEventListener('click', async item => {
    if (item.target.tagName === 'BUTTON') {
        key = item.target.innerHTML.toLowerCase()
        console.log(key)
        await fetchData(key)
        main()
    }

})
async function fetchData(key) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${key}`)
    data = await response.json();
}

function preparePage(data, limitItems, page) {
    page--
    const start = limitItems * page;
    const end = start + limitItems;
    return data.slice(start, end);
}

function main() {
    const currentPage = 1;
    let limitItems = parseInt(select.options[select.selectedIndex].text);
    let limitPages = Math.ceil(Object.keys(data).length / limitItems) > 10 ? 10 : Math.ceil(Object.keys(data).length / limitItems);

    const preparedData = preparePage(data, limitItems, currentPage)
    switch(key) {
        case 'posts':
            showPosts(preparedData)
            break;
        case 'comments':
            showComments(preparedData)
            break;
        case 'albums':
            showAlbums(preparedData)
            break;
        case 'photos':
            showPhotos(preparedData)
            break;
        case 'todos':
            showTodos(preparedData)
            break;
        case 'users':
            showUsers(preparedData)
            break;
    }
    // console.log(limitPages, limitItems)
}

function showPosts(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        console.log(data[i])
        responseList.innerHTML +=
        `<li>
            <div class="post">
                <div class="post-info">
                    <div class="post-id"><h4>Post #${data[i].id}. User #${data[i].userId}</h4></div>
                    <div class="post-title"><h5>Title:</h5><span>${data[i].title}</span></div>
                    <div class="post-body"><h5>Body:</h5><span>${data[i].body}</span></div>
                </div>
            </div>
        </li>`
        ;
    }
}
function showComments(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        console.log(data[i])
        responseList.innerHTML +=
            `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${data[i].id}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
            ;
    }
}
function showAlbums(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        console.log(data[i])
        responseList.innerHTML +=
            `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${data[i].id}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
            ;
    }
}
function showPhotos(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        console.log(data[i])
        responseList.innerHTML +=
            `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${data[i].id}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
            ;
    }
}
function showTodos(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        console.log(data[i])
        responseList.innerHTML +=
            `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${data[i].id}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
            ;
    }
}
function showUsers(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        console.log(data[i])
        responseList.innerHTML +=
            `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${data[i].id}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
            ;
    }
}



















































// async function fetchPosts() {
//     try {
//       this.isPostsLoading = true;
//         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
//           params: {
//             _page: this.page,
//             _limit: this.limit,
//           }
//         });
//         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
//         this.posts = response.data;
//     } catch (e) {
//       alert('Ошибка')
//     } finally {
//       this.isPostsLoading = false;
//     }
//   },
//   async loadMorePosts() {
//     try {
//       this.page += 1;
//         const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
//           params: {
//             _page: this.page,
//             _limit: this.limit,
//           }
//         });
//         this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
//         this.posts = [...this.posts, ...response.data];
//     } catch (e) {
//       alert('Ошибка')
//     } finally {
//     }
//   }
// },
// mounted() {
//   this.fetchPosts();
// },