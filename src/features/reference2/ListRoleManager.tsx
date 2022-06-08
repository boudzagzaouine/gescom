import { OpenRoleProp, openRoles } from "config/rtk/rtkRole";
import React, { useRef, useState } from "react";
import { ARCHIVE, DEL, RESTORE } from "tools/consts";
import { r0, Role, RoleJson } from "tools/types";
import Action from "widgets/Action";
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets/Button";
import Icon from "widgets/Icon";
import Mitems from "widgets/Mitems";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormRoleManager from "./FormRoleManager";
function ListRoleManager() {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };

  const rolesToOpen: OpenRoleProp = openRoles(page);
  const roleJson: RoleJson = rolesToOpen.data;
  const roles: Role[] = roleJson.content;
  const refetch: () => void = rolesToOpen.refetch;
  const save = rolesToOpen.save;
  const edit = rolesToOpen.edit;
  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  return (
    <>
      <Section>
        <Action
          id=""
          path="roles"
          design=""
          type="Rôle"
          ref={del}
          action={DEL}
        />
        <Action
          id=""
          path="roles"
          design=""
          type="Rôle"
          ref={archive}
          action={ARCHIVE}
        />
        <Action
          id=""
          path="roles"
          design=""
          type="Rôle"
          ref={restore}
          action={RESTORE}
        />
        <h1>Rôles</h1>
        <div className="float-left w-full">
          <Bcyan
            className="float-left"
            onClick={() => {
              //@ts-ignore
              refCom.current(r0, false);
            }}
          >
            Nouveau Rôle
          </Bcyan>
          <FormRoleManager
            refetch={refetch}
            save={save}
            edit={edit}
            Role={r0}
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
              <Table.th>Nombre des utilisateurs</Table.th>
              <Table.th></Table.th>
            </tr>
          }
        >
          {roles?.map((Role) => (
            <tr key={Role.id}>
              <Table.td>
                <span>{Role.design}</span>
              </Table.td>
              <Table.td>
                <span>{Role.nbrUtilisateur}</span>
              </Table.td>

              <Table.td>
                <Mitems
                  archive={() => {
                    //@ts-ignore
                    archive.current(Role.id, Role.design);
                  }}
                  /*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
                  del={() => {
                    //@ts-ignore
                    del.current(Role.id, Role.design);
                  }}
                  edit={() => {
                    //@ts-ignore
                    refCom.current(Role, true);
                  }}
                  obj={Role}
                  update={() => {
                    //@ts-ignore
                    refCom.current(Role, false);
                  }}
                />
              </Table.td>
            </tr>
          ))}
        </Table>

        <Pagin
          load={loadPage}
          max={roles?.length}
          visible={roles?.length > 0}
        />
      </Section>
    </>
  );
}

export default ListRoleManager;
