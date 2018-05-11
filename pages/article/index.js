
import React from 'react'
import createReactClass from 'create-react-class'

import Router from 'next/router'
import Link from 'next/link'

import fetch from 'isomorphic-unfetch'
import AppHead from '../../components/app-head.js'
import AppArticleList from '../../components/app-article-list.js'

import ScTitle from '../../styles/sc-title'
import environment from '../../environments/env-config.js'

const PageArticleIndex = createReactClass ({
    statics: {
        async getInitialProps({ query }) {

            // Get article
            const articleListResponse = await fetch(`https://9aq30u9kje.execute-api.eu-west-3.amazonaws.com/production/article`)
            const articleListData = await articleListResponse.json()
        
            return {
                articleList: articleListData ? articleListData : {},
            }
        },
    },

    render() {
        return(
            <div>
                <AppHead title="Articles"/>
                <AppArticleList {...this.props}/>
            </div>
        ); 
    }
})

export default PageArticleIndex