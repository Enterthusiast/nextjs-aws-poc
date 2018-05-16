import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

import Link from 'next/link'

import AppBody from '../components/app-body.js'
import ScTitle from '../styles/sc-title'
import environment from '../environments/env-config.js'

const ArticleList = createReactClass ({
    render() {
        const articleList = (this.props && this.props.articleList && this.props.articleList.length > 0) ? (
            this.props.articleList.map((article, index) => {
                return(
                    <div className={`content article-${article.id}`} key={article.id}>
                        <h2>{article.title}</h2>
                        <p>
                            {article.content}
                        </p>
                        <hr/>
                    </div>
                );
            })
        ) : (
            <div className="character-not-found">No article found.</div>
        );

        return(
            <div>
                <section className="section">
                    <div className="container">
                        <Link href={`${environment.link_prefix}/`}>
                            <a>&lt; Home</a>
                        </Link>

                        <ScTitle className="title">Articles</ScTitle>
                        <p className="subtitle">
                            Article(s) coming from a <strong>serverless combo</strong>, DynamoDB + AWS Lambda.
                        </p>
                    </div>
                </section>
                <section className="section is-medium">
                    <div className="container">
                        {articleList}
                    </div>
                </section>
            </div>
        )
    }
});

ArticleList.propTypes = {
    articleList: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
        var missingPropertyList = [];

        ['id', 'title', 'content'].map(property => {
            if(!propValue[key].hasOwnProperty(property)) {
                missingPropertyList.push(property)
            }
        })

        if(missingPropertyList.length > 0) {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.' +
                ' Missing properties: ' + missingPropertyList.join(', ')
                );
        }

    })
};

const AppArticleList = AppBody(ArticleList);

export default AppArticleList