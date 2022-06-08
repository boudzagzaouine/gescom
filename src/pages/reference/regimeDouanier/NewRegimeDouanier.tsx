import React, { useRef } from "react";
import { regimeDouanier0 } from "tools/types";
import FormRegimeDouaniers from "features/reference/FormRegimeDouaniers";

export default function NewRegimeDouanier() {
  const form = useRef(null);
  return (
    <div>
      <FormRegimeDouaniers regimeDouanier={regimeDouanier0} ref={form} />
    </div>
  );
}
