import { getCartItems } from "./localStorage"

export const parseRequestUrl=()=>{
    
   const address = document.location.hash.slice(1).split('?')[0];
  const queryString =
    document.location.hash.slice(1).split('?').length === 2
      ? document.location.hash.slice(1).split('?')[1]
      : '';

  const url = address.toLowerCase() || '/';
  const request = url.split('/');
  const query = queryString.split('=');
    return{
        resource: request [1],
        id:request[2],
        verb:request[3],
        name: query[0],
        value: query[1],
    }
}
export const rerender=async(component)=>{
    
     document.getElementById('main-container').innerHTML =await component.render();
    await component.after_render()
}

export const showLoading = ()=>{
   document.getElementById('loading-overlay').classList.add('active')
}

export const hideLoading = ()=>{
   document.getElementById('loading-overlay').classList.remove('active')
}

/*show message*/

export const showMessage=(message, callback)=>{
    document.getElementById('message-overlay').innerHTML=
    `<div>
    <div id='message-overlay-content'>${message}</div>
    <button id='message-overlay-close-button'>OK</button>
    </div>`;

    document.getElementById('message-overlay').classList.add('active')
    document.getElementById('message-overlay-close-button').addEventListener('click',()=>{
        document.getElementById('message-overlay').classList.remove('active')
        if(callback){
            callback()
        }
    })
}

export const redirectUser = () =>{
    if(getCartItems().length !==0){
        document.location.hash='/shipping'
    }else{
       document.location.hash='/' 
    }
}