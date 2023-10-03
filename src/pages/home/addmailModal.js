import React, { useRef } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { DefaultRadio, ModalButton, ModalContainer, ModalLabel, ModalRow, ModalCardContainer} from "../../styles/modal/main";
import { SelectContainer } from "../../styles/home/settings";
import { BiLogoGmail } from "react-icons/bi";
import { FaYahoo } from "react-icons/fa";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";


const MailModal = (props) => {
	const form = useRef("");
	const chosenMailbox = localStorage.getItem("mailbox");


    const saveMailbox = (e) => {
		const mailboxes = form.current.mailbox;
		
		let checkedMailbox;
		mailboxes.forEach((item) => (item.checked ? (checkedMailbox = item) : null));
		
		localStorage.setItem("mailbox", checkedMailbox.dataset.mailbox);



		props.close();
        props.refreshMailboxes();
	
	};

	return (
		<Modal close={props.close}>
			<ModalPartHeader>Select Your MailBox</ModalPartHeader>
			<ModalPartBody>
				<ModalContainer as="form" ref={form}>
					<ModalCardContainer>
					<ModalRow>
						<SelectContainer>
							<ModalLabel type="gmail" cp>
								<DefaultRadio defaultChecked={chosenMailbox === "gmail"} name="mailbox" data-mailbox="gmail" />
								<BiLogoGmail />
							</ModalLabel>
                            <ModalLabel type="yahoo" cp>
								<DefaultRadio defaultChecked={chosenMailbox === "yahoo"} name="mailbox" data-mailbox="yahoo" />
								<FaYahoo />
							</ModalLabel>
                            <ModalLabel type="hotmail" cp>
								<DefaultRadio defaultChecked={chosenMailbox === "hotmail"} name="mailbox" data-mailbox="hotmail" />
								<PiMicrosoftOutlookLogoFill />
							</ModalLabel>
						</SelectContainer>
					</ModalRow>
					</ModalCardContainer>
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter>
  <ModalCardContainer footer>
    <ModalButton onClick={props.close} hov>
      Cancel
    </ModalButton>
    <ModalButton
      onClick={() => {
        saveMailbox();
        window.location.reload(false);
      }}
      final
    >
      Save
    </ModalButton>
  </ModalCardContainer>
</ModalPartFooter>
		</Modal>
	);
};
export default MailModal;
