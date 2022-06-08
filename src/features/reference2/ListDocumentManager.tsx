import { OpenDocumentProp, openDocuments } from "config/rtk/rtkDocument";
import React, { useRef, useState } from "react";
import { ARCHIVE, DEL, RESTORE } from "tools/consts";
import { Document, DocumentJson, y0 } from "tools/types";
import Action from "widgets/Action";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import MitemsRef from "widgets/MitemsRef";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
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

  return (
    <>
      <Section>
      <Action
            id=""
            path="documents"
            design=""
            type="Document"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="documents"
            design=""
            type="Document"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="documents"
            design=""
            type="Document"
            ref={restore}
            action={RESTORE}
          />
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
                  <MitemsRef  
                        archive={() => {
                          //@ts-ignore
                          archive.current(Document.id, Document.design);
                        }}
                        /*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
                        del={() => {
                          //@ts-ignore
                          del.current(Document.id, Document.design);
                        }}
                        obj={Document}
                        update={() => {
                                   //@ts-ignore
                             refCom.current(Document, false);
                        }} />
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
