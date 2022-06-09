import React, { useRef } from "react";
import FormArticle from "features/reference/FormArticle";
import { article0 } from "tools/types";
import ListeArticleManager from "features/reference/ListArticle";

export default function NewArticle() {
  const form = useRef(null);
  return (
    <div>
      <ListeArticleManager/>
    </div>
  );
}
