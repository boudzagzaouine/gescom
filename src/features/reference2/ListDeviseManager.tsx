import { OpenDeviseProp } from "config/rtk/rtkDevise";
import { openDevises } from "config/rtk/rtkDevise";
import React, { useRef, useState } from "react";
import { Devise, DeviseJson, v0 } from "tools/types";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import FormDeviseManager from "./FormDevise";
import MitemsRef from "widgets/MitemsRef";
import { ARCHIVE, DEL, RESTORE } from "tools/consts";
import Action from "widgets/Action";

function ListDeviseManager() {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };

  const devisesToOpen: OpenDeviseProp = openDevises(page);
  const deviseJson: DeviseJson = devisesToOpen.data;
  const devises: Devise[] = deviseJson.content;
  const refetch: () => void = devisesToOpen.refetch;
  const save = devisesToOpen.save;
  const edit = devisesToOpen.edit;

  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);
  const imputFocus = useRef();

  return (
    <>
      <Section>
      <Action
            id=""
            path="devises"
            design=""
            type="Devise"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="devises"
            design=""
            type="Devise"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="devises"
            design=""
            type="Devise"
            ref={restore}
            action={RESTORE}
          />
        <h1>Devise</h1>
        <div className="float-left w-full">
          <Bcyan
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(v0, false);
            }}
          >
            Novelle Devise
          </Bcyan>
          <FormDeviseManager
            refetch={refetch}
            save={save}
            edit={edit}
            Devise={v0}
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
              <Table.th>Code ISO</Table.th>
              <Table.th>Symbole</Table.th>
              <Table.th></Table.th>
            </tr>
          }
        >
          {devises?.map((Devise) => (
            <tr key={Devise.id}>
              <Table.td>{Devise.design} </Table.td>
              <Table.td>{Devise.code_iso} </Table.td>
              <Table.td>{Devise.symbole} </Table.td>
              <Table.td>
              <MitemsRef  
                        archive={() => {
                          //@ts-ignore
                          archive.current(Devise.id, Devise.design);
                        }}
                        /*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
                        del={() => {
                          //@ts-ignore
                          del.current(Devise.id, Devise.design);
                        }}
                        obj={Devise}
                        update={() => {
                                   //@ts-ignore
                             refCom.current(Devise, false);
                        }} />
              </Table.td>
            </tr>
          ))}
        </Table>

        <Pagin
          load={loadPage}
          max={devises?.length}
          visible={devises?.length > 0}
        />
      </Section>
    </>
  );
}

export default ListDeviseManager;
