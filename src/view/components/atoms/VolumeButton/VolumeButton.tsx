import React from 'react';
import cn from "classnames";
import { MuteIcon } from '~icons/MuteIcon';
import { UnmuteIcon } from '~icons/UnmuteIcon';
import styles from './VolumeButton.module.scss';

interface IVolumeButtonProps {
	muted: boolean,
	onClick: () => void;
	className?: string;
}

const VolumeButton: React.FC<IVolumeButtonProps> = ({
	muted,
	onClick,
	className,
}) => {
	return (
		<button
			className={cn(styles.button, className)}
			onClick={onClick}
		>
			{
				muted ? <MuteIcon /> : <UnmuteIcon />
			}
		</button>
	);
}

export default VolumeButton;
