// Initialize an empty array to store bookmarks
let myBookmark = []

// Get references to HTML elements
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Retrieve bookmarks from local storage and parse the JSON string
const bookmarkFromLocalStorage = JSON.parse(localStorage.getItem("myBookmark"))

// If there are bookmarks in local storage, update myBookmark and render them
if (bookmarkFromLocalStorage) {
    myBookmark = bookmarkFromLocalStorage
    render(myBookmark)
}

// Add click event listener to the tab button
tabBtn.addEventListener("click", function(){    
    // Query for the active tab in the current window
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        // Add the URL of the active tab to myBookmark array
        myBookmark.push(tabs[0].url)
        // Save the updated myBookmark array to local storage
        localStorage.setItem("myBookmark", JSON.stringify(myBookmark))
        // Render the updated bookmarks
        render(myBookmark)
    })
})

// Function to render the bookmarks as a list
function render(bookmark) {
    let listItems = ""
    // Loop through each bookmark and create a list item with a link
    for (let i = 0; i < bookmark.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${bookmark[i]}'>
                    ${bookmark[i]}
                </a>
            </li>
        `
    }
    // Update the unordered list's HTML with the created list items
    ulEl.innerHTML = listItems
}

// Add double-click event listener to the delete button
deleteBtn.addEventListener("dblclick", function() {
    // Clear all items from local storage
    localStorage.clear()
    // Reset myBookmark to an empty array
    myBookmark = []
    // Render the empty bookmark list
    render(myBookmark)
})

// Add click event listener to the input button
inputBtn.addEventListener("click", function() {
    // Add the value from the input field to myBookmark array
    myBookmark.push(inputEl.value)
    // Clear the input field
    inputEl.value = ""
    // Save the updated myBookmark array to local storage
    localStorage.setItem("myBookmark", JSON.stringify(myBookmark))
    // Render the updated bookmarks
    render(myBookmark)
})