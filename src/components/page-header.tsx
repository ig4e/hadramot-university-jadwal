import { Title } from "@mantine/core";
import React, { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children: ReactNode;
}

function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Title order={2}>{title}</Title>
      {children}
    </div>
  );
}

export default PageHeader;
