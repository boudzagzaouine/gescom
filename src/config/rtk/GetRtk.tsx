import { IdsObject, IdsObjectJson } from 'tools/types';

import { openArticles } from './rtkArticle';
import { openBureauDouanes } from './rtkBureauDouane';
import { openDeclarants } from './rtkDeclarant';
import { openDevises } from './rtkDevise';
import { openDocuments } from './rtkDocument';
import { openIncoterms } from './rtkIncoterm';
import { openPayementModes } from './rtkPayementMode';
import { openpaysv } from './rtkPays';
import { openFamilleF } from './rtkRawMaterial';
import { openRegimeDouaniers } from './rtkRegimeDouanier';
import { openTransporteurs } from './rtkTransporteur';
import { openTypes } from './rtkType';
import { openUnitMeasures } from './rtkUnitMeasure';
import { openVilleD } from './rtkVille';

export type GetRtkProp<E extends IdsObject, J extends IdsObjectJson> = {
	data: J;
	tab: E[];
	isFetching: boolean;
	refetch: () => void;
	save: () => void;
	edit: () => void;
	isSuccess: boolean;
	isError: any;
	isLoading: any;
	isUninitialized: any;
	status: any;
	currentData: any;
	endpointName: any;
	error: any;
	fulfilledTimeStamp: any;
	originalArgs: any;
	requestId: any;
	startedTimeStamp: any;
};
export const GetRtk = (path: string) => {
	switch (path) {
		case "unitMeasures":
			return openUnitMeasures();
			break;
		case "articles":
			return openArticles();
			break;
		case "rawMaterials":
			return openFamilleF();
			break;
		case "bureauDouanes":
			return openBureauDouanes();
			break;
		case "regimeDouaniers":
			return openRegimeDouaniers();
			break;
		case "payementModes":
			return openPayementModes();
			break;

		case "incoterms":
			return openIncoterms();
			break;

		case "declarants":
			return openDeclarants();
			break;

		case "transporteurs":
			return openTransporteurs(0);
			break;

		case "documents":
			return openDocuments(0);
			break;

		case "devises":
			return openDevises(0);
			break;

		case "pays":
			return openpaysv();
			break;
		case "villes":
			return openVilleD();
			break;
		case "types":
			return openTypes(0);
			break;

		default:
			return null;
			break;
	}
};
