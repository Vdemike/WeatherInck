import React from "react";
import { FaCalculator } from "react-icons/fa";
import { CalculatorBox, CalculatorForm, FeatureIcon } from "../styles/home/main";

const CalculatorButton = (props) => {

  const calculatorButton = (e) => {
    e.preventDefault();
    console.log("Calculator button clicked!");
  };

  return (
    <CalculatorForm onSubmit={calculatorButton}>
      <CalculatorBox as="label" type="image" corner>
        <FeatureIcon as={FaCalculator} />
      </CalculatorBox>
    </CalculatorForm>
  );
};

export default CalculatorButton;
