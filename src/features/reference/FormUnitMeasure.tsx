import classNames from "classnames";
import {
  OpenUnitMeasureProp,
  openUnitMeasures,
} from "config/rtk/rtkUnitMeasure";
import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import {
  ARCHIVE,
  DECIMAL,
  DEL,
  REQUEST_EDIT,
  REQUEST_SAVE,
  RESTORE,
} from "tools/consts";
import { UnitMeasure, unitMeasure0, UnitMeasureJson } from "tools/types";
import { Field, Form } from "widgets";
import Action from "widgets/Action";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import MitemsRef from "widgets/MitemsRef";
import ModalS from "widgets/ModalS";
import Pagin from "widgets/Pagin";
import Required from "widgets/Required";
import Table from "widgets/Table";

type FormUnitMeasureProps = {
  save: () => void;
	edit: () => void;
	refetch: () => void;
  unitMeasure: UnitMeasure;
	disable: boolean;
};
const FormUnitMeasure = (
  { save, edit, refetch, unitMeasure, disable }: FormUnitMeasureProps,
	ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
	const [unitMeasure1, setunitMeasure1] = useState(unitMeasure);
	const [showModal, setShowModal] = useState(false);
	const onSubmit = unitMeasure1.id == "" ? save : edit;
	const openModal = (d: UnitMeasure, disable: boolean) => {
		setunitMeasure1(d);
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
          unitMeasure1.id == ""
            ? "Nouvelle Unité de Mesure"
            : "Modifier Unité de Mesure"
        }
        format={+classNames("5")}
        close={close}
      >
        <div className="float-left w-full">
          <Form defaultValues={unitMeasure1} onSubmit={onSubmit} >
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
                  label={<Required msg="Symbole" />}
                  name="symbole"
                  disabled={disabled} 
                />
              </div>
              <div className="float-right w-1/2">
                <Field
                  label={<Required msg="Décimal" />}
                  name="decimal"
                  options={DECIMAL}
                  as="select"
                  disabled={disabled} 
                />
              </div>
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
              {unitMeasure1.id == "" && (
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

export default forwardRef(FormUnitMeasure);
