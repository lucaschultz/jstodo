
// function resizeGridItem(item){
//     grid = document.getElementById("main-content-wrapper");
//     rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
//     rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
//     rowSpan = Math.ceil((item.querySelector('.todo-list-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
//     item.style.gridRowEnd = "span "+rowSpan;
// }

// function resizeAllGridItems(){
//     console.log("HELLOWWWWW") 
//     allItems = document.getElementsByClassName("todo-list-wrapper");
//     for(x=0; x<allItems.length; x++){
//         resizeGridItem(allItems[x]);
//     }
// }

// window.onload = resizeAllGridItems();