import React, { useState } from "react";
import ListColisage from "components/colisage/features/Listcolisage";
import FicheDeColisage from "components/colisage/features/FicheDeColisage";
import NouvelFich from "components/colisage/features/NouvelFich";
import { openClients } from "components/colisage/rtk/rtk_client";
import { ClientJson, colis0 } from "components/colisage/tools/types";
// import NouvelPalette from 'components/manager/colisage/NouvellePalette';

function GestionColisge(): JSX.Element {
  const ClientToOpen: any = openClients();
  const ClientJson: ClientJson = ClientToOpen.data;
  const [estAjt, setEstAjt] = useState(false);
  const [showColis, setShowColis] = useState(false);
  const [estModifier, setModifier] = useState(false);
  const [colis, setColis] = useState(colis0);

  return (
    <>
      {!estAjt && !showColis && (
        <ListColisage
          setEstAjt={setEstAjt}
          setShowColis={setShowColis}
          setModifier={setModifier}
          setColis={setColis}
          ClientJson={ClientJson}
        />
      )}
      {estAjt && !showColis && (
        <NouvelFich setEstAjt={setEstAjt} ClientJson={ClientJson} />
      )}
      {showColis && !estAjt && (
        <FicheDeColisage
          setShowColis={setShowColis}
          estModifier={estModifier}
          setModifier={setModifier}
          colis={colis}
          setColis={setColis}
          ClientJson={ClientJson}
        />
      )}
    </>
  );
}

export default GestionColisge;
