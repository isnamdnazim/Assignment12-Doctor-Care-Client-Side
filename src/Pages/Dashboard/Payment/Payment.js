import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import jsPDF from "jspdf";
import "jspdf-autotable";
const stripePromise = loadStripe(
  "pk_test_51KoOHoDsZQSPcvi2bKTRUb8SPQ98WLnxbDWNrdKYu7HBVqr0sgIOy4bVVEV5JUjHOaDjgmk113ktp2RrXR4TSjZ400CakfrhVH"
);

const Payment = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5003/appointments/${appointmentId}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data));
  }, []);
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Payment Details";
    const headers = [
      [
        "Transaction ID",
        "Patient Name",
        "Service Name",
        "Price",
        "Email",
        "Booking date",
      ],
    ];
    // my object array
    let data_array = [];

    // my object
    let my_object = {};

    // load data into object

    my_object.service_id = appointment._id;
    my_object.name = appointment.patientName;
    my_object.service = appointment.serviceName;
    my_object.phone = appointment.phone;
    my_object.price = appointment.price;
    my_object.email = appointment.email;
    my_object.date = appointment.date;
    // push the object to Array
    data_array.push(my_object);
    console.log("This is array", data_array);
    const data =
      data_array &&
      data_array.map((elt) => [
        elt.service_id,
        elt.name,
        elt.service,
        elt.price,
        elt.email,
        elt.date,
        elt.time,
      ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("before_invoice.pdf");
  };
  return (
    <div>
      <h4 className="pt-4 pb-4">Please pay for: {appointment.serviceName}</h4>
      <h4>Pay:{appointment.price} BDT</h4>
      {appointment.price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm appointment={appointment} />
        </Elements>
      )}
      <br />
      <br />
      <button
        className="ml-2 btn btn-secondary"
        variant="contained"
        onClick={() => exportPDF()}
      >
        Generate As PDF
      </button>
    </div>
  );
};

export default Payment;
