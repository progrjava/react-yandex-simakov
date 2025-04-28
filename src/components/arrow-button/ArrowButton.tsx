import { useState } from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

export type ArrowProps = {
	isActive: boolean,
	onClick: () => void
}

export const ArrowButton = (props: ArrowProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {[styles.container_open]: props.isActive})}
			onClick={props.onClick}
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {[styles.arrow_open]: props.isActive})}
			/>
		</div>
	);
};
