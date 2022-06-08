import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, PencilAltIcon } from "@heroicons/react/solid";
import ArchiveDocument from "components/reference2/ArchiveDocument";
import DeleteDocument from "components/reference2/DeleteDocument";
import RestoreDocument from "components/reference2/RestoreDocument";
import { OpenDocumentProp, openDocuments } from "config/rtk/rtkDocument";
import React, { useRef, useState } from "react";
import { Document, DocumentJson, y0 } from "tools/types";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormDocumentManager from "./FormDocumentManager";
function ListDocumentManager() {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };
  const documentToOpen: OpenDocumentProp = openDocuments(page);
  const documentJson: DocumentJson = documentToOpen.data;
  const document: Document[] = documentJson.content;
  const refetch: () => void = documentToOpen.refetch;
  const save = documentToOpen.save;
  const edit = documentToOpen.edit;
  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const menu = (document: Document): MenuItems[] => {
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
          refCom.current(document, false);
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
          del.current(document.id);
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
          archive.current(document.id);
        },
      },
    ];
  };

  return (
    <>
      <Section>
        <DeleteDocument refetch={refetch} id={""} ref={del} />
        <ArchiveDocument id={""} ref={archive} />
        <RestoreDocument id={""} ref={restore} />
        <h1>Documents</h1>
        <div className="float-left w-full">
          <Bcyan
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(y0, false);
            }}
          >
            Nouveau Document
          </Bcyan>
          <FormDocumentManager
            refetch={refetch}
            save={save}
            edit={edit}
            document={y0}
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
          {
            //@ts-ignore
            document?.map((Document) => (
              //   data?.map((document) => (
              <tr key={Document.id}>
                <Table.td>
                  <span>{Document.design}</span>
                </Table.td>

                <Table.td>
                  <Mitems0 menu={menu(Document)} />
                </Table.td>
              </tr>
            ))
          }
        </Table>

        <Pagin
          load={loadPage}
          max={document?.length}
          visible={document?.length > 0}
        />
      </Section>
    </>
  );
}

export default ListDocumentManager;
