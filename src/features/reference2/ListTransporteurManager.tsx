import {
  OpenTransporteurProp,
  openTransporteurs,
} from "config/rtk/rtkTransporteur";
import React, { useRef, useState } from "react";
import { ARCHIVE, DEL, RESTORE } from "tools/consts";
import { t0, Transporteur, TransporteurJson } from "tools/types";
import Action from "widgets/Action";
import Bcyanxl from "widgets/Bcyanxl";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import MitemsRef from "widgets/MitemsRef";
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

  return (
    <>
      <Section>
      <Action
            id=""
            path="transporteurs"
            design=""
            type="Transporteur"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="transporteurs"
            design=""
            type="Transporteur"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="transporteurs"
            design=""
            type="Transporteur"
            ref={restore}
            action={RESTORE}
          />
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
              <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(Transporteur.id, Transporteur.design);
                        }}
                        /*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
                        del={() => {
                          //@ts-ignore
                          del.current(Transporteur.id, Transporteur.design);
                        }}
                        obj={Transporteur}
                        update={() => {
                                   //@ts-ignore
                             refCom.current(Transporteur, false);
                        }} />
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
