// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(json => console.log(json))
let buttons = document.querySelector('.nav__btns')
let responseList = document.querySelector('.responseList')

buttons.addEventListener('click', item => {
    if (item.target.tagName === 'BUTTON') {
        let key = item.target.innerHTML.toLowerCase()
        console.log(key)
        main(key)
    }

})
async function fetchData(key) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${key}`)
    const data = await response.json();
    return data
}

async function main(key) {
    const data = await fetchData(key)
    let limitPages = Math.ceil(Object.keys(data).length / 10);
    let limitItems = Object.keys(data).length / limitPages;
    newData = data.slice(0, limitItems)
    loadPosts(newData)
    console.log(limitPages, limitItems)
}

async function loadPosts(data) {
    try {
        responseList.innerHTML = '';
        for (let i in data) {
            console.log(data[i])
            responseList.innerHTML +=
                `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${i}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
                ;
        }
    }
    catch (e) {
        console.error(e)
    }
}
async function fetchComments() {
    try {
        responseList.innerHTML = '';

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();

        for (let i in data) {
            console.log(data[i])
            responseList.innerHTML +=
                `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${i}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
                ;
        }
    }
    catch (e) {
        console.error(e)
    }
}
async function fetchaAlbums() {
    try {
        responseList.innerHTML = '';

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();

        for (let i in data) {
            console.log(data[i])
            responseList.innerHTML +=
                `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${i}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
                ;
        }
    }
    catch (e) {
        console.error(e)
    }
}
async function fetchPhotos() {
    try {
        responseList.innerHTML = '';

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();

        for (let i in data) {
            console.log(data[i])
            responseList.innerHTML +=
                `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${i}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
                ;
        }
    }
    catch (e) {
        console.error(e)
    }
}
async function fetchTodos() {
    try {
        responseList.innerHTML = '';

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();

        for (let i in data) {
            console.log(data[i])
            responseList.innerHTML +=
                `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${i}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
                ;
        }
    }
    catch (e) {
        console.error(e)
    }
}
async function fetchUsers() {
    try {
        responseList.innerHTML = '';

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await response.json();

        for (let i in data) {
            console.log(data[i])
            responseList.innerHTML +=
                `<li>
                <div class="user">
                    <div class="user-info">
                        <div class="user-id">ID #${i}</div>
                        <div class="user-name">Name - ${data[i].name}</div>
                        <div class="user-username">Username - ${data[i].username}</div>
                        <div class="user-email">E-mail - ${data[i].email}</div>
                    </div>
                </div>
            </li>`
                ;
        }
    }
    catch (e) {
        console.error(e)
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