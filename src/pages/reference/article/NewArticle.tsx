import React, { useRef } from "react";
import FormArticle from "features/reference/FormArticle";
import { article0 } from "tools/types";

export default function NewArticle() {
  const form = useRef(null);
  return (
    <div>
      <FormArticle article={article0} ref={form} />
    </div>
  );
}
