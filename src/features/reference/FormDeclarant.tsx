import {
  ArchiveIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { OpenDeclarantProp, openDeclarants } from "config/rtk/rtkDeclarant";
import { openVilleD } from "config/rtk/rtkVille";
import React, { ChangeEvent, forwardRef, Ref, useEffect, useRef, useState } from "react";
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE } from "tools/consts";
import { getLine } from "tools/Methodes";
import { Declarant, declarant0, DeclarantJson, Ville } from "tools/types";
import { Field, Form } from "widgets";
import Action from "widgets/Action";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import Mitems from "widgets/Mitems";
import MitemsRef from "widgets/MitemsRef";
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
  const FormAsUpdate = (declarant: Declarant) => {
    setDisabled(false);
    open(declarant);
  };
  const void_ = () => {};
  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
           <Action
            id=""
            path="declarants"
            design=""
            type="Déclarant"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="declarants"
            design=""
            type="Déclarant"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="declarants"
            design=""
            type="Déclarant"
            ref={restore}
            action={RESTORE}
          />

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
              declarants?.map((dec: dec) => {
                return (
                  //@ts-ignore
                  <tr key={dec.id}>
                    <Table.td>{dec.design}</Table.td>
                    <Table.td>
                    <span>{getLine(dec.ville, tabVille)?.design}</span>
                    </Table.td>
                    <Table.td className="cursor-pointer">
                    <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(dec.id, dec.design);
                        }}
                        /*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
                        del={() => {
                          //@ts-ignore
                          del.current(dec.id, dec.design);
                        }}
                        obj={dec}
                        update={() => {
                          FormAsUpdate(dec);
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
            max={declarants?.length}
            visible={declarants?.length > 0 ? true : false}
          />
        </section>
      )}

      <ModalS
        show={show}
        title={declarant.id == "" ? "Nouveau Déclarant" : "Modifier Déclarant"}
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
                disabled={disabled}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setDeclarant1({ ...declarant1, design: e.target.value });
                }}
              />
              <Field
							disabled={disabled}
							label={<Required msg='Ville' />}
							name='ville'
							as='select'
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								setDeclarant1({ ...declarant1, ville: e.target.value });
							}}>
							{
								//@ts-ignore
								["", ...(tabVille || [])]?.map((c: Ville) => (
									<option key={c.id} value={c.id}>
										{c.design}
									</option>
								))
							}
						</Field>
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
