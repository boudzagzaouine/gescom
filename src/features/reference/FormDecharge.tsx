import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { Decharge, decharge0, DechargeJson } from "tools/types";
import {
  CLIENTS,
  DECLARANTS,
  REQUEST_EDIT,
  REQUEST_SAVE,
  TRANSPORTEURS,
} from "tools/consts";
import { Form, Field, Button } from "widgets";
import Modal from "widgets/Modal";
import Bcyan from "widgets/Bcyan";
import classNames from "classnames";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import Mitems from "widgets/Mitems";
import {
  ArchiveIcon,
  ClipboardListIcon,
  PencilAltIcon,
  ReplyIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Pagin from "widgets/Pagin";
import Icon from "widgets/Icon";
import { OpenDechargeProp } from "../../config/rtk/openDecharge";
import { opendecharges } from "config/rtk/rtkDecharge";
import DeleteDecharge from "./Decharge/Methods/DeleteDecharge";
import ArchiveDecharge from "./Decharge/Methods/ArchiveDecharge";
import RestoreDecharge from "./Decharge/Methods/RestoreDecharge";

type FormDechargeProps = {
  decharge: Decharge;
};
const FormDecharge = ({ decharge }: FormDechargeProps, ref: Ref<void>) => {
  const dechargesToOpen: OpenDechargeProp = opendecharges();
  const dechargeJson: DechargeJson = dechargesToOpen.data;
  const decharges: Decharge[] = dechargeJson.content;
  const refetchDecharge: () => void = dechargesToOpen.refetch;
  const saveDecharge = dechargesToOpen.save;
  const editDecharge = dechargesToOpen.edit;

  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetchDecharge();
  };

  //const { data = [], isFetching, refetch } = usePaginationDumsQuery(0);
  const [decharge1, setDecharge1] = useState<Decharge>(decharge0);
  const [request, setRequest] = useState(REQUEST_SAVE);

  //const [save] = useAddDumMutation();

  const [form, setForm] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const [show, setShow] = useState(false);
  const open = (d: Decharge) => {
    setDecharge1(d);
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

  const showFormulaire = (decharge: Decharge) => {
    setDecharge1(decharge);
    setForm(true);
    setRequest(REQUEST_EDIT);
  };

  const FormAsEdit = (decharge: Decharge) => {
    setDisabled(true);
    showFormulaire(decharge);
  };

  const void_ = () => {};

  //const [updateArticle] = useEditDumMutation();

  const menu = (decharge: Decharge): MenuItems[] => {
    return [
      {
        icon: (
          <ClipboardListIcon
            className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Détail",
        action: () => {
          open(decharge);
          setRequest(REQUEST_EDIT);
          setDisabled(true);
        },
      },
      {
        icon: (
          <PencilAltIcon
            className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Modifier",
        action: () => {
          open(decharge);
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
          del.current(decharge.id);
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
          archive.current(decharge.id);
        },
      },
      {
        icon: (
          <ReplyIcon
            className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Restorer",
        action: () => {
          //@ts-ignore
          restore.current(decharge.id);
        },
      },
    ];
  };

  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
          <DeleteDecharge id={""} ref={del} refetch={refetchDecharge} />
          <ArchiveDecharge id={""} ref={archive} />
          <RestoreDecharge id={""} ref={restore} />

          <div className="float-left w-full">
            <button
              className="bg-sky-900 p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left"
              onClick={() => {
                setDisabled(false);
                open(decharge0);
              }}
            >
              Nouvelle Décharge
            </button>
            <div className="float-right">
              <Button className="bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg">
                <Icon i="search" cl="" />
              </Button>
              <input
                type="text"
                className="py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96"
              />
            </div>
          </div>
          <Table
            className="tab-list float-left w-full mt-8 tab-list float-left w-full"
            thead={
              <tr>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  N°
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Client
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  Déclarant
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Transporteur
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Valeur
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  Date
                </th>
                <th></th>
              </tr>
            }
          >
            {
              //@ts-ignore
              decharges?.map((decharge: Decharge) => {
                return (
                  //@ts-ignore
                  <tr key={decharge.id}>
                    <Table.td>{decharge.numDecharge}</Table.td>
                    <Table.td>{decharge.client}</Table.td>
                    <Table.td>{decharge.declarant}</Table.td>
                    <Table.td>{decharge.transporteur}</Table.td>
                    <Table.td>
                      {decharge.valeur}
                      {"$"}
                    </Table.td>
                    <Table.td>{decharge.date}</Table.td>

                    <Table.td className="cursor-pointer">
                      <Mitems menu={menu(decharge)} />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin
            load={loadPage}
            max={300}
            visible={decharges?.length ? true : false}
          />
        </section>
      )}
      <Modal
        show={show}
        title="Nouvelle Décharge"
        format={+classNames("5")}
        close={closed}
      >
        <div className="float-left w-full">
          <Form
            defaultValues={decharge1}
            onSubmit={
              request == REQUEST_SAVE
                ? saveDecharge
                : request == REQUEST_EDIT
                ? editDecharge
                : void_
            }
          >
            <div className="float-left w-full">
              <div>
                <div className="float-left w-1/2">
                  <Field
                    label="Client"
                    name="client"
                    options={CLIENTS}
                    as="select"
                    disabled={disabled}
                    required={true}
                  />
                </div>
                <div className="float-left w-1/2">
                  <Field
                    label="Déclarant"
                    name="declarant"
                    options={DECLARANTS}
                    as="select"
                    disabled={disabled}
                    required={true}
                  />
                </div>
              </div>
              <div>
                <div className="float-left w-1/2">
                  <Field
                    label="Date"
                    name="date"
                    type="date"
                    disabled={disabled}
                    required={true}
                  />
                </div>
                <div className="float-left w-1/2">
                  <Field
                    label="Transporteur"
                    name="transporteur"
                    options={TRANSPORTEURS}
                    as="select"
                    disabled={disabled}
                    required={true}
                  />
                </div>
              </div>
            </div>
            {!disabled && (
              <>
                <Bcyan
                  className="m-4 mt-10"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Sauvegarder et Nouveau
                </Bcyan>

                <Bcyan
                  className="m-4 mt-10"
                  type="submit"
                  onClick={() => {
                    setTimeout(() => {
                      refetchDecharge();
                      closed();
                    }, 500);
                  }}
                >
                  Sauvegarder
                </Bcyan>
              </>
            )}
            {disabled && (
              <Bcyan
                className="float-right m-4 mt-10"
                onClick={() => {
                  setDisabled(false);
                }}
              >
                modifier
              </Bcyan>
            )}
            {!disabled && (
              <Bcyan
                className="float-right m-4 mt-10"
                onClick={() => {
                  setDisabled(false);
                  setShow(false);
                }}
              >
                Annuler
              </Bcyan>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(FormDecharge);
