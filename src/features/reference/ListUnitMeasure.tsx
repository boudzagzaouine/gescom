import { useRef, useState } from "react";
import {
    OpenUnitMeasureProp,
    openUnitMeasures,
  } from "config/rtk/rtkUnitMeasure";
import { UnitMeasure, unitMeasure0, UnitMeasureJson } from "tools/types";
import Section from "widgets/Section";
import Action from "widgets/Action";
import { ARCHIVE, DEL, RESTORE } from 'tools/consts';
import Bcyan from "widgets/Bcyan";
import { Button } from "widgets";
import Icon from "widgets/Icon";
import FormUnitMeasure from "./FormUnitMeasure";
import Table from "widgets/Table";
import MitemsRef from "widgets/MitemsRef";
import Pagin from "widgets/Pagin";
import Bcyanxl from "widgets/Bcyanxl";

function ListUnitMeasureManager(){
    const [page, setPage] = useState(0);
	const loadPage = (p: number) => {
		setPage(p);
		refetch();
    };
    
    const unitMeasuresToOpen : OpenUnitMeasureProp=openUnitMeasures(page);
    const unitMeasureJson: UnitMeasureJson=unitMeasuresToOpen.data;
    const unitMeasures: UnitMeasure[]=unitMeasureJson.content;
    const refetch:()=>void =unitMeasuresToOpen.refetch;
    const save=unitMeasuresToOpen.save;
    const edit=unitMeasuresToOpen.edit;
    const refCom=useRef(null);
	const del = useRef(null);
	const archive = useRef(null);
	const restore = useRef(null);
    return (
		<>
		<Section>
            <Action
            id=""
            path="unitMeasures"
            design=""
            type="Unité de Mesure"
            ref={del}
            action={DEL}
          />
          <Action
            id=""
            path="unitMeasures"
            design=""
            type="Unité de Mesure"
            ref={archive}
            action={ARCHIVE}
          />
          <Action
            id=""
            path="unitMeasures"
            design=""
            type="Unité de Mesure"
            ref={restore}
            action={RESTORE}
          />
          <h1>Unités de Mesure</h1>
          <div className='float-left w-full'>
					<Bcyanxl
						className='float-left'
						onClick={() => {
							//@ts-ignore
							refCom.current(unitMeasure0, false);
						}}>
						Nouvelle Unité de Mesure
					</Bcyanxl>
                    <FormUnitMeasure
						refetch={refetch}
						save={save}
						edit={edit}
						unitMeasure={unitMeasure0}
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
                  <Table.th>Symbole</Table.th>
                  <Table.th>Décimal</Table.th>
                  <Table.th></Table.th>
              </tr>
            }>
            {
              unitMeasures?.map((unitMeasure: UnitMeasure) => {
                return (
                  <tr key={unitMeasure.id}>
                    <Table.td>{unitMeasure.design}</Table.td>
                    <Table.td>{unitMeasure.symbole}</Table.td>
                    <Table.td>{unitMeasure.decimal}</Table.td>
                    <Table.td className="cursor-pointer">
                      <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(unitMeasure.id, unitMeasure.design);
                        }}
                        /*   restore={() => {
                            //@ts-ignore
                            restore.current(client.id,client.design);
                          }} */
                        del={() => {
                          //@ts-ignore
                          del.current(unitMeasure.id, unitMeasure.design);
                        }}
                        obj={unitMeasure}
                        update={() => {
					    //@ts-ignore
						refCom.current(unitMeasure, false);
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
					max={unitMeasures?.length}
					visible={unitMeasures?.length > 0}
          />
          </Section>
          </>
      );
  }
  export default ListUnitMeasureManager;