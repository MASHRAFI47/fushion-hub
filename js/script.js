const postsContainer = document.getElementById('posts-container');
const markReadContainer = document.getElementById('mark-read-container')

const markingRead = document.getElementById('marking-read')

let indicator = ''

let count = 0;

const countingMark = document.getElementById('counting-mark')
const countingMarkValue = parseInt(countingMark.innerText)

const latestPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const posts = data.posts
    displayPost(posts)
    markRead(posts)
}

const displayPost = async (posts) => {
    console.log(posts);
    posts.forEach(element => {

        const { category, isActive, image, title, comment_count, view_count, posted_time } = element

        if (isActive) {
            indicator = `<span class="indicator-item badge badge-success"></span>`
        } else {
            indicator = `<span class="indicator-item badge badge-error"></span>`
        }

        const div = document.createElement('div');
        div.innerHTML = `
                <div class="flex bg-[#797DFC1A] p-4 md:p-10 rounded-2xl mb-10">
                    <div class="indicator">
                        <div>
                            ${indicator}
                            <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${image}"></div>
                        </div>
                    </div>
                    <div class="ml-10">
                        <div class="flex gap-10 mb-3">
                            <h5 class="font-semibold"># ${category}</h5>
                            <h5 class="font-semibold">Author: ${element.author.name}</h5>
                        </div>

                        <div class="border-dashed border-b-2 border-gray-500">
                            <h2 class="text-lg md:text-xl font-bold mb-3">${title}</h2>
                            <p class="mb-4">It’s one thing to subject yourself to ha Halloween costume mishap because, hey that’s your prerogative</p>
                        </div>

                        <div class="flex justify-between">
                            <div class="flex gap-6 mt-6 mb-3">
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

}



function markRead() {
    const allBtn = document.querySelectorAll('.buttons')
    for (const btn of allBtn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault()
            count++
            const countingMarkValue = count
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

latestPosts()
