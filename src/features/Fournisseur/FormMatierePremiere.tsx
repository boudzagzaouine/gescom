import {
  useAddMatierePremiereMutation,
  useFetchMatierePremiereQuery,
} from "config/rtk";
import {
  OpenFournisseurProp,
  openFournisseurs,
} from "config/rtk/rtkFournisseur";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { LIST_FAMILLE_MATIERE_PREMIERE, ORIGINE } from "tools/consts";
import { f0, Fournisseur, MatierePremiere } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bcyan from "widgets/Bcyan";
import Bsave from "widgets/Bsave";
import Modal from "widgets/Modal";

type MatierePremiereProps = {
  Matierep: MatierePremiere;
  disabled: boolean;
  refetch: () => void;
  fournisseurs: Fournisseur[];
  fournisseur: Fournisseur;
};

const FormMatierePremiere = (
  {
    Matierep,
    disabled,
    refetch,
    fournisseurs,
    fournisseur,
  }: MatierePremiereProps,
  ref: Ref<void>
) => {
  const [showModal, setShowModal] = React.useState(false);
  const [matiere0, setMatiere0] = useState(Matierep);
  const [disabled0, setDisabled0] = useState(disabled);
  const [fournisseur0, setFournisseur0] = useState(fournisseur);
  const [save] = useAddMatierePremiereMutation();
  const openModal = (
    m: MatierePremiere,
    d: boolean,
    fournisseur: Fournisseur
  ) => {
    setMatiere0(m);
    setShowModal(true);
    setDisabled0(d);
    setFournisseur0(fournisseur);
  };
  const close = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  return (
    <Modal
      title={"Nouvelle Matiére premiére"}
      show={showModal}
      format={5}
      close={close}
    >
      <Form defaultValues={matiere0} onSubmit={save}>
        <div className="mt-1">
          {matiere0.id != "" ? (
            <>
              <Field label="Fournisseur" value={fournisseur0?.design} />
            </>
          ) : (
            <Field
              label="Fournisseur"
              name="idFournisseur"
              as="select"
              options={[f0, ...(fournisseurs || [])]}
              optionLabelName="design"
              optionKeyName="id"
            />
          )}
          <Field label="Désignation *" name="design" />
          <Field
            label="Famille matière première *"
            name="familleMatierePremiere"
            as="select"
            options={LIST_FAMILLE_MATIERE_PREMIERE}
          />
          <Field label="Prix *" name="prix" />
          <Field label="Origine" name="origine" as="select" options={ORIGINE} />
          {/* <DatePicker className="border-[#f00]" selected={stsartDate} onChange={(date:any) => setStartDate(date)} /> */}
        </div>
        <Bsave
          className="float-right mt-5 b-ajust-r"
          onClick={() => {
            setTimeout(() => {
              refetch();
              close();
            }, 600);
          }}
        />
      </Form>
      <Bcancel
        className="float-right mt-5 b-ajust"
        onClick={() => {
          close();
        }}
      />
    </Modal>
  );
};

export default forwardRef(FormMatierePremiere);
