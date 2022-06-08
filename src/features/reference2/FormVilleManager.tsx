import React, { forwardRef, useEffect, Ref, useState } from "react";
import { PAYS_CHOICE } from "tools/consts";
import { Field, Form } from "widgets";
import { Ville, i0, Pays } from "tools/types";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import Bcancel from "widgets/Bcancel";
import ModalS from "widgets/ModalS";
import { openpaysv } from "config/rtk/rtkPays";
import Required from "widgets/Required";

type FormVilleManagerProp = {
  save: () => void;
  edit: () => void;
  refetch: () => void;
  Ville: Ville;
  disable: boolean;
};
const FormVilleManager = (
  { save, edit, refetch, Ville, disable }: FormVilleManagerProp,
  ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
  const [ville0, setVille0] = useState(Ville);
  const [showModal, setShowModal] = useState(false);
  const tabPays: Pays[] = openpaysv().data.content;
  const pays = tabPays?.map((d) => d.design);
  const onSubmit = ville0.id == "" ? save : edit;
  const openModal = (d: Ville, disable: boolean) => {
    setVille0(d);
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
      title={ville0.id == "" ? "Nouvelle Ville" : "Modifier Ville"}
      format={5}
      close={close}
    >
      <div className="float-left w-full">
        <Form defaultValues={ville0} onSubmit={onSubmit}>
          <div className="float-left w-full">
            <Field
              label={<Required msg="Désignation" />}
              name="design"
              disabled={disabled}
            />
            <Field
              label={<Required msg="Pays" />}
              name="pays"
              options={["", ...(pays || [])]}
              as="select"
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
            {i0.id == "" && (
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

export default forwardRef(FormVilleManager);
