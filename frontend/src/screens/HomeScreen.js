
import Rating from '../components/Rating.js'
import { getProducts } from '../api.js'
import { parseRequestUrl } from '../utils.js';

const HomeScreen={
    render: async()=>{
   const { value } = parseRequestUrl();
    const products = await getProducts({ searchKeyword: value })
if(products.error){
    return`<div class='error'>${products.error}</div>`
}


   return`
   <ul class='products'>
   ${products.map(product=>`
   <li>
    <div class="product">
                        <a href="/#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}"/>
                        </a>
                        <div class="product-name">
                            <a href="/#/product/1">${product.name}</a>
                        </div>
                        <div class="product-brand">${product.brand}</div>
                        <div class="product-price">₦${product.price}</div>
                        <!-rating component--->
                        <div class="product-rating">${Rating.render({value:product.rating, text:`${product.numReviews}reviews`,})}</div>
                    </div>
   </li>
   `
   ).join('\n')}
   ` 
    }
}

export default HomeScreen;