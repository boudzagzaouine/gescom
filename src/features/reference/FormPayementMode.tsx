import {
  OpenPayementModeProp,
  openPayementModes,
} from "config/rtk/rtkPayementMode";
import React from "react";
import { payementMode0 } from "tools/types";
import List from "widgets/List";

const FormPayementMode = () => {
  const payementModesToOpen: OpenPayementModeProp = openPayementModes();
  return (
    <List
      body={["Désignation#design#attr", "Code#code#attr"]}
      list={payementModesToOpen.data.content}
      emptyObject={payementMode0}
      save={payementModesToOpen.save}
      edit={payementModesToOpen.edit}
      refetch={payementModesToOpen.refetch}
    />
  );
};

export default FormPayementMode;
