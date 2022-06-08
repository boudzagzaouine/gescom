import {
  useAddLigneDeCommandeMutation,
  useEditLigneDeCommandeMutation,
  useFetchLigneDeCommandeByIdCommandeFournisseurQuery,
  useFetchLigneDeCommandeByIdMatierePremiereQuery,
} from "config/rtk";
import {
  OpenLigneDeCommandeByJoinProp,
  openLigneDeCommandesByFournisseur,
} from "config/rtk/rtkFournisseur";
import { useState } from "react";
import { lc0, LigneDeCommande } from "tools/types";
import Bedit from "widgets/Bedit";
import Table from "widgets/Table";
import FormulaireLigneDeCommande from "./FormulaireLigneDeCommande";
const style_add_line = "bg-[#dfdfdf] cursor-pointer";
type LigneDeCommandeProps = {
  idCommandeFournisseur: string;
  idfournisseur: string;
};
const ListLigneDeCommande = ({
  idCommandeFournisseur,
  idfournisseur,
}: LigneDeCommandeProps) => {
  //const { data = [], isFetching, refetch } = useFetchLigneDeCommandeByIdCommandeFournisseurQuery(idCommandeFournisseur);
  const ligneDeCommandesOpen: OpenLigneDeCommandeByJoinProp =
    openLigneDeCommandesByFournisseur(idCommandeFournisseur);
  const ligneDeCommandes: LigneDeCommande[] = ligneDeCommandesOpen.data;
  const refetch = ligneDeCommandesOpen.refetch;
  const save = ligneDeCommandesOpen.save;
  const edit = ligneDeCommandesOpen.edit;
  let lc1: LigneDeCommande = lc0;
  lc1.idCommandeFournisseur = idCommandeFournisseur;
  const [selectedIdCommande, setSelectedIdCommande] = useState("new");
  const [formArt, setFormArt] = useState(false);
  const close = () => {
    setFormArt(false);
    setSelectedIdCommande("new");
  };
  const open = (id: string) => {
    setFormArt(true);
    setSelectedIdCommande(id);
  };
  return (
    <div>
      <Table
        className="tab-list float-left w-full mt-8"
        thead={
          <tr>
            <Table.th>Désignation</Table.th>
            <Table.th>Quantité</Table.th>
            <Table.th>Prix unitaire</Table.th>
            <Table.th></Table.th>
          </tr>
        }
      >
        {ligneDeCommandes?.map((ligneDeCommande) => (
          <>
            <tr key={ligneDeCommande.id}>
              <Table.td>{ligneDeCommande.design} </Table.td>
              <Table.td>{ligneDeCommande.quantite}</Table.td>
              <Table.td>{ligneDeCommande.prix}</Table.td>
              <Table.td>
                <Bedit
                  onClick={() => {
                    open(ligneDeCommande.id);
                  }}
                />
              </Table.td>
            </tr>
            {selectedIdCommande == ligneDeCommande.id && formArt && (
              <FormulaireLigneDeCommande
                idfournisseur={idfournisseur}
                ligneCommande={ligneDeCommande}
                close={close}
                saveArticle={edit}
                refetch={refetch}
              />
            )}
          </>
        ))}
        {selectedIdCommande == "new" && formArt && (
          <FormulaireLigneDeCommande
            idfournisseur={idfournisseur}
            ligneCommande={lc1}
            close={close}
            saveArticle={save}
            refetch={refetch}
          />
        )}
        {!formArt && (
          <tr
            onClick={() => {
              open("new");
            }}
          >
            <Table.td className={style_add_line}>Ajouter une ligne</Table.td>
            <Table.td className={style_add_line}></Table.td>
            <Table.td className={style_add_line}></Table.td>
            <Table.td className={style_add_line}></Table.td>
          </tr>
        )}
      </Table>
    </div>
  );
};
export default ListLigneDeCommande;
