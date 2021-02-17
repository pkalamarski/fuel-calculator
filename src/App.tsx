import { Form } from "antd";
import React, { useEffect, useState } from "react";

import NumberInput from "./components/NumberInput";

const App = () => {
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [price, setPrice] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const value = localStorage.getItem("fuelData");

    if (!value) return;

    const { distance, consumption, price } = JSON.parse(value);

    setDistance(distance);
    setConsumption(consumption);
    setPrice(price);
  }, []);

  const storeData = () => {
    localStorage.setItem(
      "fuelData",
      JSON.stringify({ distance, consumption, price })
    );
  };

  useEffect(() => {
    const rawTotal =
      (Number(distance || "0") / 100) *
      Number(consumption || "0") *
      Number(price || "0");

    const parsedTotal = Number(rawTotal.toFixed(2));

    storeData();
    setTotalPrice(parsedTotal);
  }, [distance, consumption, price]);

  return (
    <section>
      <h1 style={{ textAlign: "center", marginTop: 30 }}>Fuel calculator</h1>
      <Form style={{ marginTop: 30 }}>
        <NumberInput
          label="Distance"
          unit="km"
          value={distance}
          setValue={setDistance}
        />

        <NumberInput
          label="Consumption"
          unit="l/100km"
          value={consumption}
          setValue={setConsumption}
        />

        <NumberInput
          label="Price"
          unit="zł"
          value={price}
          setValue={setPrice}
        />
      </Form>

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 40px",
          fontSize: "1rem",
        }}
      >
        <span>Total price:</span>
        <span style={{ fontWeight: "bold" }}>{totalPrice} zł</span>
      </section>
    </section>
  );
};

export default App;
