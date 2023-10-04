import React, { useEffect, useState } from "react";
import { FaYahoo } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { MailBox, MailForm, FeatureIcon } from "../styles/home/main";

const MailboxButton = (props) => {
  const [mailbox, setMailbox] = useState("");

  useEffect(() => {
    if (!mailbox)
      if (localStorage.getItem("mailbox"))
        setMailbox(localStorage.getItem("mailbox"));
      else {
        const baseMailbox = "gmail";
        localStorage.setItem("mailbox", baseMailbox);
        setMailbox(baseMailbox);
      }
  }, [mailbox]);

  const mailboxButton = (e) => {
    e.preventDefault();
    let mailboxUrl;
    if (mailbox === "yahoo") mailboxUrl = "https://mail.yahoo.com";
    else if (mailbox === "hotmail") mailboxUrl = "https://outlook.live.com";
    else mailboxUrl = "https://mail.google.com/";

    const searchInNew = localStorage.getItem("searchInNewWindow");

    const mailUrl = `${mailboxUrl}`;
    window.open(mailUrl, !!searchInNew ? "_blank" : "_self");
  };

  return (
    <MailForm onSubmit={mailboxButton}>
      <MailBox as="label" type="image" corner mailbox={mailbox}>
        {mailbox === "yahoo" && (
          <FeatureIcon as={FaYahoo} />
        )}
        {mailbox === "gmail" && (
          <FeatureIcon as={BiLogoGmail} />
        )}
        {mailbox === "hotmail" && (
          <FeatureIcon as={PiMicrosoftOutlookLogoFill} />
        )}
        <input type="submit" />
      </MailBox>
    </MailForm>
  );
};

export default MailboxButton;
