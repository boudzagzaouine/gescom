import {
  ArchiveIcon,
  ClipboardListIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import {
  OpenFournisseurProp,
  openFournisseurs,
  OpenMatierePremiereProp,
  openMatierePremieresPagination,
} from "config/rtk/rtkFournisseur";
import { useRef, useState } from "react";
import { getFournisseur } from "tools/Methodes";
import { getMp0, mp0, f0, MatierePremiere, Fournisseur } from "tools/types";
import { Button } from "widgets";
import Bcyanxl from "widgets/Bcyanxl";
import Icon from "widgets/Icon";
import Pagin from "widgets/Pagin";
import Section from "widgets/Section";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import FormMatierePremiere from "./FormMatierePremiere111";

const ListAllMatierePremiere = () => {
  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetch();
  };
  const matierePremieresOpen: OpenMatierePremiereProp =
    openMatierePremieresPagination(page);
  const matierePremieres: MatierePremiere[] = matierePremieresOpen.data.content;
  const refetch = matierePremieresOpen.refetch;
  const fournisseursOpen: OpenFournisseurProp = openFournisseurs();
  const fournisseurs: Fournisseur[] = fournisseursOpen.data.content;
  const refCom = useRef(null);
  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const menu = (
    matiere: MatierePremiere,
    fournisseur: Fournisseur
  ): MenuItems[] => {
    return [
      {
        icon: (
          <ClipboardListIcon
            className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
            aria-hidden="true"
          />
        ),
        text: "Détail",
        action: () => {
          //@ts-ignore
          refCom.current(matiere, true, fournisseur);
        },
      },
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
          refCom.current(matiere, false, fournisseur);
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
          del.current(matiere.id);
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
          archive.current(matiere.id);
        },
      },
      // {
      //   icon: (
      //     <ReplyIcon
      //       className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
      //       aria-hidden="true"
      //     />
      //   ),
      //   text: "Restorer",
      //   action: () => {
      //     //@ts-ignore
      //     restore.current(matiere.id);
      //   },
      // },
    ];
  };
  return (
    <Section>
      <div className="float-left w-full">
        <Bcyanxl
          className="float-left mt-2"
          onClick={() => {
            //@ts-ignore
            refCom.current(mp0);
          }}
        >
          Nouvelle Matière première
        </Bcyanxl>
        <div className="float-right">
          <input
            type="text"
            className="py-3 border outline-[#ddd] border-[#ddd] float-right border-l-0 rounded-r-lg w-96"
            placeholder="Recherche"
          />
          <Button className="bg-white float-right border border-[#ddd] border-r-0 p-3 rounded-l-lg">
            <Icon i="search" cl="" />
          </Button>
        </div>
      </div>
      <FormMatierePremiere
        Matierep={mp0}
        disabled={false}
        ref={refCom}
        refetch={refetch}
        fournisseurs={fournisseurs}
        fournisseur={f0}
      />
      <Table
        className="tab-list float-left w-full mt-2"
        thead={
          <tr>
            <Table.th>Code</Table.th>
            <Table.th>Désignation</Table.th>
            <Table.th>Prix</Table.th>
            <Table.th>Fournisseur</Table.th>
            <Table.th>Famille</Table.th>
            <Table.th>Origine</Table.th>
            <Table.th></Table.th>
          </tr>
        }
      >
        {matierePremieres?.map((matiere) => (
          <tr key={matiere.id}>
            <Table.td>{matiere.id}</Table.td>
            <Table.td>{matiere.design}</Table.td>
            <Table.td>{matiere.prix}</Table.td>
            <Table.td>
              {getFournisseur(matiere.idFournisseur, fournisseurs).design}
            </Table.td>
            <Table.td>{matiere.familleMatierePremiere}</Table.td>
            <Table.td>{matiere.origine}</Table.td>
            <Table.td>
              {/* <Mitems
                menu={menu(
                  matiere,
                  getFournisseur(matiere.idFournisseur, fournisseurs)
                )}
              /> */}
            </Table.td>
          </tr>
        ))}
      </Table>
      <Pagin load={loadPage} max={300} visible={true} />
    </Section>
  );
};
export default ListAllMatierePremiere;
