const postsContainer = document.getElementById('posts-container');
const markReadContainer = document.getElementById('mark-read-container')

const markingRead = document.getElementById('marking-read')

const searchBtn = document.getElementById('search-btn');

const latestPost = document.getElementById('latest-post')

const spinnerContainer = document.getElementById('spinner-container');

let indicator = ''

let count = 0;

let res = '';




const countingMark = document.getElementById('counting-mark')
const countingMarkValue = parseInt(countingMark.innerText)

const allPosts = async (categoryName = 'comedy') => {
    // dynamic fetch
    if (res.length === 0) {
        res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    }
    else {
        res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    }
    // const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data = await res.json();
    const posts = data.posts
    displayPost(posts)
    markRead(posts)
}

const displayPost = async (posts) => {
    postsContainer.textContent = ''
    posts.forEach(element => {
        //destructuring
        const { category, isActive, image, title, comment_count, view_count, posted_time, description } = element

        // show green if active
        if (isActive) {
            indicator = `<span class="indicator-item badge badge-success"></span>`
        } else {
            indicator = `<span class="indicator-item badge badge-error"></span>`
        }

        // append
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="flex flex-col md:flex-row items-center md:items-start bg-[#797DFC1A] p-4 md:p-10 rounded-2xl mb-10">
                    <div class="indicator my-3 md:my-0">
                        <div>
                            ${indicator}
                            <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${image}" class="rounded-xl"></div>
                        </div>
                    </div>
                    <div class="ml-0 md:ml-10">
                        <div class="flex gap-10 mb-3">
                            <h5 class="font-semibold"># ${category}</h5>
                            <h5 class="font-semibold">Author: ${element.author.name}</h5>
                        </div>

                        <div class="border-dashed border-b-2 border-gray-500">
                            <h2 class="text-lg md:text-xl font-bold mb-3">${title}</h2>
                            <p class="mb-4">${description}</p>
                        </div>

                        <div class="flex justify-between">
                            <div class="grid grid-cols-3 lg:grid-cols-3 gap-6 mt-6 mb-3">
                                <div class="flex gap-3">
                                    <img src="images/comments.png" alt="">
                                    <p>${comment_count}</p>
                                </div>
                                <div class="flex gap-3">
                                    <img src="images/views.png" alt="">
                                    <p>${view_count}</p>
                                </div>
                                <div class="flex gap-3">
                                    <img src="images/duration.png" alt="">
                                    <p>${posted_time + ' min'}</p>
                                </div>
                            </div>
                            <button><img src="images/mark.png" class="buttons" id="marking-read" alt=""></button>
                        </div>
                    </div>
                </div>
        `
        postsContainer.appendChild(div)
    });
    setTimeout(() => {
        spinner(false)
    }, 2000);
}

// mark as read functionality
function markRead() {
    const allBtn = document.querySelectorAll('.buttons')
    for (const btn of allBtn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault()
            count++;
            const countingMarkValue = count;
            countingMark.innerText = countingMarkValue

            const title = e.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML;
            const views = e.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[3].innerText
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="flex bg-white p-3 rounded-xl mt-2">
                <p class="w-[70%]">${title}</p>
                <div class="flex items-center gap-2 w-[30%]">
                    <img src="images/views.png" width="20px" alt="">
                    <p>${views}</p>
                </div>
            </div>
            `
            markReadContainer.appendChild(div)
        })
    }
}

// search by category name
searchBtn.addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const categoryName = searchField.value;
    allPosts(categoryName)
    spinner(true)
})


allPosts()


const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    allLatestPosts(data)
}

function allLatestPosts(data) {
    for (const singleData of data) {

        //destructuring
        const { cover_image, profile_image, description, title } = singleData

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex flex-col gap-3 border-2 rounded-2xl p-5">
            <img src="${cover_image}" alt="" class="bg-[#12132D0D]">
            <div class="flex items-center gap-2">
                <i class="fa fa-calendar" aria-hidden="true"></i>
                <p>${singleData.author.posted_date ? singleData.author.posted_date: "No Publish Date" }</p>
            </div>
            <h4 class="text-xl font-semibold">${title}</h4>
            <p class="text-[#12132D99]">${description}</p>
            <div class="flex gap-2">
                <img src="${profile_image}" width="40px" class="rounded-full" alt="">
                <div>
                    <h5>${singleData.author.name}</h5>
                    <p>${singleData.author.designation ? singleData.author.designation : "Unknown"}</p>
                </div>
            </div>
        </div>
        `
        latestPost.append(div)
    }
    
}


function spinner(bool) {
    if(bool) {
        spinnerContainer.classList.remove('hidden')
    } else {
        spinnerContainer.classList.add('hidden')
    }
}

latestPosts()