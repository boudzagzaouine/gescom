import { BriefcaseIcon, ClipboardListIcon } from "@heroicons/react/solid";
import { style_icon, style_span } from "tools/constStyle";
import ListCommandes from "./ListCommandes";
import {
  ListFournisseursProps,
  ListMatierePremiereProps,
  MenuNavTabs,
} from "widgets/TypeWidgets";
import ListMatierePremiere from "./ListMatierePremiere";
import NavTabs from "widgets/NavTabs";
import NavTabsHeight from "widgets/NavTabsHeight";

const ListCommandeFournisseur = ({ fournisseur }: ListFournisseursProps) => {
  //
  //
  const commandes: MenuNavTabs[] = [
    {
      id: 1,
      name: (
        <>
          <BriefcaseIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Commandes Fournisseurs</span>
        </>
      ),
      featured: <ListCommandes fournisseur={fournisseur} />,
    },
    {
      id: 2,
      name: (
        <>
          <ClipboardListIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Matiére Premiére</span>
        </>
      ),
      featured: <ListMatierePremiere fournisseur={fournisseur} />,
    },
  ];
  return (
    <>
      <NavTabs tab={commandes} />
    </>
  );
};

export default ListCommandeFournisseur;
