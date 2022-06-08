import React, { useEffect, Ref, useState, forwardRef } from "react";
import { Document } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";

type FormDocumentManagerProp = {
  save: () => void;
  edit: () => void;
  refetch: () => void;
  document: Document;
  disable: boolean;
};
const FormDocumentManager = (
  { save, edit, refetch, document, disable }: FormDocumentManagerProp,
  ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
  const [document0, setDocument0] = useState(document);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = document0.id == "" ? save : edit;
  const openModal = (d: Document, disable: boolean) => {
    setDocument0(d);
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
      title={document0.id == "" ? "Nouveau Document" : "Modifier Document"}
      format={5}
      close={close}
    >
      <Form defaultValues={document0} onSubmit={onSubmit}>
        <div className="float-left w-full">
          <Field
            label={<Required msg="Désignation" />}
            name="design"
            disabled={disabled}
          />
        </div>
        <div className=" mt-5 b-ajust-r">
          <Bsave
            className="float-right"
            onClick={() => {
              setTimeout(() => {
                refetch();
                close();
              }, 600);
            }}
          />
          {document0.id == "" && (
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

export default forwardRef(FormDocumentManager);
