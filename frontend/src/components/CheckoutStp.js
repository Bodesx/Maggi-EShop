const CheckoutStp ={
    render: (props)=>{
return `
<div class="checkout-stp"> 
<div class="${props.stp1 ? 'active' :''}">Signin</div>
<div class="${props.stp2 ? 'active' :''}">Shipping</div>
<div class="${props.stp3 ? 'active' :''}">Payment</div>
<div class="${props.stp4 ? 'active' :''}">Place Order</div>
</div>
`
    },
}

export default CheckoutStp