import React from "react";
import Modal from "../../components/modal/modal";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import  Calculator  from "../../components/calculator";
import {
  ModalButton,
  ModalCardContainer,
} from "../../styles/modal/main";

const CalculatorModal = (props) => {

  return (
    <Modal>
      <ModalPartBody>
                <Calculator />
      </ModalPartBody>
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
    </Modal>
  );
};

export default CalculatorModal;
