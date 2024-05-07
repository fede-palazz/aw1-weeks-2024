import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import dayjs from "dayjs";

function AnswerForm(props) {
  const [text, setText] = useState(props.answer?.text ?? "");
  const [email, setEmail] = useState(props.answer?.email ?? "");
  const [date, setDate] = useState(
    props.answer?.date.format("YYYY-MM-DD") ?? dayjs().format("YYYY-MM-DD")
  );

  const handleSubmit = () => {
    event.preventDefault(); // prevent form submission
    // create new answer
    const answer = { text, email, date };

    // implement validation

    if (props.mode === "edit") {
      props.updateAnswer({ id: props.answer.id, ...answer });
    } else {
      // add answer to the state
      props.addAnswer(answer);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control
          type="text"
          required={true}
          minLength={2}
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>email</Form.Label>
        <Form.Control
          type="email"
          required={true}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button variant="success" type="Submit">
        {props.mode === "add" ? "Add" : "Update"}
      </Button>
      <Button variant="danger" className="mx-2" onClick={props.cancel}>
        Cancel
      </Button>
    </Form>
  );
}

export default AnswerForm;
