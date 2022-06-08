import React, { useEffect, Ref, useState, forwardRef } from "react";
import { Field, Form } from "widgets";
import { Type } from "tools/types";
import Bcancel from "widgets/Bcancel";
import BsavEndNew from "widgets/BsavEndNew";
import Bsave from "widgets/Bsave";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";

type FormTypeManagerProp = {
  save: () => void;
  edit: () => void;
  refetch: () => void;
  Type: Type;
  disable: boolean;
};
const FormTypeManager = (
  { save, edit, refetch, Type, disable }: FormTypeManagerProp,
  ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
  const [type0, setType0] = useState(Type);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = type0.id == "" ? save : edit;
  const openModal = (d: Type, disable: boolean) => {
    setType0(d);
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
      title={type0.id == "" ? "Nouveau Type" : "Modifier Type"}
      format={5}
      close={close}
    >
      <Form defaultValues={type0} onSubmit={onSubmit}>
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
          {type0.id == "" && (
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

export default forwardRef(FormTypeManager);
