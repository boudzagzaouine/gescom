import { openPays, OpenPaysProp } from "config/rtk/rtkPays";
import React, { useRef, useState } from "react";
import { ARCHIVE, DEL, RESTORE } from "tools/consts";
import { Pays, pays0, PaysJson } from "tools/types";
import Action from "widgets/Action";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import MitemsRef from "widgets/MitemsRef";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
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

  return (
    <>
      <Section>
      <Action
            id=""
            path="pays"
            design=""
            type="Pays"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="pays"
            design=""
            type="Pays"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="pays"
            design=""
            type="Pays"
            ref={restore}
            action={RESTORE}
          />
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
              <MitemsRef  
                        archive={() => {
                          //@ts-ignore
                          archive.current(Pays.id, Pays.design);
                        }}
                        /*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
                        del={() => {
                          //@ts-ignore
                          del.current(Pays.id, Pays.design);
                        }}
                        obj={Pays}
                        update={() => {
                                   //@ts-ignore
                             refCom.current(Pays, false);
                        }} />
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
