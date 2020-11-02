import React from "react";
import Link from "next/link";
import { formatDate, shortify } from "@/utils/functions";

const TopicLink = ({ topic }) => (
  <Link href="/forum/topicos/[topicSlug]" as={`/forum/topicos/${topic.slug}`}>
    <a className="list-group-item list-group-item-action flex-column align-items-start py-3 subtle-shadow no-border mb-3">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1 black">{topic.title}</h5>
        <small>
          {formatDate(
            topic.createdAt,
            "Data inválida",
            "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
          )}
        </small>
      </div>
      <p className="mb-1">{shortify(topic.content)}</p>
      <div className="avatar-container my-2">
        <img src={topic.user.avatar} className="avatar-image mr-2"></img>
        <span className="avatar-title">{topic.user.username}</span>
      </div>
    </a>
  </Link>
);

export default TopicLink;
