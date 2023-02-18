import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { ReactNode } from "react";
import Button from "./ui/Button";
import Header from "./ui/Header";
import P from "./ui/P";

function PageHeader({
	header,
	description,
	link,
	leftSection,
}: {
	header: string;
	description?: string;
	link?: { children?: ReactNode; buttonChildren?: ReactNode; href: string };
	leftSection?: { children: ReactNode };
}) {
	return (
		<div className="flex items-start justify-between">
			<div className="space-y-2">
				{header && <Header>{header}</Header>}
				{description && <P size="lg">{description}</P>}
			</div>

			{leftSection
				? leftSection.children
				: link && (
						<Link href={link.href}>
							{link.buttonChildren && (
								<Button size="lg" className="flex items-center gap-2 min-w-max self-end">
									{link.buttonChildren}
								</Button>
							)}
							{link.children}
						</Link>
				  )}
		</div>
	);
}

export default PageHeader;
