function removeClass(ele,nameClass){
    ele.classList.remove(nameClass)
}   

const btnSeeMore = document.querySelector('#btn-see-more-detail')
const description = document.querySelector('#description-content')
btnSeeMore.onclick=function(){
    this.style.display="none";
    removeClass(description,'description-hidden')
}