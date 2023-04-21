import React, { useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
const CheckoutForm = ({ appointment }) => {
  const { price, serviceName, patientName, _id, date } = appointment;
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [allAppointment, setAllAppointment] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5003/allappointment")
      .then((res) => res.json())
      .then((data) => setAllAppointment(data));
  }, [allAppointment]);

  useEffect(() => {
    fetch("http://localhost:5003/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price, serviceName, patientName, _id, date }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log(error);
      setError(error.message);
      setSuccess("");
    } else {
      setError("");
      console.log(paymentMethod);
    }
    //   //payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: user.email,
          },
        },
      });
    if (intentError) {
      setError(intentError.message);
      setSuccess("");
    } else {
      setError("");
      console.log(paymentIntent);
      setSuccess("Your payment processed successfully");
      setProcessing(false);
      //save to database
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        transaction: paymentIntent.client_secret.slice("_secret")[0],
      };
      console.log(payment);
      const url = `http://localhost:5003/appointments/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  const handlePending = (id) => {
    fetch(`http://localhost:5003/updateStatus/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allAppointment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          console.log("approved");
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        {processing ? (
          <CircularProgress />
        ) : (
          <button
            onClick={() => handlePending(_id)}
            style={{ marginTop: "20px" }}
            type="submit"
            disabled={!stripe || success}
          >
            Pay
          </button>
        )}
      </form>
      {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", padding: "10px" }}>{success}</p>}
    </div>
  );
};

export default CheckoutForm;
