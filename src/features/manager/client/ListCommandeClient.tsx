import {
  BriefcaseIcon,
  ClipboardListIcon,
  TagIcon,
  TruckIcon,
} from "@heroicons/react/solid";
import React from "react";
import { style_icon, style_span } from "tools/constStyle";
import { Client } from "tools/types";
import NavTabs from "widgets/NavTabs";
import { MenuNavTabs } from "widgets/TypeWidgets";
import AdressLivraisons from "./ListAdressLivraisons";
import ListArticleClients from "./ListArticleClients";
import ListCommandes from "./ListCommandes";
import SoldesCommandes from "./SoldesCommandes";
type ListCommandeClientProps = {
  client: Client;
  refetch: () => void;
};
const ListCommandeClient = ({ client, refetch }: ListCommandeClientProps) => {
  //
  //
  const commanndes: MenuNavTabs[] = [
    {
      id: 1,
      name: (
        <>
          <BriefcaseIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Commandes Clients</span>
        </>
      ),
      featured: <ListCommandes client={client} refetchParent={refetch} />,
    },
    {
      id: 2,
      name: (
        <>
          <ClipboardListIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Soldes Commandes</span>
        </>
      ),
      featured: <SoldesCommandes idClient={client.id} />,
    },
    {
      id: 3,
      name: (
        <>
          <TagIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Articles Clients</span>
        </>
      ),
      featured: <ListArticleClients client={client} refetchParent={refetch} />,
    },
    {
      id: 4,
      name: (
        <>
          <TruckIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Adresses de livraisons</span>
        </>
      ),
      featured: (
        <AdressLivraisons idClient={client.id} refetchParent={refetch} />
      ),
    },
  ];
  return (
    <>
      <NavTabs tab={commanndes} />
    </>
  );
};

export default ListCommandeClient;
