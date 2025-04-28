import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [article, setArticleState] = useState(defaultArticleState);

	const appStyles = {
		'--font-family': article.fontFamilyOption.value,
		'--font-size': article.fontSizeOption.value,
		'--font-color': article.fontColor.value,
		'--container-width': article.contentWidth.value,
		'--bg-color': article.backgroundColor.value,
	} as CSSProperties;


	return (
		<div
			className={clsx(styles.main)}
			style={appStyles}>
			<ArticleParamsForm 
				articleState={article}
				setArticleState={setArticleState}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
