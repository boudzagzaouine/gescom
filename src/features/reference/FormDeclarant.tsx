import {
  ArchiveIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { OpenDeclarantProp, openDeclarants } from "config/rtk/rtkDeclarant";
import { openVilleD } from "config/rtk/rtkVille";
import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { REQUEST_EDIT, REQUEST_SAVE } from "tools/consts";
import { Declarant, declarant0, DeclarantJson, Ville } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import Mitems from "widgets/Mitems";
import ModalS from "widgets/ModalS";
import Pagin from "widgets/Pagin";
import Required from "widgets/Required";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";

type FormDeclarantProps = {
  declarant: Declarant;
};
const FormDeclarant = ({ declarant }: FormDeclarantProps, ref: Ref<void>) => {
  const declarantsToOpen: OpenDeclarantProp = openDeclarants();
  const declarantJson: DeclarantJson = declarantsToOpen.data;
  const declarants: Declarant[] = declarantJson.content;
  const tabVille: Ville[] = openVilleD().data.content;
  const Ville = tabVille?.map((d) => d.design);
  const refetchDeclarant: () => void = declarantsToOpen.refetch;
  const saveDeclarant = declarantsToOpen.save;
  const editDeclarant = declarantsToOpen.edit;

  //const { data = [], isFetching, refetch } = usePaginationDeclarantsQuery(0);
  const [declarant1, setDeclarant1] = useState<Declarant>(declarant0);
  const [request, setRequest] = useState(REQUEST_SAVE);

  //const [save] = useAddDeclarantMutation();

  const [form, setForm] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const [show, setShow] = useState(false);
  const open = (d: Declarant) => {
    setDeclarant1(d);
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
    refetchDeclarant();
  };

  const showFormulaire = (declarant: Declarant) => {
    setDeclarant1(declarant);
    setForm(true);
    setRequest(REQUEST_EDIT);
  };

  const FormAsEdit = (declarant: Declarant) => {
    setDisabled(true);
    showFormulaire(declarant);
  };

  const void_ = () => {};

  //const [updateDeclarant] = useEditDeclarantMutation();

  const menu = (declarant: Declarant): MenuItems[] => {
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
          open(declarant);
          setRequest(REQUEST_EDIT);
          setDisabled(false);
        },
      },
      {
        icon: (
          <TrashIcon
            className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Supprimer",
        action: () => {
          //@ts-ignore
          del.current(declarant.id);
        },
      },
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
          archive.current(declarant.id);
        },
      },
    ];
  };

  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
          <DeleteDeclarant id={""} ref={del} refetch={refetchDeclarant} />
          <ArchiveDeclarant id={""} ref={archive} />
          <RestoreDeclarant id={""} ref={restore} />
          <h1>Déclarants</h1>
          <div className="float-left w-full">
            <button
              className="bg-sky-900 p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left"
              onClick={() => {
                setDisabled(false);
                open(declarant0);
              }}
            >
              Nouveau Déclarant
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
                  Désignation
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Ville
                </th>
                <th></th>
              </tr>
            }
          >
            {
              //@ts-ignore
              declarants?.map((declarant: Declarant) => {
                return (
                  //@ts-ignore
                  <tr key={declarant.id}>
                    <Table.td>{declarant.design}</Table.td>
                    <Table.td>{declarant.ville}</Table.td>
                    <Table.td className="cursor-pointer">
                      <Mitems menu={menu(declarant)} />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin
            load={loadPage}
            max={declarants?.length}
            visible={declarants?.length > 0 ? true : false}
          />
        </section>
      )}

      <ModalS
        show={show}
        title={declarant1.id == "" ? "Nouveau Déclarant" : "Modifier Déclarant"}
        format={+classNames("5")}
        close={closed}
      >
        <div className="float-left w-full">
          <Form
            defaultValues={declarant1}
            onSubmit={
              request == REQUEST_SAVE
                ? saveDeclarant
                : request == REQUEST_EDIT
                ? editDeclarant
                : void_
            }
          >
            <div className=" float-left w-full">
              <Field
                label={<Required msg="Désignation" />}
                name="design"
                disabled={disabled} //required={true}
              />
              <Field
                label={<Required msg="Ville" />}
                name="ville"
                options={["", ...(Ville || [])]}
                as="select"
                disabled={disabled} //required={true}
              />
            </div>

            <div className="mt-5 b-ajust-r">
              <Bsave
                className="float-right"
                onClick={() => {
                  setTimeout(() => {
                    refetchDeclarant();
                    closed();
                  }, 500);
                }}
              />
              {declarant1.id == "" && (
                <BsavEndNew
                  className="ml-10 mr-2"
                  onClick={() => {
                    setTimeout(() => {
                      refetchDeclarant();
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

export default forwardRef(FormDeclarant);
