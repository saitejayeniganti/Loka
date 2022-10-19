import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../App.css";

function PayPalTest() {
  return (
    <div className="App-body">
      <PayPalScriptProvider
        options={{ "client-id": "AecQz8risxMZZKZY86j2gW7nhV6UiYMHAulZhEpta6PrdnjC7rwIkHOvBFv_1Fyut2AlT5oXNL57L0-O" }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00",
                  },
                },
              ],  
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            alert("Transaction completed by " + name);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}  

export default PayPalTest;