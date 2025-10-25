import React from "react";

export const Link = ({ title, url }) => {
  const onClick = () => {
    alert("Ура! Пельмени!");
  };

  return (
    <a href={url} onClick={onClick}>
      {title}
    </a>
  );
};
