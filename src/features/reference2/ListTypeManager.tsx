import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, PencilAltIcon } from "@heroicons/react/solid";
import ArchiveType from "components/reference2/ArchiveType";
import DeleteType from "components/reference2/DeleteType";
import RestoreType from "components/reference2/RestoreType";
import { OpenTypeProp, openTypes } from "config/rtk/rtkType";
import React, { useRef, useState } from "react";
import { Type, type0, TypeJson } from "tools/types";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormTypeManager from "./FormTypeManager";
function ListTypeManager() {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };
  const typesToOpen: OpenTypeProp = openTypes(page);
  const typeJson: TypeJson = typesToOpen.data;
  const types: Type[] = typeJson.content;
  const refetch: () => void = typesToOpen.refetch;
  const save = typesToOpen.save;
  const edit = typesToOpen.edit;
  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);
  const menu = (type: Type): MenuItems[] => {
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
          refCom.current(type, false);
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
          del.current(type.id);
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
          archive.current(type.id);
        },
      },
    ];
  };

  return (
    <>
      <Section>
        <DeleteType refetch={refetch} id={""} ref={del} />
        <ArchiveType id={""} ref={archive} />
        <RestoreType id={""} ref={restore} />
        <h1>Types En-Têtes</h1>
        <div className="float-left w-full">
          <Bcyan
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(type0, false);
            }}
          >
            Nouveau Type
          </Bcyan>
          <FormTypeManager
            refetch={refetch}
            save={save}
            edit={edit}
            Type={type0}
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
          {types?.map((Type) => (
            <tr key={Type.id}>
              <Table.td>
                <figure>
                  <figcaption>
                    <span>{Type.design}</span>
                  </figcaption>
                </figure>
              </Table.td>

              <Table.td>
                <Mitems menu={menu(Type)} />
              </Table.td>
            </tr>
          ))}
        </Table>

        <Pagin
          load={loadPage}
          max={types?.length}
          visible={types?.length > 0}
        />
      </Section>
    </>
  );
}

export default ListTypeManager;
