import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";

export default function ListTransaction() {
  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="List transaction" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </div>
  );
}
