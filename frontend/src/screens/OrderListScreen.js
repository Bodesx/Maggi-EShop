import DashboardMenu from "../components/DashboardMenu"
import {  deleteOrder, getOrders, } from "../api"
import { hideLoading, rerender, showLoading, showMessage } from "../utils";

const OrderListScreen={
    after_render: ()=>{ 
const deleteButtons = document.getElementsByClassName('delete-button')
Array.from(deleteButtons).forEach((deleteButton)=>{
  deleteButton.addEventListener('click', async()=>{
    if(confirm('Are u sure u want to delete to avoid mattaz of the heart?')){
      showLoading()
      const data=await deleteOrder(deleteButton.id)
      if(data.error){
        showMessage(data.error)
      }else{
     rerender(OrderListScreen)
      }
      hideLoading()
     
    }
  })
})



    },
    render: async()=>{
        const orders = await getOrders()
        return `
        <div class = "dashboard">
${DashboardMenu.render({selected:'orders'})}
<div class = "dashboard-content">
<h1>Dashboard</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th> 
              <th>TOTAL</th>
              <th>USER</th>
              <th>DELIVERED AT</th>
               <th>PAID AT</th>
              <th class="tr-action">ACTION</th>
            <tr>
          </thead>
          <tbody>
            ${orders.map((order) => `
            <tr>
              <td>${order._id}</td>
              <td>${order.createdAt}</td>
              <td>${order.totalPrice}</td>
              <td>${order.user.name}</td>
              <td>${order.paidAt||'NO'}</td>
              <td>${order.DeliveredAt||'NO'}</td>

              <td>
              <button id="${order._id}" class="edit-button">Edit</button>
              <button id="${order._id}" class="delete-button">Delete</button>
              </td>
            </tr>
            `
              )
              .join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
        
        
        `
    }
}

export default OrderListScreen