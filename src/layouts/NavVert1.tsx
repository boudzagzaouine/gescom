import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { forwardRef, Ref, useEffect, useRef } from "react";
import {
  CLIENT_MANAGER,
  PURCHASE_MANAGER,
  VENDOR_MANAGER,
  BUREAU_DOUANE,
  DECLARANT_GES,
  FAMILLE_ARTICLE,
  FAMILLE_MATIERE_PREMIERE,
  INCOTERM_GES,
  MODE_PAYEMENT,
  REGIME_DOUANIER,
  UNIT_MEASURE,
  DEVISE_MANAGER,
  DOCUMENT_MANAGER,
  PAYS_MANAGER,
  ROLE_MANAGER,
  TRANSPORTEUR_MANAGER,
  TYPE_MANAGER,
  VILLE_MANAGER,
  USER_MANAGER,
} from "tools/consts";
import Icon from "widgets/Icon";
type NavVertProps = {
  updateSel: (s: number) => void;
};
const NavVertExemple = ({ updateSel }: NavVertProps) => {
  const route = useRouter();
  const [sous, setSous] = useState(-1);
  const prev = useRef(-1);
  console.log("route = " + JSON.stringify(route));
  useEffect(() => {
    prev.current = sous;
  }, []);

  const menuVert = [
    {
      id: 7,
      icon: "home",
      text: "Acceuil",
      link: "/",
      active: route.pathname == "/",
      sous: [],
    },
    {
      id: CLIENT_MANAGER,
      icon: "user-circle",
      text: "Gestion de Clients",
      link: "/manager/client/ClientManager",
      active:
        route.pathname == "/manager/client/ClientManager" ||
        route.pathname == "/manager/client/CommandeClientManager" ||
        route.pathname == "/manager/client/SoldeCommandeClientManager",
      sous: [],
    },
    {
      id: VENDOR_MANAGER,
      icon: "truck",
      text: "Gestion de Fournisseurs",
      link: "/manager/vendor/VendorManager",
      active:
        route.pathname == "/manager/vendor/VendorManager" ||
        route.pathname == "/manager/vendor/CommandeVendor" ||
        route.pathname == "/manager/vendor/RawMaterielManager" ||
        route.pathname == "/manager/vendor/CommandeVendorManager",
      sous: [],
    },
    /* {id:USER_MANAGER,
        icon: "user-circle",
        text: "Gestion Utilisateur",
        link: "/gestionutilisateur/GestionUtilisateur",
        active: route.pathname == "/gestionutilisateur/GestionUtilisateur",
        sous:[]
      }, */
    {
      id: PURCHASE_MANAGER,
      icon: "shopping-bag",
      text: "Gestion d'achats",
      link: "/manager/purchase/Reception",
      active:
        route.pathname == "/manager/purchase/Reception" ||
        route.pathname == "/manager/purchase/RightOfReturn" ||
        route.pathname == "/manager/purchase/StockStatus" ||
        route.pathname == "/manager/purchase/InputOutputHistory",
      sous: [],
    },
    /* {
        id: 11,
        icon: "home",
        text: "test",
        link: "/Test",
        active: route.pathname == "/Test",
        sous: []
      },
      {
        id: 12,
        icon: "home",
        text: "liste des icons",
        link: "/documentation/ListIcons",
        active: route.pathname == "/ee",
        sous: []
      }, */
    {
      id: 13,
      icon: "table",
      text: "Gestion des Tables",
      link: "/reference/unitMeasure/NewUnitMeasure",
      active:
        route.pathname == "/reference/unitMeasure/NewUnitMeasure" ||
        route.pathname == "/reference/article/NewArticle" ||
        route.pathname == "/reference/rawMaterial/NewRawMaterial" ||
        route.pathname == "/reference/bureauDouane/NewBureauDouane" ||
        route.pathname == "/reference/regimeDouanier/NewRegimeDouanier" ||
        route.pathname == "/reference/payementMode/NewPayementMode" ||
        route.pathname == "/reference/incoterm/NewIncoterm" ||
        route.pathname == "/reference/declarant/NewDeclarant" ||
        route.pathname == "/reference2/Transporteur" ||
        route.pathname == "/reference2/Document" ||
        route.pathname == "/reference2/Devise" ||
        route.pathname == "/reference2/Pays" ||
        route.pathname == "/reference2/Ville" ||
        route.pathname == "/reference2/Type" ||
        route.pathname == "/reference2/Role",
      sous: [
        {
          id: UNIT_MEASURE,
          text: "Unités de Mesure",
          link: "/reference/unitMeasure/NewUnitMeasure",
          active: route.pathname == "/reference/unitMeasure/NewUnitMeasure",
        },
        {
          id: FAMILLE_ARTICLE,
          text: "Familles Article",
          link: "/reference/article/NewArticle",
          active: route.pathname == "/reference/article/NewArticle",
        },
        {
          id: FAMILLE_MATIERE_PREMIERE,
          text: "Familles Matière première",
          link: "/reference/rawMaterial/NewRawMaterial",
          active: route.pathname == "/reference/rawMaterial/NewRawMaterial",
        },
        {
          id: BUREAU_DOUANE,
          text: "Bureaux de Douane",
          link: "/reference/bureauDouane/NewBureauDouane",
          active: route.pathname == "/reference/bureauDouane/NewBureauDouane",
        },
        {
          id: REGIME_DOUANIER,
          text: "Régimes Douaniers",
          link: "/reference/regimeDouanier/NewRegimeDouanier",
          active:
            route.pathname == "/reference/regimeDouanier/NewRegimeDouanier",
        },
        {
          id: MODE_PAYEMENT,
          text: "Mode De Réglement",
          link: "/reference/payementMode/NewPayementMode",
          active: route.pathname == "/reference/payementMode/NewPayementMode",
        },
        {
          id: INCOTERM_GES,
          text: "Incoterms",
          link: "/reference/incoterm/NewIncoterm",
          active: route.pathname == "/reference/incoterm/NewIncoterm",
        },
        {
          id: DECLARANT_GES,
          text: "Déclarants",
          link: "/reference/declarant/NewDeclarant",
          active: route.pathname == "/reference/declarant/NewDeclarant",
        },
        {
          id: TRANSPORTEUR_MANAGER,
          text: "Transporteurs",
          link: "/reference2/Transporteur",
          active: route.pathname == "/reference2/Transporteur",
        },
        {
          id: DOCUMENT_MANAGER,
          text: "Documents",
          link: "/reference2/Document",
          active: route.pathname == "/reference2/Document",
        },
        {
          id: DEVISE_MANAGER,
          text: "Devises",
          link: "/reference2/Devise",
          active: route.pathname == "/reference2/Devise",
        },
        {
          id: PAYS_MANAGER,
          text: "Pays",
          link: "/reference2/Pays",
          active: route.pathname == "/reference2/Pays",
        },
        {
          id: VILLE_MANAGER,
          text: "Villes",
          link: "/reference2/Ville",
          active: route.pathname == "/reference2/Ville",
        },
        {
          id: TYPE_MANAGER,
          text: "Types En-Têtes",
          link: "/reference2/Type",
          active: route.pathname == "/reference2/Type",
        },
        {
          id: ROLE_MANAGER,
          text: "Rôles",
          link: "/reference2/Role",
          active: route.pathname == "/reference2/Role",
        },
      ],
    },
  ];
  useEffect(() => {});
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow bg-[#2B5173] pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="pl-10 bg-opacity-10 text-[#fff] text-base w-full float-left py-2.5">
              Gestion Commercial
            </h2>
          </div>
          <nav
            className="mt-5 flex-1 flex flex-col divide-y bg-[#2B5173] overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="px-2 space-y-1">
              {menuVert.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={classNames(
                    item.active
                      ? "bg-cyan-800 text-white"
                      : "text-cyan-100 hover:text-white hover:bg-[#233f575d]",
                    "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span className="icon mr-4 flex-shrink-0 h-6 w-6 text-cyan-200">
                    <Icon i={item.icon} cl="" />
                  </span>

                  {item.text}

                  {item.active && (
                    <ul className="ml-20 list-[disclosure-closed] mt-8">
                      {item.sous.map((sItem) => (
                        <li
                          key={sItem.id}
                          className={
                            "cursor-pointer text-sm text-[#fff] w-full float-left py-2.5 " +
                            (sItem.active
                              ? "border-l-2 border-white bg-opacity-10 bg-[#000]"
                              : "border-l-0 bg-transparent")
                          }
                          onClick={() => updateSel(sItem.id)}
                        >
                          <Link href={sItem.link}>
                            <a>
                              <span className="text">{sItem.text}</span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </a>
              ))}
            </div>
          </nav>
          <img
            className="pl-12 w-5/6 flex justify-center py-5 float-left"
            src="/images/logo-4.png"
            alt="Easywire logo"
          />
        </div>
      </div>
    </>
  );
};
export default NavVertExemple;
