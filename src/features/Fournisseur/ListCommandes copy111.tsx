import { DocumentAddIcon } from "@heroicons/react/solid";
import { useFetchCommandesFournisseurByIdFournisseurQuery } from "config/rtk";
import {
  OpenCommandesFournisseurJoinProp,
  openCommandesFournisseursByFounisseur,
} from "config/rtk/rtkFournisseur";
import { useRef, useState } from "react";
import { cf0, CommandeFournisseur, getCf0 } from "tools/types";
import Bcyan from "widgets/Bcyan";
import Table from "widgets/Table";
import { ListFournisseursProps } from "widgets/TypeWidgets";
import FormCommandes from "./FormCommandes111";
//@ts-ignore
import dateFormat from "dateformat";
import { DateFormat } from "tools/Methodes";
import Bedit from "widgets/Bedit";
const ListCommandes = ({ fournisseur }: ListFournisseursProps) => {
  const commandesFournisseursByFounisseurOpen: OpenCommandesFournisseurJoinProp =
    openCommandesFournisseursByFounisseur(fournisseur.id);
  const commandesFournisseurs: CommandeFournisseur[] =
    commandesFournisseursByFounisseurOpen.data;
  const refetch = commandesFournisseursByFounisseurOpen.refetch;
  const add = commandesFournisseursByFounisseurOpen.save;
  const edit = commandesFournisseursByFounisseurOpen.edit;
  let cf1: CommandeFournisseur = cf0;
  cf1.idFournisseur = fournisseur.id;
  const refCom = useRef(null);
  return (
    <>
      <Bcyan
        className="float-left mt-2"
        onClick={() => {
          //@ts-ignore
          refCom.current(cf1, fournisseur);
        }}
      >
        Nouvelle Commande
      </Bcyan>
      <FormCommandes
        command={cf1}
        fournisseur={fournisseur}
        fournisseurs={[]}
        add={add}
        edit={edit}
        refetchList={refetch}
        ref={refCom}
      />
      <Table
        className="tab-list float-left w-full mt-2"
        thead={
          <tr>
            <Table.th>N° Commande</Table.th>
            <Table.th>Fournisseur</Table.th>
            <Table.th>Date de Commande</Table.th>
            <Table.th>Date Livraison</Table.th>
            <Table.th>Origine</Table.th>
            <Table.th>Montant</Table.th>
            <Table.th></Table.th>
          </tr>
        }
      >
        {commandesFournisseurs?.map((commande: CommandeFournisseur) => (
          <tr key={commande.id}>
            <Table.td>{commande.id}</Table.td>
            <Table.td>{fournisseur.design}</Table.td>
            <Table.td>{DateFormat(commande.dateCommande)}</Table.td>
            <Table.td>{DateFormat(commande.dateLivraison)}</Table.td>
            <Table.td>-</Table.td>
            <Table.td>{commande.montant}</Table.td>
            <Table.td>
              {" "}
              <Bedit
                onClick={() => {
                  //@ts-ignore
                  refCom.current(commande, fournisseur);
                }}
              />{" "}
            </Table.td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default ListCommandes;
