import { ArchiveIcon, PencilAltIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { OpenIncotermProp, openIncoterms } from "config/rtk/rtkIncoterm";
import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { REQUEST_EDIT, REQUEST_SAVE } from "tools/consts";
import { Incoterm, incoterm0, IncotermJson } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import ModalS from "widgets/ModalS";
import Pagin from "widgets/Pagin";
import Required from "widgets/Required";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";

type FormIncotermProps = {
  incoterm: Incoterm;
};
const FormIncoterm = ({ incoterm }: FormIncotermProps, ref: Ref<void>) => {
  const incotermsToOpen: OpenIncotermProp = openIncoterms();
  const incotermJson: IncotermJson = incotermsToOpen.data;
  const incoterms: Incoterm[] = incotermJson.content;
  const refetchIncoterm: () => void = incotermsToOpen.refetch;
  const saveIncoterm = incotermsToOpen.save;
  const editIncoterm = incotermsToOpen.edit;

  //const { data = [], isFetching, refetch } = usePaginationIncotermsQuery(0);
  const [incoterm1, setIncoterm1] = useState<Incoterm>(incoterm0);
  const [request, setRequest] = useState(REQUEST_SAVE);

  //const [save] = useAddIncotermMutation();

  const [form, setForm] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [show, setShow] = useState(false);
  const open = (i: Incoterm) => {
    setIncoterm1(i);
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
    refetchIncoterm();
  };

  const showFormulaire = (incoterm: Incoterm) => {
    setIncoterm1(incoterm);
    setForm(true);
    setRequest(REQUEST_EDIT);
  };

  const FormAsEdit = (incoterm: Incoterm) => {
    setDisabled(true);
    showFormulaire(incoterm);
  };

  const void_ = () => {};

  //const [updateIncoterm] = useEditIncotermMutation();

  const menu = (incoterm: Incoterm): MenuItems[] => {
    return [
      {
        icon: (
          <PencilAltIcon
            className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Modifier",
        action: () => {
          open(incoterm);
          setRequest(REQUEST_EDIT);
          setDisabled(false);
        },
      },
      /* {
        icon: (
          <TrashIcon
            className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Supprimer",
        action: () => {
          //@ts-ignore
          del.current(incoterm.id);
        },
      }, */
      {
        icon: (
          <ArchiveIcon
            className="mr-3 h-8 w-8 text-gray-800 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Archiver",
        action: () => {
          //@ts-ignore
          archive.current(incoterm.id);
        },
      },
    ];
  };

  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
          <DeleteIncoterm id={""} ref={del} refetch={refetchIncoterm} />
          <ArchiveIncoterm id={""} ref={archive} />
          <RestoreIncoterm id={""} ref={restore} />
          <h1>Incoterms</h1>
          <div className="float-left w-full">
            <button
              className="bg-sky-900 p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left"
              onClick={() => {
                setDisabled(false);
                open(incoterm0);
              }}
            >
              Nouveau Incoterm
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
                  Code
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
              incoterms?.map((incoterm: Incoterm) => {
                return (
                  //@ts-ignore
                  <tr key={incoterm.id}>
                    <Table.td>{incoterm.code}</Table.td>
                    <Table.td>{incoterm.design}</Table.td>
                    <Table.td className="cursor-pointer">
                      <Mitems0 menu={menu(incoterm)} />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin
            load={loadPage}
            max={incoterms?.length}
            visible={incoterms?.length > 0 ? true : false}
          />
        </section>
      )}

      <ModalS
        show={show}
        title={incoterm1.id == "" ? "Nouveau Icoterm" : "Modifier Incoterm"}
        format={+classNames("5")}
        close={closed}
      >
        <div className="float-left w-full">
          <Form
            defaultValues={incoterm1}
            onSubmit={
              request == REQUEST_SAVE
                ? saveIncoterm
                : request == REQUEST_EDIT
                ? editIncoterm
                : void_
            }
          >
            <div className="float-left w-full">
              <Field
                label={<Required msg="Code" />}
                name="code"
                disabled={disabled} //required={true}
              />
              <Field
                label={<Required msg="Désignation" />}
                name="design"
                disabled={disabled} //required={true}
              />
            </div>
            <div className=" mt-5 b-ajust-r">
              <Bsave
                className="float-right"
                onClick={() => {
                  setTimeout(() => {
                    refetchIncoterm();
                    closed();
                  }, 500);
                }}
              />
              {incoterm1.id == "" && (
                <BsavEndNew
                  className="ml-10 mr-2"
                  onClick={() => {
                    setTimeout(() => {
                      refetchIncoterm();
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

export default forwardRef(FormIncoterm);
