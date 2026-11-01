import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@easyui/react";

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#getting-started">Guide</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbCurrent>Components</BreadcrumbCurrent></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
