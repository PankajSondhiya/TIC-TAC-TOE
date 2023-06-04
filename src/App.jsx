import { useEffect, useState } from "react";
import "./App.css";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Icon from "./icons";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isXturn, setturn] = useState(true);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [Winmessage, setWinMessage] = useState("");

  function fillcell(index) {
    if (Winmessage) {
      toast.success(
        "Game is already over  to start a new game click on reload button ."
      );
      return;
    }

    const cellcopy = [...cells];
    if (cellcopy[index] !== null) {
      toast.error("click on the empty cells");
      return;
    }
    cellcopy[index] = isXturn ? "x" : "o";
    setCells(cellcopy);
    setturn(!isXturn);
  }
  useEffect(checkIsWinner, [cells]);
  function checkIsWinner() {
    //  checking  winner of the game
    if (cells[0] === cells[1] && cells[0] === cells[2] && cells[0] !== null) {
      setWinMessage(`${cells[0]} won`);
    } else if (
      cells[3] !== null &&
      cells[3] === cells[4] &&
      cells[4] === cells[5]
    ) {
      setWinMessage(`${cells[3]} won`);
    } else if (
      cells[6] !== null &&
      cells[6] === cells[7] &&
      cells[7] === cells[8]
    ) {
      setWinMessage(`${cells[6]} won`);
    } else if (
      cells[0] !== null &&
      cells[0] === cells[3] &&
      cells[3] === cells[6]
    ) {
      setWinMessage(`${cells[0]} won`);
    } else if (
      cells[1] !== null &&
      cells[1] === cells[4] &&
      cells[4] === cells[7]
    ) {
      setWinMessage(`${cells[1]} won`);
    } else if (
      cells[2] !== null &&
      cells[2] === cells[5] &&
      cells[5] === cells[8]
    ) {
      setWinMessage(`${cells[2]} won`);
    } else if (
      cells[0] !== null &&
      cells[0] === cells[4] &&
      cells[4] === cells[8]
    ) {
      setWinMessage(`${cells[0]} won`);
    } else if (
      cells[2] !== null &&
      cells[2] === cells[4] &&
      cells[4] === cells[6]
    ) {
      setWinMessage(`${cells[2]} won`);
    } else if (checkgamedrawn()) {
      setWinMessage(`Game is drawn`);
    }
  }
  function checkgamedrawn() {
    return cells.every((cel) => cel !== null);
  }
  function Reload() {
    setturn(true);
    setCells(Array(9).fill(null));
    setWinMessage("");
  }

  const cellJSK = cells.map((cell, index) => (
    <Card color="warning">
      <CardBody className="box" onClick={() => fillcell(index)}>
        <Icon content={cells[index]} />
      </CardBody>
    </Card>
  ));
  return (
    <Container className="p-5 container">
      <ToastContainer position="bottom-center" autoClose={5000} />
      <Row>
        <Col>
          {Winmessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-center text-uppercase text-success">
                {Winmessage}
              </h1>
              <Button color="success mb-5 mt-3" block onClick={Reload}>
                Reload
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning text">
              {isXturn ? "Cross" : "Circle"} Turn
            </h1>
          )}
        </Col>
        <div className="grid">{cellJSK}</div>
      </Row>
    </Container>
  );
}

export default App;
