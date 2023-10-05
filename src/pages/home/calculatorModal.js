import React from "react";
import CalculatorModalForm from "../../components/modal/modal";
import ModalPartFooter from "../../components/modal/modalFooter";
import  Calculator  from "../../components/calculator";
import {
  ModalButton,
  ModalCardContainer,
} from "../../styles/modal/main";

const CalculatorModal = (props) => {

  return (
    <CalculatorModalForm>
        <Calculator />
      <ModalPartFooter>
        <ModalCardContainer footer>
          <ModalButton
            onClick={() => {
              props.close();
			  props.closeModal();
            }}
            hov
          >
            Cancel
          </ModalButton>
        </ModalCardContainer>
      </ModalPartFooter>
    </CalculatorModalForm>
  );
};

export default CalculatorModal;
