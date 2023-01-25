import React from "react";
import Header from "../components/ui/Header";
import P from "../components/ui/P";

function Index() {
	return (
		<div>
			<div className="space-y-2">
				<Header>الجداول</Header>
				<P size="lg">هنا يوجد جميع الجداول</P>
			</div>
		</div>
	);
}

export default Index;
