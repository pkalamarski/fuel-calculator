import React from "react";
import { Form, Input } from "antd";

interface IProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  unit: string;
}

const NumberInput: React.FC<IProps> = ({ label, setValue, unit, value }) => {
  const handleChange = (value: string) => {
    if (!value) {
      setValue("");
    }

    const numericRegex = /^([0-9]{1,100})(\.{0,1}[0-9]{0,100})$/;

    if (!numericRegex.test(value)) return;

    setValue(value);
  };

  return (
    <Form.Item style={{ width: "100%", padding: "0 40px" }}>
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ padding: "5px 0" }}>{label}:</span>
        <Input
          value={value}
          type="number"
          size="small"
          onChange={(e) => handleChange(e.target.value)}
          suffix={unit}
          style={{ width: "50%" }}
        />
      </section>
    </Form.Item>
  );
};

export default NumberInput;
