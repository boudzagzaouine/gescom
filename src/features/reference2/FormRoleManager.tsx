import { useAddRoleMutation, useEditRoleMutation } from "config/rtk/rtkRole";
import React, { useEffect, Ref, useState, forwardRef } from "react";
import { REQUEST_EDIT, REQUEST_SAVE } from "tools/consts";
import { Role } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import ModalS from "widgets/ModalS";
import Section from "widgets/Section";
type FormRoleManagerProp = {
  save: () => void;
  edit: () => void;
  refetch: () => void;
  Role: Role;
  disable: boolean;
};
const FormRoleManager = (
  { save, edit, refetch, Role, disable }: FormRoleManagerProp,
  ref: Ref<void>
) => {
  const [disabled, setDisabled] = useState(disable);
  const [role0, setRole0] = useState(Role);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = role0.id == "" ? save : edit;
  const openModal = (d: Role, disable: boolean) => {
    setRole0(d);
    setShowModal(true);
    setDisabled(disable);
  };
  const close = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  }, []);
  return (
    <ModalS
      show={showModal}
      title={role0.id == "" ? "Nouveau Rôle" : "Modifier Rôle"}
      format={5}
      close={close}
    >
      <Form defaultValues={role0} onSubmit={onSubmit}>
        <div className="float-left w-full">
          <Field label="Désignation" name="design" disabled={disabled} />
          <fieldset className="border border-[#ddd]/80 p-5 rounded-md">
            <legend className="p-5">Fonctionnalités</legend>
            <div className="float-left w-full">
              <div className="float-left w-1/2">
                <div>
                  <input
                    id="gestions_des_clients"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions_des_clients"
                    className="font-medium text-gray-700"
                  >
                    Gestion Clients
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression_clients"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression_clients"
                    className="font-medium text-gray-700"
                  >
                    Suppression client
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression_commande_clients"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression_commande_clients"
                    className="font-medium text-gray-700"
                  >
                    Suppression commande client
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="gestions des fournisseur"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions des fournisseur"
                    className="font-medium text-gray-700"
                  >
                    Gestion Fournisseurs
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression fournisseur"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression fournisseur"
                    className="font-medium text-gray-700"
                  >
                    Suppression fournisseur
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression commande  fournisseur"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression commande  fournisseur"
                    className="font-medium text-gray-700"
                  >
                    Suppression commande fournisseur
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="gestions d'achats"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions d'achats"
                    className="font-medium text-gray-700"
                  >
                    Gestion Achats
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression bon d'achats"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression bon d'achats"
                    className="font-medium text-gray-700"
                  >
                    Suppression bon d'achats
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression bon de retours"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression bon de retours"
                    className="font-medium text-gray-700"
                  >
                    Suppression bon de retours
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="gestions des production"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions des production"
                    className="font-medium text-gray-700"
                  >
                    Gestion Productions
                  </label>
                </div>

                <div className="ml-8">
                  <input
                    id="supression fiche de production"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression fiche de production"
                    className="font-medium text-gray-700"
                  >
                    Suppression fiche production
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression article"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression article"
                    className="font-medium text-gray-700"
                  >
                    Suppression Article
                  </label>
                </div>
              </div>

              <div className="float-left w-1/2">
                <div className="mt-4">
                  <input
                    id="gestions des dums et decharge"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions des dums et decharge"
                    className="font-medium text-gray-700"
                  >
                    Gestion Dums & Décharges
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression dums"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression dums"
                    className="font-medium text-gray-700"
                  >
                    Suppression dum
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression decharge"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression decharge"
                    className="font-medium text-gray-700"
                  >
                    Suppression décharge
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="gestions des colissage"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions des colissage"
                    className="font-medium text-gray-700"
                  >
                    Gestion Colisages
                  </label>
                </div>

                <div className="ml-8">
                  <input
                    id="supression de fiche colissage"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression de fiche colissage"
                    className="font-medium text-gray-700"
                  >
                    Suppression fiche colisage
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="vente et facturation"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="vente et facturation"
                    className="font-medium text-gray-700"
                  >
                    Ventes et facturation
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression de facturation"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression de facturation"
                    className="font-medium text-gray-700"
                  >
                    Supression Facture
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="gestions des utilisateurs"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions des utilisateurs"
                    className="font-medium text-gray-700"
                  >
                    Gestion Utilisateurs
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression de utilisateur"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression de utilisateur"
                    className="font-medium text-gray-700"
                  >
                    Suppression utilisateur
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    id="supression de utilisateur"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="supression de utilisateur"
                    className="font-medium text-gray-700"
                  >
                    Suppression rôle
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="gestions des table"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="gestions des table"
                    className="font-medium text-gray-700"
                  >
                    Gestion des Tables
                  </label>
                </div>
                <div className="mt-4">
                  <input
                    id="Editions des En-tete"
                    nombre-colonnes="2"
                    type="checkbox"
                    className="focus:ring-indigo-500 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="Editions des En-tete"
                    className="font-medium text-gray-700"
                  >
                    Edition des en-têtes
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className=" mt-5 b-ajust-r">
          <Bsave
            className="float-right"
            onClick={() => {
              setTimeout(() => {
                refetch();
                close();
              }, 600);
            }}
          />
          {role0.id == "" && (
            <BsavEndNew
              className="ml-1 mr-2"
              onClick={() => {
                setTimeout(() => {
                  refetch();
                }, 600);
              }}
            />
          )}
        </div>
      </Form>
      <Bcancel
        className="float-right mt-5 b-ajust"
        onClick={() => {
          close();
        }}
      />
    </ModalS>
  );
};

export default forwardRef(FormRoleManager);
