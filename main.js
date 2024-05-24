const modeEl = document.querySelector('.mode-btn')
const formEl = document.querySelector('.search-wrapper')
const inputEl = document.querySelector('.input')
const imgEl = document.querySelector('.avatar')
const nameEl = document.querySelector('.full-name')
const usernameEl = document.querySelector('.username')
const bioEl = document.querySelector('.bio')
const joinEl = document.querySelector('.join-info')
const reposEl = document.querySelector('.repos')
const followersEl = document.querySelector('.followers')
const followingEl = document.querySelector('.following')
const locationEl = document.querySelector('.location span')
const twitterEl = document.querySelector('.twitter span')
const blogEl = document.querySelector('.blog span')
const companyEl = document.querySelector('.company span')
const notFoundEl = document.querySelector('.btn-wrapper span')

// Mode
modeEl.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
})

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = inputEl.value
    getData(inputValue)
})

async function getData(username) {
    const API = `https://api.github.com/users/${username}`
    try {
        const response = await fetch(API)
        if (!response.ok) {
            throw new Error(`User not found: ${response.statusText}`)
        }
        const data = await response.json()
        console.log(data)
        notFoundEl.style.display = 'none'
        updateProfile(data)
    } catch (error) {
        notFoundEl.style.display = 'block'
        inputEl.style.width = '70%'
    }
}

function updateProfile(data) {
    imgEl.setAttribute('src', data.avatar_url || 'default-avatar.png')
    nameEl.textContent = data.name || 'No Name available'
    usernameEl.textContent = `@${data.login}`
    bioEl.textContent = data.bio || 'No bio available'
    joinEl.textContent = `Joined ${data.created_at.substring(0, 10)}`
    reposEl.textContent = data.public_repos
    followersEl.textContent = data.followers
    followingEl.textContent = data.following

    updateElement(locationEl, data.location)
    updateElement(twitterEl, data.twitter_username)
    updateElement(blogEl, data.blog, true)
    updateElement(companyEl, data.company)
}

function updateElement(el, value, isLink = false) {
    if (value) {
        el.textContent = value
        el.parentElement.style.opacity = '100%'
        if (isLink) {
            el.parentElement.setAttribute('href', value)
            el.parentElement.setAttribute('target', '_blank')
        }
    } else {
        el.textContent = 'Not Available'
        el.parentElement.style.opacity = '50%'
        if (isLink) {
            el.parentElement.removeAttribute('href')
            el.parentElement.removeAttribute('target')
        }
    }
}
