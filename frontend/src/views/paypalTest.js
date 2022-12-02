import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../App.css";

function PayPalTest(props) {
  // console.log("props",props)
  return (
    <div className="">
      <PayPalScriptProvider
        options={{ "client-id": "AecQz8risxMZZKZY86j2gW7nhV6UiYMHAulZhEpta6PrdnjC7rwIkHOvBFv_1Fyut2AlT5oXNL57L0-O" }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: props.price,
                  },
                },
              ],  
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            props.paid(props.id)
            // alert("Transaction completed. Paid by " + props.name);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}  

export default PayPalTest;