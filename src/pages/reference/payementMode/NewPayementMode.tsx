import FormPayementMode from "features/reference/FormPayementMode";
import Reference from "features/reference/Reference";
import React, { useRef } from "react";
import { payementMode0 } from "tools/types";

export default function NewPayementMode() {
    const form = useRef(null);
    return (
      <div>
        <FormPayementMode payementMode={payementMode0} ref={form} />
      </div>
  );
}
