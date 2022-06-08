import { OpenTypeProp, openTypes } from "config/rtk/rtkType";
import React, { useRef, useState } from "react";
import { ARCHIVE, DEL, RESTORE } from "tools/consts";
import { Type, type0, TypeJson } from "tools/types";
import Action from "widgets/Action";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import MitemsRef from "widgets/MitemsRef";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
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
  
  return (
    <>
      <Section>
      <Action
            id=""
            path="types"
            design=""
            type="Type"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="types"
            design=""
            type="Type"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="types"
            design=""
            type="Type"
            ref={restore}
            action={RESTORE}
          />
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
              <MitemsRef  
                        archive={() => {
                          //@ts-ignore
                          archive.current(Type.id, Type.design);
                        }}
                        /*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
                        del={() => {
                          //@ts-ignore
                          del.current(Type.id, Type.design);
                        }}
                        obj={Type}
                        update={() => {
                                   //@ts-ignore
                             refCom.current(Type, false);
                        }} />
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
