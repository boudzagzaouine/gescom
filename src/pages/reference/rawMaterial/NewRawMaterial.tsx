import React, { useRef } from "react";
import ListRawMaterialManager from "features/reference/ListFamilleMatierePremiere";

export default function NewIncoterm() {
  const form = useRef(null);
  return (
    <div>
      <ListRawMaterialManager/>
    </div>
  );
}
