class Client {
    getViewMain(type = '',data=[],typeProduct){
        switch (type){
            case 'products':
                return this.getViewProduct(data,typeProduct)
            case 'form':
                return this.getHtmlInput()
            default: return this.getViewProduct(data,typeProduct)
        }
    }
    getHtmlInput(type="text",required=false,placeholder="",name = ""){
        return `
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`
    }
    getScriptLoadMore(typeProduct){
        return `
            <script>
                $( document ).ready(function() {
                    const type = ${typeProduct}   
                    const btnLoadMore= $('#btn-load-more')
                    const box = $('.product-box');
                    filter(type,box,btnLoadMore) 
                });
            </script>
        `
    }
    getHtmlProducts(data=[]){   
        var htmlproducts = ''
        data.forEach((item,i)=>{
            const priceOriginal = item.priceOriginal ? ` <span class="price-origin">${item.priceOriginal}₫</span>`:''
            const price = item.price ? ` <span class="price-sale">${item.price}₫</span>`:''
            const img = item.img ? ` <img src="${item.img}" alt="">` : ''
            htmlproducts += `
                <div class="product-item l-3 l-2-10 m-3 m-6-m sm-6-m">
                    <div class="sale-off">
                        <span> 19%</span>
                    </div>
                    <div class="thumb-product">
                        ${img}
                    </div>
                    <h3 class="product-name"> ${item.name} </h3>
                    <strong class="product-price">
                        ${price}
                        ${priceOriginal}
                    </strong>
                </div>`
        })
        return htmlproducts
        
    }
    getHmtlFilters(dataFilter=[]){ 
        const arrKey = Object.keys(dataFilter.toObject())
        var contentFiltersBox =''
        var contentFilterItem =''
        arrKey.forEach((key,i)=>{
            let htmlItemFilter = ''

            if(key != '_id' && key != 'id_type' ) {
                dataFilter[key].forEach((item,j)=>{
                    htmlItemFilter +=`
                        <div class="modal-filter-item" data-filter ="${item[1]}" data-id="${i}${j}" data-type="${key}">
                            ${item[0]}
                        </div>
                `
                })

         
                contentFilterItem +=`
                <div class="filter-item filter-item-has-modal ">
                    <div class="filter-name ">
                        ${key}
                        <i class="fas fa-caret-up icon-caret-up"></i>
                        <i class="fas fa-caret-down icon-caret-down"></i>
                    </div>
                    <div class="modal-filter-box">
                        <div class="modal-filter-item-box">
                            ${ htmlItemFilter}
                        </div>
                        <div class="check-out-filter">
                            <button class="btn-out" aria-label="Reset ">
                                Bo Chon
                            </button>
                            <button class="btn-filter-see " aria-label="See product">
                                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                                    <span> <span> xem <span class="count-number-filter"> 0 </span> ket qua </span> </span>
                            </button>
                        </div>
                    </div>
                </div>
                `
                contentFiltersBox +=`
                    <div class="filter-item-box">
                        <h3 class="title-filter">${key}</h3>
                        ${htmlItemFilter}
                    </div> `
            }
        })
        return `
        <div class="filter-box">
            <div class="filter-item-left">
                <div class="filter-item  filter-item-has-modal  filter-item-big " >
                    <div class="filter-name filter-name-big" id="btn-filter">
                        <i class="fas fa-filter"></i> Bộ lọc
                    </div>
                    <div class="modal-filter-box modal-big-filter-box ">
                        <div class="header-modal">
                            <div class="btn-close-modal-big">
                                <button  aria-label="Close">
                                    <i class="fas fa-times icon-close-modal-big"></i>
                                    Đóng
                                </button>
                            </div>
                            <ul class="filter-checked-box ">
                            </ul>
                        </div>
                        <div class="filter-item-modal-box">
                            ${contentFiltersBox}
                        </div>
                        <div class="pos-sticky check-out-filter">
                            <button class="btn-out" aria-label="Reset ">
                                Bo Chon
                            </button>
                            <button class="btn-filter-see " aria-label="See product">
                                    <span> xem <span class="count-number-filter"> 0 </span> ket qua </span>
                            </button>
                        </div> 
                    </div>
                </div>
            </div>  
           
            <div class="filter-right right">
                ${contentFilterItem}
            </div> 
        </div>
        
        `
    }
    getHtmlTitle (data=[]){
       
        if(data.filter){
            const htmlFilters = this.getHmtlFilters(data.filter[0])
            return `
            <link rel="stylesheet" href="./asset/css/filter.css">
            <div class="category-title wide grid ">
                <div class="right">
                    <h2> 
                        ${data.name}
                    </h2>
                </div>
                ${htmlFilters}
            </div> 
            `
        }else{
            return `
                <div class="right">
                    <h2> 
                        <a href="/${data.slug}"> <img src="./asset/img/icon/icon_food.png" alt="">  ${data.name}</a>
                    </h2>
                </div>
                <ul class="left">
                    <i class="fas fa-chevron-left btn-pre"></i>
                    <li class="active itemFrist">
                        chua co du lieu
                    </li>
                    <li class="border-left">
                        chua co du lieu
                    </li>
                    <i class="fas fa-chevron-right btn-next"></i>
                </ul>`
        }      
    }
    getViewProduct(data=[],typeProduct){
        var htmlViewProduct =""
        data.forEach((item,i)=>{
            const htmlBtnLoadMore = item.ajax ? `
            <div class="btn-load-more-box">
                <span  class="btn-load-more" id= "btn-load-more" >
                    Xem thêm <span class="change-number-count">${item.totalCount} </span> ${item.name.toLowerCase()} khac
                </span>
            </div>
            ${this.getScriptLoadMore(typeProduct)}
            `:''
            if(item.products && item.products.length){
                
                htmlViewProduct +=`
                <div class="category-product-item wide grid row">
                    <div class="category-title">
                        ${this.getHtmlTitle(item)}
                    </div>
                    <div class="banner_item l-12">
                        <div class="img">
                                <img src="./asset/img/baner/image_banner_product_1.jpg" alt="">
                        </div>
                    </div>
                    <div class="product-box row">
                        <!-- bat dau item -->
                        ${this.getHtmlProducts(item.products)}
                        <!-- ket thuc item -->
                        
                    </div>
                    ${htmlBtnLoadMore}
                </div>
                `
            }    
           
            return htmlViewProduct

        })

        return htmlViewProduct
    }
}
module.exports = Client