let navButtons = document.querySelector('.nav__btns')
let listNavButtons = [...document.querySelectorAll('.nav__btns > *')]
let pageButtons = document.querySelector('.page__btns')
let pageList = document.querySelector('.page-list')
let select = document.querySelector('#limitItems')
let content = document.querySelector('.content')
let loaderBlock = document.querySelector('.loader')
let responseList = document.querySelector('.responseList')
let data
let key
let limitItems
let currentPage = 1;

// выпадающий список для отрисовки по условию
select.addEventListener('change', () => {
    main()
})

// делегирование кнопок навигации с последующим запуском основного кода
navButtons.addEventListener('click', async item => {
    if (item.target.tagName === 'BUTTON') {
        key = item.target.innerHTML.toLowerCase()
        loader.start()
        data = await fetchData(key)
        loader.stop()
        main()
    }
    listNavButtons.forEach(btn => {
        btn.classList.remove('active')
        if (btn.innerHTML.toLowerCase() == key) {
            btn.classList.add('active')
        }
    })

})

const loader = (() => {

    const start = () => {
        content.style.display = 'none';
        loaderBlock.style.display = 'block';
    };

    const stop = () => {
        loaderBlock.style.display = 'none';
        content.style.display = 'block';
    };
    return {
        start,
        stop,
    };
})();

// запрос на сервер и получение data
async function fetchData(key) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${key}`);
        data = await response.json();
        return data
    } catch (e) {
        alert(e);
        loader.stop()
    }
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
                    <button class="show-btn" data-user-id="${data[i].id}">Show more</button>
                </div>
            </li>`
            ;
    }

    document.querySelectorAll('.show-btn').forEach((button) => {
        button.addEventListener('click', async () => {
            const userId = button.getAttribute('data-user-id');
            await showUserDetails(userId);

            history.pushState({}, null, `/users/${userId}`);
        });
    });
}

// Отправка запроса на детали Пользователя
async function showUserDetails(userId) {
    try {
        loaderBlock.style.display = 'block';
        content.style.display = 'none';
        pageList.style.display = 'none';
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const userData = await response.json();
        loaderBlock.style.display = 'none';

        displayUserInfo(userData);
    } catch (e) {
        console.log(e);
    }
}

// шаблоны для парсинга данных отдельного пользователя
function displayUserInfo(userData) {
    let userDetailContainer = document.querySelector('.userDetail');
    userDetailContainer.style.display = 'block'

    userDetailContainer.innerHTML = `
    <li>
        <div class="item user">
            <div class="item-info">
                <div class="item-id"><h4>ID #${userData.id}</h4></div>
                <div class="item-name"><h4>Name:</h4><span>${userData.name}</span></div>
                <div class="item-username"><h4>Username:</h4><span>${userData.username}</span></div>
                <div class="item-email"><h4>E-mail:</h4><span>${userData.email}</span></div>
                <div class="item-address">
                    <h4>Address:</h4>
                    <p>Street: ${userData.address.street}</p>
                    <p>Suite: ${userData.address.suite}</p>
                    <p>City: ${userData.address.city}</p>
                    <p>Zipcode: ${userData.address.zipcode}</p>
                    <p>Geo: Lat ${userData.address.geo.lat}, Lng ${userData.address.geo.lng}</p>
                </div>
                <div class="item-phone"><h4>Phone:</h4><span>${userData.phone}</span></div>
                <div class="item-website"><h4>Website:</h4><span>${userData.website}</span></div>
                <div class="item-company">
                    <h4>Company:</h4>
                    <p>Name: ${userData.company.name}</p>
                    <p>CatchPhrase: ${userData.company.catchPhrase}</p>
                    <p>BS: ${userData.company.bs}</p>
                </div>
            </div>
            <button class="back-btn">Back to Users</button>
        </div>
    </li>`;
    const backButton = userDetailContainer.querySelector('.back-btn');
    if (backButton) {
        backButton.addEventListener('click', () => {
            loaderBlock.style.display = 'none';
            content.style.display = 'block';
            pageList.style.display = 'flex';
            userDetailContainer.style.display = 'none'
            userDetailContainer.innerHTML = '';

            history.pushState({}, null, '/');
        });
    }
}
