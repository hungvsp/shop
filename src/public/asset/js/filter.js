class GetView {
    constructor(box,btnLoadMore,filter,flagNumber= true){
        this.btnLoadMore = btnLoadMore
        this.box = box
        this.filter = filter
    }
    callBacKViews(data){
        const {status} = data
        var result = ''
         if(status){
             loading($('body'),false,2)
             const countReal = data.countReal
             console.log(countReal)
             if( countReal <= 0){
                this.btnLoadMore.hide(0)
             }else{
                this.btnLoadMore.show(0)
                const changeNumberCount = this.btnLoadMore.find('.change-number-count')
                changeNumberCount.text(countReal)
             }
            
             const templateHtml = `
             <div class="product-item l-3 l-2-10 m-3 m-6-m sm-6-m">
                 <div class="sale-off">
                     <span> 19%</span>
                 </div>
                 <div class="thumb-product">
                     <img src="{img}" alt="">
                 </div>
                 <h3 class="product-name"> {name} </h3>
                 <strong class="product-price">
                     <span class="price-sale"> {price} ₫</span>
                 </strong>
             </div>
         `
            const abc =data.data
            abc.forEach(function(item,i){
                 var htmlItem = ``
                 htmlItem = templateHtml.replace(/{img}/g,item.img)
                 htmlItem = htmlItem.replace(/{name}/g,item.name)
                 htmlItem = htmlItem.replace(/{price}/g,item.price)
                 result += htmlItem
             })
             console.log(this.box)
            this.box.append(result)
         }
    }

    callAjax(url,filter,pageCurrent,cb,type='post'){
        $.ajax({
            url,
            data:{filter:JSON.stringify({...filter}),pageCurrent},
            type,
            success:cb
        })
    }
    renderView(url,filter,pageCurrent,cb=this.callBacKViews.bind(this),type='post'){
        this.callAjax(url,filter,pageCurrent,cb,type)
    }
}



function loading(el,st=true,type = 1 ){
    console.log('type',type)
        if(type==1) {
            const children = $(el).children()
            if(st){
                children.css('display','none')
                $(el).append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>  ')
            }else{
                setTimeout(function(){
                    children.css('display','block')
                    $(el).find('.lds-ellipsis').remove()
                },300)
                
            }
        }
        else    {
            if(st){ 
                $(el).append('<div id= "dark"> <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> </div>  ')
            }else{
                setTimeout(function(){
                    $(el).find('#dark').remove()
                },300)
            }
        }
    }

async function filter(type,box,btnLoadMore){
    const btnShowModalBig = $('.filter-name-big')
    const btnFilterSee = $('.btn-filter-see')
    const filterBoxs = $('.filter-item-has-modal')
    const modalBox = $('.modal-filter-box')
    const filterItems =$('.modal-filter-item')
    const btnCheckOutBox = $('.check-out-filter')
    const body =$('body')
    const bgBlurBlack =$('.bg-blur-black')
    const filterBigBox = $('.filter-item-big')
    const categoryProductBox = $('.category-product-item')
    const btnCloseModalBig = $('.btn-close-modal-big button')
    const filterCheckedBox =$('.filter-checked-box')
    const arrayRenderCheckedItems = [];
    var objFilterData = {id_type:type}
    var pageCurrent = 1
    const getView = new GetView(box,btnLoadMore)
    const btnResetChecked = $('.check-out-filter .btn-out')
    function checkEverExitActive (currentEle){
        const parent = currentEle.closest('.filter-item-has-modal')
        if(parent &&  parent.find('.modal-filter-item').length ){
            id = $(parent.find('.modal-filter-item')[0]).data().id
            return id ? id : false
        }else{
            return false
        }
        
    }
    bgBlurBlack.click(function(){
        bgBlurBlack.css('display', 'none');
    })
    //xoa bo tat class active cac item nam trong the .filter-item-has-modal cua btnResetChecked  
    btnResetChecked.click(function(e){
        const id = checkEverExitActive ($(e.target))
        if(id) handleActiveClass ( filterItems,id,'remove')
        const parents = $(e.target).closest('.filter-item-has-modal')
        if(parents){ 
            const filterItemIner = parents.find('.modal-filter-item')
            if(filterItemIner) filterItemIner.removeClass('active')
            parents.removeClass('active');
            const idRemove = [];
            for(el of filterItemIner){
               idRemove.push((el.dataset.id).toString())
            }
            handleActiveClass ( filterItems,idRemove,'remove')
            const dataFilter = handleDataFiter ()
            const arrayRenderCheckedItems =  dataFilter.arrayRenderCheckedItems
            objFilterData= dataFilter.objFilterData
            if(objFilterData) {
                renderItemFilterChecked(arrayRenderCheckedItems)
                ajaxCountFiler(objFilterData)
            }else{
                renderItemFilterChecked([])
                btnCheckOutBox.slideUp(300)
            }
        }
        togleActiveNameFilters()
        
    })
    //tim index thoi qua id
    function findIndex (ar,id){
        var result = -1
        ar.forEach(function(item,index){
            if(item.id == id) {
                result=index
                return index
            }
        })
        return result
    }
    // render cac filter nguoi dung da chon
    function renderItemFilterChecked(array){
        var  HTMLItemChecked = array.length ?  "<b>Da Chon</b>" : ''; 
        array.forEach((item)=>{
            HTMLItemChecked = HTMLItemChecked + `<li class="filter-checked active"  > ${item}</li>`
        })
        filterCheckedBox.html(HTMLItemChecked)
    }
    function closeModal(){
        bgBlurBlack.css('display','none')
        filterBigBox.removeClass('isShow')
        
    }
    btnCloseModalBig.click(function(){
        closeModal();
    })
    btnShowModalBig.click(function(){
        const pos = categoryProductBox.offset().top
        $(window).scrollTop(pos - 5)
        bgBlurBlack.css('display','flex')
    })
    btnCheckOutBox.slideUp(0)
    // xu li dong mo cac  modal filer 
        body.click(function (e) {
            const currentEle = $(e.target)
            const elementParent= currentEle.closest('.filter-item-has-modal')
            const elemenBtnClose = currentEle.closest('.btn-close-modal-big')
            const elemenBtnCheckout = currentEle.closest('.btn-filter-see')
            //check co bam vao nut close modal khong
            if(!elemenBtnClose[0]){
                if(elemenBtnClose){
                    if(!elemenBtnCheckout.length){
                        if(elementParent){
                            filterBoxs.removeClass('isShow')
                            elementParent.addClass('isShow')
                        }else{
                            filterBoxs.removeClass('isShow');
                        }
                    }else{
                        filterBoxs.removeClass('isShow');
                    }
                } 
            }       
        })
    // xu ly scroll
    // $(window).scroll(function() {
    //     const categoryTilte= $('.category-title-box')
    //     const posTilte =categoryTilte.offset().top
    //     if($(this).scrollTop()>posTilte){
    //         categoryTilte.addClass('pos-fixed');
    //         closeModal()
    //     }
    //     if($(this).scrollTop() < categoryTilte.parent().offset().top){
    //         categoryTilte.removeClass('pos-fixed');
    //     }
    // });

    // xu ly xoa bo hoac them class active
    function handleActiveClass (ar,id,type='add',className='active'){
        if(type=='add'){
            for (el of ar ){
                if(el.dataset.id == id){
                    el.classList.add(className)
                }
            }
        }else if(type == 'remove'){
            let idRemove = []
            if(typeof id =='string' || typeof id == 'number'){
                idRemove.push(id.toString());
            }else if (typeof id == 'object'){
                idRemove=id
            }
            for (el of ar ){
                if(idRemove.indexOf(el.dataset.id) > -1){
                    el.classList.remove(className)
                }
            }
        }
    }
    //luu cac su lua chon nguoi dung clicked luu thanh obj de dua len sever lay du lieu ve thong qua ajax 
    function handleDataFiter (){
        const objFilterData = [];
        const arrayRenderCheckedItems= []
        filterItems.each(function(){
             if($(this).hasClass('active')){
                 const dataset = $(this).data()
                 const {type , filter} = dataset
                if(objFilterData[type]) {
                    const flagExist = objFilterData[type].indexOf(filter)
                    if (flagExist == -1) {
                        objFilterData[type].push(filter)
                        arrayRenderCheckedItems.push($(this).text().trim())
                    }
                }else{
                    objFilterData[type] = [filter];
                     arrayRenderCheckedItems.push($(this).text().trim())
                }
            }
        })
        return Object.keys(objFilterData).length ? {objFilterData , arrayRenderCheckedItems} : {objFilterData:false ,arrayRenderCheckedItems} 
    }
    handleFilter()
    function handleFilter () {
        filterItems.click(function (){
            const currentItem =  $(this)
            const dataId = $(this).data().id
            //show btn checkout filter
            const thisModalBox = currentItem.closest('.modal-filter-box')
            const thisFiterBox = currentItem.closest('.filter-item-has-modal')
            if( currentItem.hasClass('active') ){
                handleActiveClass ( filterItems,dataId,'remove' )
            }else{
                handleActiveClass ( filterItems,dataId )
            }
            const dataFilter = handleDataFiter ()
            const arrayRenderCheckedItems =  dataFilter.arrayRenderCheckedItems
            objFilterData= dataFilter.objFilterData

            if(objFilterData) {
                console.log(objFilterData)
                ajaxCountFiler(objFilterData);
                renderItemFilterChecked(arrayRenderCheckedItems)
                loading(btnFilterSee,true)
            }else{
                renderItemFilterChecked([])
            }
            const flagExistActive = filterItems.hasClass('active')? true : false
            if( flagExistActive ){
                btnCheckOutBox.slideDown(300)
                btnShowModalBig.addClass('active')
            }
            else {
                btnCheckOutBox.slideUp(300)
                btnShowModalBig.removeClass('active')
            }
            togleActiveNameFilters()
        })
    }
    //kiem tra cac item trong .filter-item-has-modal co active khong ? remove : add (class active tai .filter-name)
    function togleActiveNameFilters(){
        filterBoxs.each(function(){
            if( $(this).find('.modal-filter-box .active').length) {
                ( $(this).find('.filter-name').addClass('active'))
            }else{
                ( $(this).find('.filter-name').removeClass('active'))
            }
        })
    }
    // goi ajax len sever de lay so luong sau khi cho cac filter
    function ajaxCountFiler(filter){
        filter = filter  ? JSON.stringify({...filter,id_type:type}) : JSON.stringify({id_type:type});
        $.ajax({
            url:'/ajaxGetdata/countFilter',
            type:'post',
            data:{
                filter
            },
            success: function(count){
                const changeCount = $('.count-number-filter')
                changeCount.text(count)
                if(!count){
                    btnFilterSee.addClass('disable')
                    btnFilterSee.click(false)   
                }else{
                    btnFilterSee.removeClass('disable')
                }
               // btnFilterSee.loading('stop')
                loading(btnFilterSee,false)
            }
        })
    }
    //ajax  lay du lieu ve va goi ham render 
    
    btnFilterSee.click(function(){
        // kiem tra co bi disable hay khong ?
        if($(this).hasClass('disable')) return false
        box.empty()
        getView.renderView('/ajaxGetdata/loadMore',objFilterData,1)
        pageCurrent = 1
        filterBoxs.removeClass('isShow');
        bgBlurBlack.css('display','none')
        loading(body,true,2)
    })
    await btnLoadMore.click(function(){
        pageCurrent++
        loading(body,true,2)
        getView.renderView('/ajaxGetdata/loadMore',objFilterData,pageCurrent)
    })
    
}    

