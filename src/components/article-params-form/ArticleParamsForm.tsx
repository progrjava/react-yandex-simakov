import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { Spacing } from '../spacing';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import { 
	ArticleStateType, 
	backgroundColors, 
	contentWidthArr, 
	fontColors, 
	fontFamilyOptions, 
	fontSizeOptions,
	defaultArticleState
} from 'src/constants/articleProps';

type TArticleFormProps = {
	articleState: ArticleStateType, 
	setArticleState: (props: ArticleStateType) => void 
}

// Редуктор для управления состоянием формы
function formReducer(state: ArticleStateType, action: Partial<ArticleStateType>) {
	return { ...state, ...action };
}

export const ArticleParamsForm = (props: TArticleFormProps) => {
	const [isSideBar, setSidebar] = useState(false);
	const [formState, dispatchFormState] = useReducer(formReducer, props.articleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatchFormState(props.articleState);
	}, [props.articleState]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.setArticleState(formState);
	}

	const handleReset = () => {
		dispatchFormState(defaultArticleState);
		props.setArticleState(defaultArticleState);
	}

	useOutsideClickClose({
		isOpen: isSideBar,
		rootRef: sidebarRef,
		onClose: () => setSidebar(false),
	});


	return (
		<div ref={sidebarRef}>
			<ArrowButton
				isActive={isSideBar}
				onClick={() => setSidebar(!isSideBar)}
			/>
			<aside 
				className={clsx(styles.container, {[styles.container_open]: isSideBar})}>
				<form 
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<Text 
						size={31} 
						weight={800} 
						uppercase
					>
						Задайте параметры
					</Text>
					<Spacing size={50}/>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={value => dispatchFormState({fontFamilyOption: value})}
						title='шрифт'
					/>
					<Spacing size={50}/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={value => dispatchFormState({fontSizeOption: value})}
						title='размер шрифта'
					/>
					<Spacing size={50}/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={value => dispatchFormState({fontColor: value})}
						title='цвет шрифта'
					/>
					<Spacing size={50}/>
					<Separator/>
					<Spacing size={50}/>
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={value => dispatchFormState({backgroundColor: value})}
						title='цвет фона'
					/>
					<Spacing size={50}/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={value => dispatchFormState({contentWidth: value})}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
						/>
						<Button 
							title='Применить' 
							type='submit' 
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
