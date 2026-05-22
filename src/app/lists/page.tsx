import React from 'react'
import ListsTab from './ListsTab'
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/likeActions'

type PageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ListsPage({searchParams}: PageProps) {
  const resolvedParams = await searchParams;
  const type = resolvedParams.type || "source";

  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  )
}
