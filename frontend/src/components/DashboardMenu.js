const DashboardMenu = {
    render:(props)=>{
        return `
        <div class="dashboard-menu">
        <ul>
        <li class="${props.selected==='dashboard' ? 'selected' : ''}"> <a href = "/#/dashboard">Dashboard</a></li>
        <li class="${props.selected==='order' ? 'selected' : ''}"> <a href = "/#/orderlist">Orders</a></li>
        <li class="${props.selected==='product' ? 'selected' : ''}"> <a href = "/#/productlist">Product</a></li>
        </ul>
        </div>
        
        `
    }
}

export default DashboardMenu