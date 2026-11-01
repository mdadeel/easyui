import { useState } from "react";
import { Pagination } from "@easyui/react";

export default function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} pageCount={5} onPageChange={setPage} />
  );
}
