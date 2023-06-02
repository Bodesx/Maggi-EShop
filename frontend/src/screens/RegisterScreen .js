import { register } from "../api"
import { getUserInfo, setUserInfo } from "../localStorage"
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils"

const registerScreen={
    after_render: ()=>{
      document.getElementById('register-form').addEventListener('submit', async (e)=>{
        e.preventDefault()

showLoading()

        const data = await register({
          name:document.getElementById('name').value,
          email:document.getElementById('email').value,
          password:document.getElementById('password').value,
        })

     hideLoading()
        
        if(data.error){
          showMessage(data.error)
        }else{
          setUserInfo(data)
          redirectUser()
        }
      })
    },
    
    render:()=>{
  if(getUserInfo().name){
    redirectUser()
  }     

return`
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  register
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="column" id="main">
          <h1>Create account </h1>
          <h3>Discover the the wonderful product just for you</h3>
          <form id="register-form">
            <div class="form-group">
              <label for="name">Name </label>
              <input type="name" class="form-control" id="name"  placeholder="name">
            </div>

            <div class="form-group">
              <label for="email">E-mail </label>
              <input type="email" class="form-control" id="email"  placeholder="E-mail">
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm Password</label>
              <input type="confirm-password" class="form-control" id="confirm-password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">register</button>
          </form>
        </div>
        <div>
          <?xml version="1.0" encoding="UTF-8"?>
          <svg width="67px" height="578px" viewBox="0 0 67 578" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
              <title>Path</title>
              <desc>Created with Sketch.</desc>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <path d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z" id="Path" fill="#F9BC35"></path>
              </g>
          </svg>
        </div>
        <div class="column" id="secondary">
          <div class="sec-content">
            <h2>Welcome!</h2>
            <h3>already have an account </h3>
            <a href='/#/signin'><button type="button" class="btn btn-primary">signIN</button></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

`





    }
}

export default registerScreen