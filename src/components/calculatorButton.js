import React from "react";
import { FaCalculator } from "react-icons/fa";
import { CalculatorBox, CalculatorForm, FeatureIcon } from "../styles/home/main";
import CalculatorModal from "../pages/home/calculatorModal";
import ModalService from "../components/modal/services/modalService";

const CalculatorButton = () => {
  const calculatorButton = (e) => {
    e.preventDefault();
    ModalService.open(CalculatorModal);
  };

  return (
    <CalculatorForm onClick={calculatorButton}>
      <CalculatorBox as="label" type="image" corner>
        <FeatureIcon as={FaCalculator} />
      </CalculatorBox>
    </CalculatorForm>
  );
};

export default CalculatorButton;
