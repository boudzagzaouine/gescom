import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { Devise } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";
type FormDeviseManagerProp = {
  save: () => void;
  edit: () => void;
  refetch: () => void;
  Devise: Devise;
  disable: boolean;
};
const FormDeviseManager = (
  { save, edit, refetch, Devise, disable }: FormDeviseManagerProp,
  ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
  const [devise0, setDevise0] = useState(Devise);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = devise0.id == "" ? save : edit;
  const openModal = (d: Devise, disable: boolean) => {
    setDevise0(d);
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
      title={devise0.id == "" ? "Nouvelle Devise" : "Modifier Devise"}
      format={5}
      close={close}
    >
      <div className="float-left w-full">
        <Form defaultValues={devise0} onSubmit={onSubmit}>
          <div className=" float-left w-1/2">
            <Field
              label={<Required msg="Désignation" />}
              name="design"
              disabled={disabled}
            />
          </div>

          <div className="float-left w-full">
            <div className="float-left w-1/2">
              <Field
                label={<Required msg="Code ISO" />}
                name="code_iso"
                disabled={disabled}
              />
            </div>
            <div className="float-right w-1/2">
              <Field
                label={<Required msg="Symbole" />}
                name="symbole"
                disabled={disabled}
              />
            </div>
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
            {devise0.id == "" && (
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
      </div>
    </ModalS>
  );
};

export default forwardRef(FormDeviseManager);
