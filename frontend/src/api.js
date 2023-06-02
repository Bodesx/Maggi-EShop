
import axios from "axios"
import { apiUrl } from "./config"
import { getUserInfo } from "./localStorage"


//GET PRODUCTS//
/*---function to send request to server  id api----dashboard*/
export const getProducts = async ({ searchKeyword = '' }) => {
    try{
        let queryString = '?';
    if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;
        const response=await axios({
            url: `${apiUrl}/api/products${queryString}`,
             method: "GET",
             headers: {
                'Content-Type':'application/JSON',
             }
        })
        if(response.statusText !=='OK'){
            throw new Error(response.data.message)
        }
     return response.data
    }catch(err){
console.log(err)
return {error: err.response.data.message || err.message}
    }
}

//GET PRODUCT SPECIFIC//
/*---function to send request to server  id api----*/
export const getProduct = async (id)=>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
             method: 'GET',
             headers: {
                'Content-Type':'application/JSON',
             },
        })
        if(response.statusText !=='OK'){
            throw new Error(response.data.message)
        }
     return response.data
    }catch(err){
console.log(err)
return{error: err.response.data.message || err.message}
    }
}



//CREATE PRODUCT//
export const createProduct = async()=>{
   try{
    const {token}= getUserInfo()
    const response = await axios({
        method:'POST',
        url:`${apiUrl}/api/products`,
        headers:{'Content-Type':'application/JSON', Authorization:`Bearer ${token}`,
    }
    })
    if(response.statusText !=='Created'){
        throw new Error(response.data.message)
    }
    return response.data
     } catch(err){
       return{error: err.response.data.message || err.message} 
     }
}

//CREATE REVIEW
export const createReview = async (productId, review) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/products/${productId}/reviews`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: review,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};


//DELETE PRODUCT//
export const deleteProduct = async(productId)=>{
   try{
    const {token}= getUserInfo()
    const response = await axios({
        method:'DELETE',
        url:`${apiUrl}/api/products/${productId}`,
        headers:{'Content-Type':'application/JSON', Authorization:`Bearer ${token}`,
    }
    })
    if(response.statusText !=='OK'){
        throw new Error(response.data.message)
    }
    return response.data
     } catch(err){
       return{error: err.response.data.message || err.message} 
     }
}


//UPDATE PRODUCT //
export const updateProduct = async(product)=>{
   try{
    const {token}= getUserInfo()
    const response = await axios({
        method:'PUT',
        url:`${apiUrl}/api/products/${product._id}`,
        headers:{'Content-Type':'application/JSON', Authorization:`Bearer ${token}`,
    },
    data:product
    })
    if(response.statusText !=='OK'){
        throw new Error(response.data.message)
    }
    return response.data
     } catch(err){
       return{error: err.response.data.message || err.message} 
     }
}

//UPLOAD IMAGE OF PRODUCT
export const uploadProductImage = async (formData)=>{
    try{
    const {token}=getUserInfo()
const response=await axios ({
    url:`${apiUrl}/api/uploads`,
    method:'POST',
    headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        
    },
    data:formData
})
if(response.statusText !=='Created'){
    throw new Error(response.data.message)
}else{
    return response.data
}
    }catch(err){
      return{error: err.response.data.message || err.message}  
    }
}










/*export signin-screen */

export const signin = async ({email, password,})=>{
    try{
const response= await axios({
    url: `${apiUrl}/api/users/signin`,
    method:'POST',
    header:{
        'Content-Type':'application/JSON',
    },
    data:{email,password,}
})
if(response.statusText !=='OK'){
    throw new Error(response.data.message)
}
return response.data
    }catch(err){
        console.log(err)
        return{error:err.response.data.message||err.message}
    }
}

/*export register-screen */

export const register = async ({name, email, password,})=>{
    try{
const response= await axios({
    url: `${apiUrl}/api/users/register`,
    method:'POST',
    header:{
        'Content-Type':'application/JSON',
    },
    data:{name, email,password,}
})
if(response.statusText !=='OK'){
    throw new Error(response.data.message)
}
return response.data
    }catch(err){
        console.log(err)
        return{error:err.response.data.message||err.message}
    }
}

/*export update-screen */

export const update = async ({name, email, password,})=>{
    try{ 
        const{_id,token}=getUserInfo()
const response= await axios({
    url: `${apiUrl}/api/users/${_id}`,
    method:'PUT',
    headers:{
        'Content-Type':'application/JSON',
         Authorization:`Bearer${token}`,
    },
    data:{name, email,password,}
})
if(response.statusText !=='OK'){
    throw new Error(response.data.message)
}
return response.data
    }catch(err){
        console.log(err)
        return{error:err.response.data.message||err.message}
    }
}







//ORDER  SECTION //









//CREATE ORDER

export const createOrder=async(order)=>{
    try{
    const { token } = getUserInfo()
    const response= await axios({
    url:`${apiUrl}/api/orders`,
    method: 'POST',
     headers:{'Content-Type':'application/json',
     Authorization:`Bearer ${token}`},
     data: order, 
})
if(response.statusText !=='Created'){
    throw new Error(response.data.message)
}
return response.data
    }catch(err){
        return{error: err.response ? err.response.data.message : err.message}
    }
}


export const getOrders = async()=>{
    try{
        const { token } = getUserInfo()
        const response=await axios({
            url: `${apiUrl}/api/orders`,
             method: "GET",
             headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
             }
        })
        if(response.statusText !=='OK'){
            throw new Error(response.data.message)
        }
     return response.data
    }catch(err){
console.log(err)
return {error: err.response.data.message || err.message}
    }
}

//DELETE PRODUCT//
export const deleteOrder = async(orderId)=>{
   try{
    const {token}= getUserInfo()
    const response = await axios({
        url: `${apiUrl}/api/orders/${orderId}`,
        method:'DELETE',
        headers:{'Content-Type':'application/json', 
        Authorization:`Bearer ${token}`,
    }
    })
    if(response.statusText !=='OK'){
        throw new Error(response.data.message)
    }
    return response.data
     } catch(err){
       return{error: err.response.data.message || err.message} 
     }
}




export const getOrder = async(id)=>{
    try{
 const { token }=getUserInfo()
    const response=await axios({
        url:`${apiUrl}/api/orders/${id}`,
        headers:{
            'Content-Type':' application/json',
            Authorization: `Bearer ${token}`,

        }
    })
    if(response.statusText !=='OK'){
        throw new Error(response.data.message)
    }
    return response.data
    }catch(err){
        return{error: err.message}
    }
   
}

export const getMyOrders=async()=>{
    try{
        const {token}=getUserInfo()
   const response=await axios({
    url: `${apiUrl}/api/orders/mine`,
    headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
    }
   })  
   if(response.statusText !=='OK'){
    throw new Error(response.data.message)
   }
   return response.data 
    }catch(err){
     return { error: err.response ? err.response.data.message : err.message };   
    }

}




export const getPaypalClientId = async () => {
  const response = await axios({
    url: `${apiUrl}/api/paypal/clientId`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  return response.data.clientId;
};


export const payOrder = async (orderId, paymentResult) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/pay`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: paymentResult,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const deliverOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}/deliver`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // if (response.statusText !== 'OK') {
    //   throw new Error(response.data.message);
    // }
    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};




export const getSummary = async()=>{
    try{
        const {token}=getUserInfo()
        const response = await axios({
        url:`${apiUrl}/api/orders/summary`,
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'

        }
        })
        if(response.statusText !=='OK'){
            throw new Error(response.data.message)
        }else{
            return response.data;
        }
    }catch(err){
       return { error: err.response ? err.response.data.message : err.message } 
    }
}