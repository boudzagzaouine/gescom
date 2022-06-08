import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, PencilAltIcon } from "@heroicons/react/solid";
import ArchiveVille from "components/reference2/ArchiveVille";
import DeleteVille from "components/reference2/DeleteVille";
import RestoreVille from "components/reference2/RestoreVille";
import { OpenVilleProp, openVilles } from "config/rtk/rtkVille";
import React, { useRef, useState } from "react";
import { i0, Ville, VilleJson } from "tools/types";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormVilleManager from "./FormVilleManager";
function ListVilleManager() {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };

  const villesToOpen: OpenVilleProp = openVilles(page);
  const villeJson: VilleJson = villesToOpen.data;
  const villes: Ville[] = villeJson.content;
  const refetch: () => void = villesToOpen.refetch;
  const save = villesToOpen.save;
  const edit = villesToOpen.edit;
  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const menu = (ville: Ville): MenuItems[] => {
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
          refCom.current(ville, false);
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
          del.current(ville.id);
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
          archive.current(ville.id);
        },
      },
    ];
  };

  return (
    <>
      <Section>
        <DeleteVille refetch={refetch} id={""} ref={del} />
        <ArchiveVille id={""} ref={archive} />
        <RestoreVille id={""} ref={restore} />
        <h1>Villes</h1>
        <div className="float-left w-full">
          <Bcyan
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(i0, false);
            }}
          >
            Nouvelle Ville
          </Bcyan>
          <FormVilleManager
            refetch={refetch}
            save={save}
            edit={edit}
            Ville={i0}
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
              <Table.th>Pays</Table.th>
              <Table.th></Table.th>
            </tr>
          }
        >
          {villes?.map((Ville) => (
            <tr key={Ville.id}>
              <Table.td>
                <span>{Ville.design}</span>
              </Table.td>
              <Table.td>
                <span>{Ville.pays}</span>
              </Table.td>

              <Table.td>
                <Mitems key={Ville.id} menu={menu(Ville)} />
              </Table.td>
            </tr>
          ))}
        </Table>

        <Pagin
          load={loadPage}
          max={villes?.length}
          visible={villes?.length > 0}
        />
      </Section>
    </>
  );
}

export default ListVilleManager;
