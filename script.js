let toggle = document.getElementById("toggle-display");
let hiddenItems = document.getElementById("show-items");
let modal = document.querySelector(".modal");
let modalContainer = document.querySelector(".modal-container");
let randomItem = document.querySelector(".random-item");
let html = document.getElementsByTagName("html");
randomItem.addEventListener("click", ()=>{

    modal.style.display = "block";
    modal.style.zindex = 1000;
    modalContainer.style.display = "block";
    

    });

toggle.addEventListener("click", ()=>{
 hiddenItems.classList.toggle("hidden");
    if(hiddenItems.className != "hidden"){
        toggle.innerText = "Hide Items -";
    }
    else{
        toggle.innerText = "Show Items +"
    }
  

})


modalContainer.addEventListener("click", ()=>{
    modalContainer.style.display = "none";
    modal.style.display = "none";
})



