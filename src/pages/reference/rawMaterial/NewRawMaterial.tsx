import React, { useRef } from "react";
import { rawMaterial0 } from "tools/types";
import FormRawMaterial from "features/reference/FormRawMaterial";

export default function NewIncoterm() {
  const form = useRef(null);
  return (
    <div>
      <FormRawMaterial rawMaterial={rawMaterial0} ref={form} />
    </div>
  );
}
