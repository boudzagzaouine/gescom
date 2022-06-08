import React, { useRef } from "react";
import { incoterm0 } from "tools/types";

import FormIncoterm from "features/reference/FormIncoterm";

export default function NewIncoterm() {
  const form = useRef(null);
  return (
    <div>
      <FormIncoterm incoterm={incoterm0} ref={form} />
    </div>
  );
}
