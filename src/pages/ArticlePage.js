import React, { useState, useEffect } from "react";

import AddCommentForm from "../components/AddCommentForm.";
import ArticlesList from "../components/ArticlesList";
import UpvotesSection from "../components/UpvotesSection";
import CommentsList from "../components/CommentsList";
import articleContent from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/articles/${name}`);
      let data = await response.json();
      setArticleInfo(data);
    };
    fetchData();
  }, [name]);

  if (!article) {
    return <NotFoundPage />;
  }
  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <h1>This is the {article.title} article</h1>
      <UpvotesSection
        articleName={name}
        upvotes={articleInfo.upvotes}
        setArticleInfo={setArticleInfo}
      />

      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
      <h3>Other Articles:</h3>
      <ArticlesList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
