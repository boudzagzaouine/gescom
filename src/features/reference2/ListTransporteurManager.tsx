import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, PencilAltIcon } from "@heroicons/react/solid";
import ArchiveTransporteur from "components/reference2/ArchiveTransporteur";
import DeleteTransporteur from "components/reference2/DeleteTransporteur";
import RestoreTransporteur from "components/reference2/RestoreTransporteur";
import {
  OpenTransporteurProp,
  openTransporteurs,
} from "config/rtk/rtkTransporteur";
import React, { useRef, useState } from "react";
import { t0, Transporteur, TransporteurJson } from "tools/types";
import Bcyanxl from "widgets/Bcyanxl";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Mitems from "widgets/Mitems";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormTransporteurManager from "./FormTransporteurManager";
function ListTransporteurManager() {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };

  const transporteurToOpen: OpenTransporteurProp = openTransporteurs(page);
  const transporteurJson: TransporteurJson = transporteurToOpen.data;
  const transporteurs: Transporteur[] = transporteurJson.content;
  const refetch: () => void = transporteurToOpen.refetch;
  const save = transporteurToOpen.save;
  const edit = transporteurToOpen.edit;
  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const menu = (transporteur: Transporteur): MenuItems[] => {
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
          //@ts-ignore
          refCom.current(transporteur, false);
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
          del.current(transporteur.id);
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
          archive.current(transporteur.id);
        },
      },
    ];
  };

  return (
    <>
      <Section>
        <DeleteTransporteur refetch={refetch} id={""} ref={del} />
        <ArchiveTransporteur id={""} ref={archive} />
        <RestoreTransporteur id={""} ref={restore} />
        <h1>Transporteurs</h1>
        <div className="float-left w-full">
          <Bcyanxl
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(t0, false);
            }}
          >
            Nouveau Transporteur
          </Bcyanxl>
          <FormTransporteurManager
            refetch={refetch}
            save={save}
            edit={edit}
            transporteur={t0}
            disable={false}
            ref={refCom}
          />

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
          className="tab-list float-left w-full mt-8"
          thead={
            <tr>
              <Table.th>Désignation</Table.th>
              <Table.th></Table.th>
            </tr>
          }
        >
          {transporteurs?.map((Transporteur) => (
            <tr key={Transporteur.id}>
              <Table.td>
                <span>{Transporteur.design}</span>
              </Table.td>

              <Table.td>
                <Mitems menu={menu(Transporteur)} />
              </Table.td>
            </tr>
          ))}
        </Table>

        <Pagin
          load={loadPage}
          max={transporteurs?.length}
          visible={transporteurs?.length > 0}
        />
      </Section>
    </>
  );
}

export default ListTransporteurManager;
