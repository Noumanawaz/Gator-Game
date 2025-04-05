function async main(){
    await render();
    await update();
    setTimeout(main, 1000);
    console.log("Main loop running...");
}

let a = document.getElementsByClassName('center-button');
a[0].addEventListener('click', function() {
    console.log("Play Game button clicked!");
    // Save game options here
    // For example, save the selected category and word count to local storage
    const selectedCategory = document.getElementById("category-select").value;
    const wordCount = document.getElementById("word-count").value;
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("wordCount", wordCount);
});