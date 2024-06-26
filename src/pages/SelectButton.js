import React, { useState } from "react";
import "./index.css";

export default function SelectButton({ data, name, Handle }) {
  const times = data;

  return (
    <div>
      <select className="select" name={name} onChange={Handle} required>
        {times.map((time, index) => (
          <option className="option" key={index} type="radio" value={time}>
            <span>{time}</span>
          </option>
        ))}
      </select>
    </div>
  );
}
