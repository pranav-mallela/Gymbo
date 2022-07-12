import React from "react";
import { Button, Alert } from "react-bootstrap";

export default function About({ aboutText })
{
    const [show, setShow] = React.useState(true);
    if (show) {
      return (
        <Alert variant="primary" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>What does this page do?</Alert.Heading>
          <p>
            {aboutText}
          </p>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show About</Button>;
}