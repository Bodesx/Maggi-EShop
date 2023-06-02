
import CheckoutStp from '../components/CheckoutStp';
import { getUserInfo, getShipping, setShipping } from '../localStorage';


const ShippingScreen = {
  after_render: () => {
    document.getElementById('shipping-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        setShipping({
         address:document.getElementById('address').value,
         city:document.getElementById('city').value,
         postalCode:document.getElementById('postalCode').value,
         country:document.getElementById('country').value,
        })
        document.location.hash='/payment'
      });
  },

  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    const { address, city, postalCode, country } = getShipping();

    return `
    ${CheckoutStp.render({stp1:true, stp2:true})}
    <div class="form-container">
      <form id="shipping-form">
        <ul class="form-items">
          <li>
            <h1>Shipping</h1>
          </li>
          <li>
            <label for="address">Address</label>
            <input type="name" name="address" id="address" value="${address}" />
          </li>
           <li>
            <label for="city">City</label>
            <input type="city" name="city" id="city" value="${city}" />
          </li>
           <li>
            <label for="postalCode">PostalCode</label>
            <input type="postalCode" name="postalCode" id="postalCode" value="${postalCode}" />
          </li>
           <li>
            <label for="country">Country</label>
            <input type="country" name="country" id="country" value="${country}" />
          </li>
          
            <button type="submit" class="primary">Continue</button>
          </li>
         
        </ul>
      </form>
    </div>
    `;
  },
};
export default ShippingScreen;