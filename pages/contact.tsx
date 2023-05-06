//prettier-ignore
import {
  Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, FormControl, Input, InputGroup, InputLeftElement, SimpleGrid, Stack, StylesProvider, Textarea,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PageTitle from "../components/PageTitle";
import styles from "../styles/Home.module.css";
import DecorativeTag from "../components/DecorativeTag";
import { FadeInContainer, FadeInItem } from "../components/FadeInTransition";
import { sendContactForm } from "../utils/api";
import { contactFormData } from "../utils/types";

const Contact: NextPage = (props) => {
  // May have to add message status (i.e. idle, pending, success, failure etc.)
  const initMessage: contactFormData = {
    name: "test name",
    company: "test company",
    email: "test@email.com",
    subject: "test subject",
    message: "testing testing message",
  };
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(initMessage);
  const [messageDisplay, setMessageDisplay] = useState(<></>);
  const [submitted, setSubmitted] = useState(false);
  const errorMessage = (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Missing fields!</AlertTitle>
      <AlertDescription>
        Please fill in all required fields marked with '*'
      </AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
  const successMessage = (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle mr={2}>Message sent successfully!</AlertTitle>
      <AlertDescription></AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Eventually handle form Validation here
    // let isValidForm = handleValidation();

    const res = await sendContactForm(message)

    const result = await res.json();
    if (result.error) {
      console.log(result.error);
      return; 
    }
    console.log("📦", result);
  };

  useEffect(() => {
    // console.log("😅 useEffect running!");
    // console.log(isError);
    // if (isError) console.log("something is wrong!");
    // else console.log("everything is in order");
    // console.log(message);

    if (submitted) setMessageDisplay(isError ? errorMessage : successMessage);
    else setMessageDisplay(<></>);
  }, [isError, message, submitted]);

  return (
    <Box id="contact" className={styles.main}>
      <DecorativeTag content="section" hExpand="2.5rem" vExpand="7rem">
        <Box>
          <DecorativeTag content="h2">
            <PageTitle
              ref={ref}
              pageTitle={["Contact me"]}
              isInView={isInView}
            />
          </DecorativeTag>

          <DecorativeTag content="form">
            <FadeInContainer>
              <FormControl>
                <Stack spacing={2}>
                  <SimpleGrid columns={2} spacing={2}>
                    <FadeInItem>
                      <InputGroup>
                        <InputLeftElement color="red.300" children="*" />
                        <Input
                          type="text"
                          placeholder="Name"
                          variant="filled"
                          value={message.name}
                          onChange={(e) => {
                            const newMessage = { ...message };
                            newMessage.name = e.target.value;
                            setMessage(newMessage);
                          }}
                        />
                      </InputGroup>
                    </FadeInItem>
                    <FadeInItem>
                      <Input
                        type="text"
                        placeholder="Company"
                        variant="filled"
                        onChange={(e) => {
                          const newMessage = { ...message };
                          newMessage.company = e.target.value;
                          setMessage(newMessage);
                        }}
                      />
                    </FadeInItem>
                  </SimpleGrid>

                  <FadeInItem>
                    <InputGroup>
                      <InputLeftElement color="red.300" children="*" />
                      <Input
                        type="email"
                        placeholder="Email"
                        variant="filled"
                        onChange={(e) => {
                          const newMessage = { ...message };
                          newMessage.email = e.target.value;
                          setMessage(newMessage);
                        }}
                      />
                    </InputGroup>
                  </FadeInItem>

                  <FadeInItem>
                    <InputGroup>
                      <InputLeftElement color="red.300" children="*" />
                      <Input
                        type="text"
                        placeholder="Subject"
                        variant="filled"
                        onChange={(e) => {
                          const newMessage = { ...message };
                          newMessage.subject = e.target.value;
                          setMessage(newMessage);
                        }}
                      />
                    </InputGroup>
                  </FadeInItem>

                  <FadeInItem>
                    <InputGroup>
                      <InputLeftElement color="red.300" children="*" />
                      <Textarea
                        // type="textarea"
                        h="8rem"
                        placeholder={" " + " " + "Message"}
                        pl="2rem"
                        variant="filled"
                        onChange={(e) => {
                          const newMessage = { ...message };
                          newMessage.message = e.target.value;
                          setMessage(newMessage);
                        }}
                      />
                    </InputGroup>
                  </FadeInItem>

                  <FadeInItem>
                    <Button maxWidth="25vw" onClick={handleSubmit}>
                      ✉️ Send
                    </Button>
                  </FadeInItem>
                  <FadeInItem>{messageDisplay}</FadeInItem>
                </Stack>
              </FormControl>
            </FadeInContainer>
          </DecorativeTag>
        </Box>
      </DecorativeTag>
    </Box>
  );
};

export default Contact;
