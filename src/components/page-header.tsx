import { Text, Title } from "@mantine/core";
import React, { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children: ReactNode;
}

function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <Title order={2}>{title}</Title>
        {description && <Text>{description}</Text>}
      </div>
      <div className="min-w-max">{children}</div>
    </div>
  );
}

export default PageHeader;
