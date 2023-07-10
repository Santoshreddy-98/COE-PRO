import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import axios from "axios";
import { toast } from "react-toastify";

const MyForm = () => {
  const [design, setDesign] = useState("");
  const [numCpu, setNumCpu] = useState("");
  const [powerOpt, setPowerOpt] = useState("");
  const [genEff, setGenEff] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/save-design-variable",
        {
          design: design,
          num_cpu: numCpu,
          power_opt: powerOpt,
          gen_eff: genEff,
        }
      );
      toast.success("variables added successfully!");
      console.log(response.data.message);
    } catch (err) {
      toast.error("error adding variables");
      console.error(err.message);
    }
  };

  const handleNumCpuChange = (e) => {
    const value = e.target.value;
    // Check if the value is a valid number
    if (/^\d*$/.test(value)) {
      // Parse the value as a number
      const numValue = parseInt(value, 10);
      // Check if the value is between 8 and 64
      if (value === "" || (numValue >= 8 && numValue <= 64)) {
        setNumCpu(value);
      }
    }
  };

  return (
    <Card className="col-7 mt-3" style={{ margin: "auto" }}>
      <CardHeader>
        <Card.Title>Design Variables</Card.Title>
      </CardHeader>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="design">
            <Form.Label>Design:</Form.Label>
            <Form.Control
              type="text"
              value={design}
              onChange={(e) => setDesign(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="numCpu">
            <Form.Label>Number of CPUs:</Form.Label>
            <Form.Control
              type="number"
              value={numCpu}
              onChange={handleNumCpuChange}
              placeholder="Please select a number between 8 and 64"
              min={8}
              max={64}
              required
            />
          </Form.Group>
          <Form.Group controlId="powerOpt">
            <Form.Label>Power Optimization:</Form.Label>
            <Form.Control
              as="select"
              value={powerOpt}
              onChange={(e) => setPowerOpt(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="genEff">
            <Form.Label>Generation Efficiency:</Form.Label>
            <Form.Control
              as="select"
              value={genEff}
              onChange={(e) => setGenEff(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="low">Low</option>
              <option value="med">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
          <Button
            className="mt-3"
            style={{ backgroundColor: "#241C5A", border: "none" }}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MyForm;
