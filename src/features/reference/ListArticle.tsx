import Action from 'widgets/Action';
import { Button } from 'widgets/Button';
import Icon from 'widgets/Icon';
import MitemsRef from 'widgets/MitemsRef';
import Pagin from 'widgets/Pagin';
import Section from 'widgets/Section';
import Table from 'widgets/Table';
import React, { useRef, useState } from 'react';
import { ARCHIVE, DEL, RESTORE } from 'tools/consts';
import { Article, article0, ArticleJson } from "tools/types";
import { OpenArticleProp, openArticles } from 'config/rtk/rtkArticle';
import FormArticle from './FormArticle';
import Bcyanxl from 'widgets/Bcyanxl';

function ListeArticleManager(){
    const [page, setPage] = useState(0);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
	};
    const articlesToOpen: OpenArticleProp = openArticles(page);
    const articleJson: ArticleJson = articlesToOpen.data;
    const articles: Article[] = articleJson.content;
    const refetch: () => void = articlesToOpen.refetch;
    const save = articlesToOpen.save;
	const edit = articlesToOpen.edit;
	const refCom = useRef(null);
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);

	return (
		<>
			<Section>
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={restore}
            action={RESTORE}
          />
          <h1>Familles Article</h1>
          <div className='float-left w-full'>
					<Bcyanxl
						className='float-left'
						onClick={() => {
							//@ts-ignore
							refCom.current(article0, false);
						}}>
						Nouvelle Famille Article
					</Bcyanxl>
					<FormArticle
						refetch={refetch}
						save={save}
						edit={edit}
						article={article0}
						disable={false}
						ref={refCom}
					/>
					<div className='float-right'>
						<Button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg'>
							<Icon i='search' cl='' />
						</Button>
						<input
							type='text'
							className='py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96'
						/>
					</div>
				</div>
          <Table
          className='tab-list float-left w-full mt-8'
          thead={
              <tr>
                  <Table.th>Désignation</Table.th>
                  <Table.th>Nomenclature</Table.th>
                  <Table.th>Taux de perte</Table.th>
                  <Table.th></Table.th>
              </tr>
            }>
            {articles?.map((article: Article) => {
                return (
                  <tr key={article.id}>
                    <Table.td>{article.design}</Table.td>
                    <Table.td>{article.nomenclature}</Table.td>
                    <Table.td>
                      {article.tauxPertes}
                      {"%"}
                    </Table.td>

                    <Table.td className="cursor-pointer">
                      <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(article.id, article.design);
                        }}
                        /*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
                        del={() => {
                          //@ts-ignore
                          del.current(article.id, article.design);
                        }}
                        obj={article}
                        update={() => {
						//@ts-ignore
						refCom.current(article, false);
                        }}
                      />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin
					load={loadPage}
					max={articles?.length}
					visible={articles?.length > 0}
				/>
		</Section>
		</>
	);
}
export default ListeArticleManager;
