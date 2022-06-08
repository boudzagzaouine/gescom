import ListAllCommandes from 'features/manager/client/ListAllCommandes';
import React from 'react';
import { client0 } from 'tools/types';

const CommandeClientManager = () => {
	return (
		<div>
			<ListAllCommandes client={client0} refetchParent={() => {}} />
		</div>
	);
};

export default CommandeClientManager;
