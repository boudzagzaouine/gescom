import { useAddPaysMutation, useEditPaysMutation } from "config/rtk/rtkPays";
import React, { useEffect, Ref, useState, forwardRef } from "react";
import { Field, Form } from "widgets";
import { Pays } from "tools/types";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import Bcancel from "widgets/Bcancel";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";

type FormPaysManagerProp = {
  save: () => void;
  edit: () => void;
  refetch: () => void;
  Pays: Pays;
  disable: boolean;
};
const FormPaysManager = (
  { save, edit, refetch, Pays, disable }: FormPaysManagerProp,
  ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
  const [pays0, setPays0] = useState(Pays);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = pays0.id == "" ? save : edit;
  const openModal = (d: Pays, disable: boolean) => {
    setPays0(d);
    setShowModal(true);
    setDisabled(disable);
  };
  const close = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  }, []);

  return (
    <ModalS
      show={showModal}
      title={pays0.id == "" ? "Nouveau Pays" : "Modifier Pays"}
      format={5}
      close={close}
    >
      <Form defaultValues={pays0} onSubmit={onSubmit}>
        <div className="float-left w-full">
          <Field
            label={<Required msg="Désignation" />}
            name="design"
            disabled={disabled}
          />
        </div>
        <div className="mt-5 b-ajust-r">
          <Bsave
            className="float-right"
            onClick={() => {
              setTimeout(() => {
                refetch();
                close();
              }, 600);
            }}
          />
          {pays0.id == "" && (
            <BsavEndNew
              className="ml-10 mr-2"
              onClick={() => {
                setTimeout(() => {
                  refetch();
                }, 600);
              }}
            />
          )}
        </div>
      </Form>
      <Bcancel
        className="float-right mt-5 b-ajust"
        onClick={() => {
          close();
        }}
      />
    </ModalS>
  );
};

export default forwardRef(FormPaysManager);
