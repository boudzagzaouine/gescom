import classNames from "classnames";
import {
  OpenBureauDouaneProp,
  openBureauDouanes,
} from "config/rtk/rtkBureauDouane";
import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import {
  ARCHIVE,
  DEL,
  REQUEST_EDIT,
  REQUEST_SAVE,
  RESTORE,
} from "tools/consts";
import { BureauDouane, bureauDouane0, BureauDouaneJson } from "tools/types";
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

type FormBureauDouaneProps = {
  bureauDouane: BureauDouane;
};
const FormBureauDouane = (
  { bureauDouane }: FormBureauDouaneProps,
  ref: Ref<void>
) => {
  const bureauDouanesToOpen: OpenBureauDouaneProp = openBureauDouanes();
  const bureauDouaneJson: BureauDouaneJson = bureauDouanesToOpen.data;
  const bureauDouanes: BureauDouane[] = bureauDouaneJson.content;
  const refetchBureauDouane: () => void = bureauDouanesToOpen.refetch;
  const saveBureauDouane = bureauDouanesToOpen.save;
  const editBureauDouane = bureauDouanesToOpen.edit;

  //const { data = [], isFetching, refetch } = usePaginationBureauDouanesQuery(0);
  const [bureauDouane1, setBureauDouane1] =
    useState<BureauDouane>(bureauDouane0);
  const [request, setRequest] = useState(REQUEST_SAVE);

  //const [save] = useAddBureauDouaneMutation();

  const [form, setForm] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [show, setShow] = useState(false);
  const open = (b: BureauDouane) => {
    setBureauDouane1(b);
    setShow(true);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = open;
  });

  const closed = () => {
    setShow(false);
    setDisabled(true);
  };

  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetchBureauDouane();
  };

  const showFormulaire = (bureauDouane: BureauDouane) => {
    setBureauDouane1(bureauDouane);
    setForm(true);
    setRequest(REQUEST_EDIT);
  };

  const FormAsEdit = (bureauDouane: BureauDouane) => {
    setDisabled(true);
    showFormulaire(bureauDouane);
  };
  const FormAsUpdate = (bureauDouane: BureauDouane) => {
    setDisabled(false);
    open(bureauDouane);
  };

  const void_ = () => {};

  //const [updateBureauDouane] = useEditBureauDouaneMutation();

  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
          <Action
            id=""
            path="bureauDouanes"
            design=""
            type="Bureau Douane"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="bureauDouanes"
            design=""
            type="Bureau Douane"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="bureauDouanes"
            design=""
            type="Bureau Douane"
            ref={restore}
            action={RESTORE}
          />
          <h1>Bureaux de Douane</h1>
          <div className="float-left w-full">
            <button
              className="bg-sky-900 p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left"
              onClick={() => {
                setDisabled(false);
                open(bureauDouane0);
              }}
            >
              Nouveau Bureau Douanier
            </button>
            <div className="float-right">
              <button className="bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <input
                type="text"
                className="py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96"
                placeholder="Recherche"
              />
              {/* <button>icon</button> */}
            </div>
          </div>
          <Table
            className="tab-list float-left w-full mt-8 tab-list float-left w-full"
            thead={
              <tr>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Numéro
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Désignation
                </th>
                <th></th>
              </tr>
            }
          >
            {
              //@ts-ignore
              bureauDouanes?.map((bureauDouane: BureauDouane) => {
                return (
                  //@ts-ignore
                  <tr key={bureauDouane.id}>
                    <Table.td>{bureauDouane.code}</Table.td>
                    <Table.td>{bureauDouane.design}</Table.td>
                    <Table.td className="cursor-pointer">
                      <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(bureauDouane.id, bureauDouane.design);
                        }}
                        /*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
                        del={() => {
                          //@ts-ignore
                          del.current(bureauDouane.id, bureauDouane.design);
                        }}
                        obj={bureauDouane}
                        update={() => {
                          FormAsUpdate(bureauDouane);
                        }}
                      />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin
            load={loadPage}
            max={bureauDouanes?.length}
            visible={bureauDouanes?.length > 0 ? true : false}
          />
        </section>
      )}

      <ModalS
        show={show}
        title={
          bureauDouane1.id == ""
            ? "Nouveau Bureau Douane"
            : "Modifier Bureau Douane"
        }
        format={+classNames("5")}
        close={closed}
      >
        <div className="float-left w-full">
          <Form
            defaultValues={bureauDouane1}
            onSubmit={
              request == REQUEST_SAVE
                ? saveBureauDouane
                : request == REQUEST_EDIT
                ? editBureauDouane
                : void_
            }
          >
            <div className="float-left w-full">
              <Field
                label={<Required msg="Numéro" />}
                name="code"
                disabled={disabled} //required={true}
              />
              <Field
                label={<Required msg="Désignation" />}
                name="design"
                disabled={disabled} //required={true}
              />
            </div>
            <div className="mt-5 b-ajust-r">
              <Bsave
                className="float-right"
                onClick={() => {
                  setTimeout(() => {
                    refetchBureauDouane();
                    closed();
                  }, 500);
                }}
              />
              {bureauDouane1.id == "" && (
                <BsavEndNew
                  className="ml-10 mr-2"
                  onClick={() => {
                    setTimeout(() => {
                      refetchBureauDouane();
                    }, 500);
                  }}
                />
              )}
            </div>
          </Form>
          <Bcancel
            className="float-right mt-5 b-ajust"
            onClick={() => {
              setDisabled(true);
              setShow(false);
            }}
          />
        </div>
      </ModalS>
    </>
  );
};

export default forwardRef(FormBureauDouane);
