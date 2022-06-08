import React, { useRef } from "react";
import { unitMeasure0 } from "tools/types";
import FormUnitMeasure from "features/reference/FormUnitMeasure";
export default function NewUnitMeasure() {
  const form = useRef(null);
  return (
    <div>
      <FormUnitMeasure unitMeasure={unitMeasure0} ref={form} />
    </div>
  );
}
