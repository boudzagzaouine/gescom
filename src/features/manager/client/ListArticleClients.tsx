import { openArticles, OpenArticleProp } from "config/rtk/rtkArticle";
import {
  OpenArticleClientByClientProp,
  openArticleClientsByClient,
  useFetchArticleClientsByIdClientQuery,
} from "config/rtk/RtkArticleClient";
import {
  OpenFournisseurProp,
  openFournisseurs,
} from "config/rtk/rtkFournisseur";
import React, { useRef, useState } from "react";
import { getFamilleArticle } from "tools/Methodes";
import {
  Client,
  articleClient0,
  ArticleClient,
  Article,
  Fournisseur,
  getFournisseur,
} from "tools/types";
import Bcyan from "widgets/Bcyan";
import Bedit from "widgets/Bedit";
import Table from "widgets/Table";
import FormArticleClient from "./FormArticleClient";
//@ts-ignore
import dateFormat from "dateformat";
type ListArticleClientsProp = {
  client: Client;
  refetchParent: () => void;
};
const ListArticleClients = ({
  client,
  refetchParent,
}: ListArticleClientsProp) => {
  const articleClientsOpen: OpenArticleClientByClientProp =
    openArticleClientsByClient(client.id);
  const articlesClients: ArticleClient[] = articleClientsOpen.data;
  const refetch = articleClientsOpen.refetch;
  const add = articleClientsOpen.save;
  const edit = articleClientsOpen.edit;
  const articleClient1: ArticleClient = articleClient0;
  const familleArticleOpen: OpenArticleProp = openArticles();
  const familleArticles: Article[] = familleArticleOpen.data.content;
  const fournisseursOpen: OpenFournisseurProp = openFournisseurs();
  const fournisseurs: Fournisseur[] = fournisseursOpen.data.content;
  articleClient1.idClient = client.id;
  const refArticleClient = useRef(null);
  const refetchAll = () => {
    refetch();
    refetchParent();
  };
  return (
    <>
      <Bcyan
        className="float-left mt-2"
        onClick={() => {
          //@ts-ignore
          refArticleClient.current(articleClient1);
        }}
      >
        Nouvelle ArticleClient
      </Bcyan>
      <FormArticleClient
        articleclient={articleClient1}
        ref={refArticleClient}
        add={add}
        edit={edit}
        refetchList={refetchAll}
      />
      <Table
        className="tab-list float-left w-full mt-2"
        thead={
          <tr>
            <Table.th>Code Article</Table.th>
            <Table.th>design</Table.th>
            <Table.th>Poids</Table.th>
            <Table.th>Prix</Table.th>
            <Table.th>famille</Table.th>
            <Table.th>fournisseur</Table.th>
            <Table.th>Date</Table.th>
            <Table.th></Table.th>
          </tr>
        }
      >
        {articlesClients?.map((articleclient) => (
          <tr key={articleclient.id}>
            <Table.td>{articleclient.id}</Table.td>
            <Table.td>{articleclient.design}</Table.td>
            <Table.td>{articleclient.poid}</Table.td>
            <Table.td>{articleclient.prix}</Table.td>
            <Table.td>
              {
                getFamilleArticle(
                  articleclient.idFamilleArticle,
                  familleArticles
                )?.design
              }
            </Table.td>
            <Table.td>
              {
                getFournisseur(articleclient.idFournisseur, fournisseurs)
                  ?.design
              }
            </Table.td>
            <Table.td>{dateFormat(articleclient.date, "dd-mm-yyyy")}</Table.td>
            <Table.td>
              <Bedit
                className="float-left mt-2"
                onClick={() => {
                  //@ts-ignore
                  refArticleClient.current(articleclient);
                }}
              />
            </Table.td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default ListArticleClients;
