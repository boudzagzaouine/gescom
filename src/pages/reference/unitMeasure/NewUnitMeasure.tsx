import React, { useRef } from "react";
import { unitMeasure0 } from "tools/types";
import FormUnitMeasure from "features/reference/FormUnitMeasure";
import ListUnitMeasureManager from "features/reference/ListUnitMeasure";
export default function NewUnitMeasure() {
  const form = useRef(null);
  return (
    <div>
      <ListUnitMeasureManager />
    </div>
  );
}
