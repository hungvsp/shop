class Modal{
    constructor(){
        this.btnOrders=document.querySelectorAll('.btn-order')
        this.removeModal=document.querySelector('.btn-remove-modal')
        this.modal=document.querySelector('.modal-cart-container')
    }
    hide(element){
        element.classList.remove("in");
    }
    show(element){
        element.classList.add("in");
    }
    haldModal(){
        for(let ele of this.btnOrders){
            ele.onclick=()=>{
                this.show(this.modal)
            }   
        }
        this.removeModal.onclick=(e)=>{
            this.hide(this.modal);
            console.log(e.target)
        }
        this.modal.onclick=(e)=>{
            if(e.target==this.modal) this.hide(this.modal)
        }
    }
}
const modalNew = new Modal
modalNew.haldModal();

class Menu{
    constructor(){
        this.btnDropMenu=document.querySelector('#btn-menu')
        this.menuList=document.querySelector('#top-nav')
        this.flag=true
    }
    drop(element){
        if(this.flag){
            this.flag=false;
            element.classList.remove("up");
            console.log( this.flag)
        }else{
            this.flag=true;
            element.classList.add("up");
            console.log( this.flag)
        }
    }
    haldMenu(btn){
        this.btnDropMenu.onclick=(e)=>{
            this.drop(this.menuList)
        }
    }
}
const removeAllClass=function(items,className){
    for(item of items){
        item.classList.remove(className)
    }
}
const test = new Menu
test.haldMenu();

class SliceItem{
    constructor(){
        this.elementParents=document.querySelectorAll('.category-title .left')
    }
    selectItem(parents){
        let ele
        let x=0
        for(ele of parents){
            const btnNext=ele.querySelector('.btn-next')
            const btnPrev=ele.querySelector('.btn-pre')
            const items=ele.querySelectorAll(' li')
            const active=ele.querySelector('.active')
            const itemFrist=ele.querySelector('.itemFrist')
            const lenItem=items.length
            var coppyitemFrist
            var i=0
            btnNext.onclick=function(){
               if(coppyitemFrist && coppyitemFrist==itemFrist){
                  i= i>lenItem-2 ? 0:++i
               }else{
                  i=1
               }
               coppyitemFrist=itemFrist
               removeAllClass(items,'active')
               items[i].classList.add("active")
            }
            btnPrev.onclick=function(){
                if(coppyitemFrist && coppyitemFrist==itemFrist){
                    i= i==0 ? lenItem-1:--i
                 }else{
                    i=lenItem-1
                 }
                 coppyitemFrist=itemFrist
                 removeAllClass(items,'active')
                 items[i].classList.add("active")
                }
        }
    }
    run(){
        this.selectItem(this.elementParents)
    }
}
const slice=new SliceItem
    slice.run()
// hadle menu less 1024px 

// class HeightMenu{
//     constructor(){
//         this.elements=document.querySelectorAll(' .menu-item');
//         this.elementParent=document.querySelector('#top-nav')
//     }
//     getHeight(ele){
//         return ele.offsetHeight
//     }
//     setHeight(elementParent){
//         elementParent.style.height=60*(this.elements.length)+'px';
//         elementParent.style.display='block'
//     }
//     run(){
//         this.setHeight(this.elementParent)
//         console.log(this.elements)
//     }
// }
// const heightMenu= new HeightMenu
// heightMenu.run()