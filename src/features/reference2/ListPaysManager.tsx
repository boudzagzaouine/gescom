import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, PencilAltIcon } from "@heroicons/react/solid";
import ArchivePays from "components/reference2/ArchivePays";
import DeletePays from "components/reference2/DeletePays";
import RestorePays from "components/reference2/RestorePays";
import { openPays, OpenPaysProp } from "config/rtk/rtkPays";
import React, { useRef, useState } from "react";
import { Pays, pays0, PaysJson } from "tools/types";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormPaysManager from "./FormPaysManager";
function ListPaysManager() {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };

  const paysToOpen: OpenPaysProp = openPays(page);
  const paysJson: PaysJson = paysToOpen.data;
  const pays: Pays[] = paysJson.content;
  const refetch: () => void = paysToOpen.refetch;
  const save = paysToOpen.save;
  const edit = paysToOpen.edit;
  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const menu = (pays: Pays): MenuItems[] => {
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
          refCom.current(pays, false);
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
          del.current(pays.id);
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
          archive.current(pays.id);
        },
      },
    ];
  };

  return (
    <>
      <Section>
        <DeletePays refetch={refetch} id={""} ref={del} />
        <ArchivePays id={""} ref={archive} />
        <RestorePays id={""} ref={restore} />
        <h1>Pays</h1>
        <div className="float-left w-full">
          <Bcyan
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(pays0, false);
            }}
          >
            Nouveau Pays
          </Bcyan>

          <FormPaysManager
            refetch={refetch}
            save={save}
            edit={edit}
            Pays={pays0}
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
          {pays?.map((Pays) => (
            <tr key={Pays.id}>
              <Table.td>{Pays.design}</Table.td>

              <Table.td>
                <Mitems menu={menu(Pays)} />
              </Table.td>
            </tr>
          ))}
        </Table>

        <Pagin load={loadPage} max={pays?.length} visible={pays?.length > 0} />
      </Section>
    </>
  );
}

export default ListPaysManager;
