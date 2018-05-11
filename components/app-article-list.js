import createReactClass from 'create-react-class'

import Link from 'next/link'

import AppBody from '../components/app-body.js'
import ScTitle from '../styles/sc-title'
import environment from '../environments/env-config.js'

const ArticleList = createReactClass ({
    render() {
        const articleList = (this.props && this.props.articleList && this.props.articleList.length > 0) ? (
            this.props.articleList.map((article) => {
                return(
                    <div className="content">
                        <h2>{article.title}</h2>
                        <p>
                            {article.content}
                        </p>
                        <hr/>
                    </div>
                );
            })
        ) : (
            <div>No article found.</div>
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

const AppArticleList = AppBody(ArticleList);

export default AppArticleList