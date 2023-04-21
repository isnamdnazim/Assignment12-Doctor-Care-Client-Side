import React from "react";
import treatment from "../../../images/treatment.png";
const CareSection = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-6 text-center">
          <img className="img-fluid w-75" src={treatment} alt="" />
        </div>
        <div className="col-md-6">
          <h1>
            Exceptional dental care <br /> on your term
          </h1>
          <p className="fs-4">
            MediCare accepts most commercial health plans, including Covered
            Dhaka, Medi-Cal, and Medicare. Patients must be assigned to MediCare
            providers through Health Care LA, Community Family Care, Preferred
            IPA, Regal Medical Group, and Lakeside Community Healthcare.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareSection;
