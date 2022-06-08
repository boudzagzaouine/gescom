import React, { forwardRef, useEffect, Ref, useState } from "react";
import { Field, Form } from "widgets";
import { Transporteur } from "tools/types";
import Bcancel from "widgets/Bcancel";
import BsavEndNew from "widgets/BsavEndNew";
import Bsave from "widgets/Bsave";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";

type FormTransporteurManagerProp = {
  save: () => void;
  edit: () => void;
  refetch: () => void;
  transporteur: Transporteur;
  disable: boolean;
};
const FormTransporteurManager = (
  { save, edit, refetch, transporteur, disable }: FormTransporteurManagerProp,
  ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
  const [transporteur0, setTransporteur0] = useState(transporteur);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = transporteur0.id == "" ? save : edit;
  const openModal = (d: Transporteur, disable: boolean) => {
    setTransporteur0(d);
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
      title={
        transporteur0.id == ""
          ? "Nouveau Transporteur"
          : "Modifier Transporteur"
      }
      format={5}
      close={close}
    >
      <Form defaultValues={transporteur0} onSubmit={onSubmit}>
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
          {transporteur0.id == "" && (
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

export default forwardRef(FormTransporteurManager);
