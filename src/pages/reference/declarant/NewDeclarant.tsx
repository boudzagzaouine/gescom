import React, { useRef } from "react";
import { declarant0 } from "tools/types";

import FormDeclarant from "features/reference/FormDeclarant";

export default function NewArticle() {
  const form = useRef(null);
  return (
    <div>
      <FormDeclarant declarant={declarant0} ref={form} />
    </div>
  );
}
