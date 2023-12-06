let navButtons = document.querySelector('.nav__btns')
let listNavButtons = [...document.querySelectorAll('.nav__btns > *')]
let pageButtons = document.querySelector('.page__btns')
let pageList = document.querySelector('.page-list')
let select = document.querySelector('#limitItems')
let content = document.querySelector('.content')
let loader = document.querySelector('.loader')
let responseList = document.querySelector('.responseList')
let data
let key
let limitItems
let currentPage
// выпадающий список для отрисовки по условию
select.addEventListener('change', () => {
    main()
})
// делегирование кнопок навигации с последующим запуском основного кода
navButtons.addEventListener('click', async item => {
    if (item.target.tagName === 'BUTTON') {
        key = item.target.innerHTML.toLowerCase()
        await fetchData(key)
        main()
    }
    listNavButtons.forEach(btn => {
        btn.classList.remove('active')
        if (btn.innerHTML.toLowerCase() == key) {
            btn.classList.add('active')
        }
    })

})
// запрос на сервер и получение data
async function fetchData(key) {
    loader.style.display = 'block'
    content.style.display = 'none'
    pageList.style.display = 'none'
    const response = await fetch(`https://jsonplaceholder.typicode.com/${key}`)
    data = await response.json();
    loader.style.display = 'none'
    content.style.display = 'block'
}
// подготовка данных, которые будут отображаться на конкретной странице
function preparePage(data, key, limitItems, page) {
    page--
    const start = limitItems * page;
    const end = start + limitItems;
    let preparedData = data.slice(start, end);
    switch (key) {
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
}
// добавление и обработка пагинации
function showPagination(limitPages) {
    pageList.style.display = 'flex'
    pageButtons.innerHTML = ''
    for (let page = 0; page < limitPages; page++) {
        pageButtons.innerHTML +=
            `<button class="page__btn">${page + 1}</button>
        `
            ;
    }
    // обработка кнопок страниц
    let pageBtns = [...document.querySelectorAll('.page__btn')]
    pageBtns.forEach(btn => {
                btn.classList.remove('active')
                if (btn.innerHTML == currentPage) {
                    btn.classList.add('active')
                }
            });
    pageButtons.addEventListener('click', item => {
        if (item.target.tagName === 'BUTTON') {
            currentPage = item.target.innerHTML;
            pageBtns.forEach(btn => {
                btn.classList.remove('active')
                if (btn.innerHTML == currentPage) {
                    btn.classList.add('active')
                }
            });
            preparePage(data, key, limitItems, currentPage)
        }
    })
}
// главный кодик
function main() {
    currentPage = 1;
    limitItems = parseInt(select.options[select.selectedIndex].text);
    let limitPages = Math.ceil(Object.keys(data).length / limitItems) > 10 ? 10 : Math.ceil(Object.keys(data).length / limitItems);
    showPagination(limitPages)
    preparePage(data, key, limitItems, currentPage)
}


// шаблоны для парсинга данных
function showPosts(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        responseList.innerHTML +=
            `<li>
            <div class="item">
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
        responseList.innerHTML +=
            `<li>
            <div class="item">
                <div class="item-info">
                    <div class="post-id"><h4>Post #${data[i].postId}. Comment #${data[i].id}</h4></div>
                    <div class="comment-from">
                        <div><h5>Name:</h5><span>${data[i].name}</span></div>
                        <div><h5>E-mail:</h5><span>${data[i].email}</span></div>
                    </div>
                    <hr>
                    <div class="post-body"><h5>Body:</h5><span>${data[i].body}</span></div>
                </div>
            </div>
        </li>`
            ;
    }
}
function showAlbums(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        responseList.innerHTML +=
            `<li>
            <div class="item">
                <div class="item-info">
                    <div class="item-id"><h4>Album #${data[i].id}. User #${data[i].userId}</h4></div>
                    <div class="item-title"><h5>Title:</h5><span>${data[i].title}</span></div>
                </div>
            </div>
        </li>`
            ;
    }
}
function showPhotos(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        responseList.innerHTML +=
            `<li>
            <div class="item">
                <div class="item-info">
                    <div class="item-id"><h4>Album #${data[i].albumId}. Photo #${data[i].id}</h4></div>
                    <div class="item-title"><h5>Title:</h5><span>${data[i].title}</span></div>
                    <hr>
                    <img class="item-img" src="${data[i].url}">
                </div>
            </div>
        </li>`
            ;
    }
}
function showTodos(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        responseList.innerHTML +=
            `<li class="${data[i].completed ? 'complete' : ''}">
            <div class="item">
                <div class="item-info">
                    <div>
                        <div class="item-id"><h4>User #${data[i].userId}. Task #${data[i].id}</h4></div>
                        <div class="item-title"><h5>Title:</h5><span>${data[i].title}</span></div>
                    </div>
                    <div class="item-status">${data[i].completed ? 'Done' : 'Not Done'}</div>
                </div>
            </div>
        </li>`
            ;
    }
}
function showUsers(data) {
    responseList.innerHTML = '';
    for (let i in data) {
        responseList.innerHTML +=
            `<li>
                <div class="item user">
                    <div class="item-info">
                        <div class="item-id"><h4>ID #${data[i].id}</h4></div>
                        <div class="item-name"><h4>Name:</h4><span>${data[i].name}</span></div>
                        <div class="item-username"><h4>Username:</h4><span>${data[i].username}</span></div>
                        <div class="item-email"><h4>E-mail:</h4><span>${data[i].email}</span></div>
                    </div>
                    <button>Show</button>
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