
import CheckoutStp from '../components/CheckoutStp';
import { getUserInfo, setPayment } from '../localStorage';


const PaymentScreen = {
  after_render: () => {
    document.getElementById('payment-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value


        setPayment({paymentMethod})
        document.location.hash='/placeorder'
      });
  },

  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
   

    return `
    ${CheckoutStp.render({stp1:true, stp2:true, stp3:true})}
    <div class="form-container">
      <form id="payment-form">
        <ul class="form-items">
          <li>
            <h1>Payment</h1>
          </li>
          <li>
          <div>
          <input type="radio" name="payment-method" id="paypal" value="paypal" checked />
          <label for="paypal">paypal</label>
          </div>
          </li>

 <li>
          <div>
          <input type="radio" name="payment-method" id="visa" value="visa" checked />
          <label for="visa">visa</label>
          </div>
          </li>

           <li>
          <div>
          <input type="radio" name="payment-method" id="mastercard" value="mastercard" checked />
          <label for="mastercard">mastercard</label>
          </div>
          </li>







           <li>
            <button type="submit" class="primary">Continue</button>
          </li>
         
        </ul>
      </form>
    </div>
    `;
  },
};
export default PaymentScreen;