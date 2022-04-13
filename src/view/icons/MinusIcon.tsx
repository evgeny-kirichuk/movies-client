import * as React from 'react';

interface Props {
	className?: string;
}

export const MinusIcon: React.FC<Props> = ({ className }) => {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M20.5714 9.85718H3.42857C2.63973 9.85718 2 10.4969 2 11.2857V12.7143C2 13.5032 2.63973 14.1429 3.42857 14.1429H20.5714C21.3603 14.1429 22 13.5032 22 12.7143V11.2857C22 10.4969 21.3603 9.85718 20.5714 9.85718Z"
				fill="black"
			/>
		</svg>
	);
};
