let myBookmark = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const bookmarkFromLocalStorage = JSON.parse(localStorage.getItem("myBookmark"))
const tabBtn = document.getElementById("tab-btn")

if (bookmarkFromLocalStorage) {
    myBookmark = bookmarkFromLocalStorage
    render(myBookmark)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myBookmark.push(tabs[0].url)
        localStorage.setItem("myBookmark", JSON.stringify(myBookmark) )
        render(myBookmark)
    })
})

function render(bookmark) {
    let listItems = ""
    for (let i = 0; i < bookmark.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${bookmark[i]}'>
                    ${bookmark[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myBookmark = []
    render(myBookmark)
})

inputBtn.addEventListener("click", function() {
    myBookmark.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myBookmark", JSON.stringify(myBookmark) )
    render(myBookmark)
})