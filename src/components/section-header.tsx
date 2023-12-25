import { Text, Title } from "@mantine/core";
import React, { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  children: ReactNode;
}

function SectionHeader({ title, description, children }: SectionHeaderProps) {
  return (
    <div className="mb-2 flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <Title order={4}>{title}</Title>
        {description && <Text size="sm">{description}</Text>}
      </div>
      {children}
    </div>
  );
}

export default SectionHeader;
