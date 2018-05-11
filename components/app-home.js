import createReactClass from 'create-react-class'

import Link from 'next/link'

import AppBody from '../components/app-body.js'
import ScTitle from '../styles/sc-title'
import environment from '../environments/env-config.js'

const Home = createReactClass ({
    render() {
        return(
            <div>
                <section className="section">
                    <div className="container">
                        <ScTitle className="title">Enterthusiast code playground</ScTitle>
                        <p className="subtitle">
                            A <strong>serverless</strong> website.
                        </p>
                    </div>
                </section>
                <section className="section is-medium">
                    <div className="container">
                        <p>
                            Hello interweb wanderer \o/
                            <br/>
                            <br/>
                            Here I'm playing with next.js and aws lambda with a packager and uploader named scandium.
                            <br/>
                            I also added a list of article using dynamoDB with aws lambda again.
                            <br/>
                            <Link href={`${environment.link_prefix}/article`}>
                                <a>Article list</a>
                            </Link>
                            <br/>
                            <br/>
                            By the way we are also connected to the blizzard api, feel free to check your own character.
                            <br/>
                            <Link href={`${environment.link_prefix}/wow-character-finder`}>
                                <a>WoW character finder</a>
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        )
    }
});

const AppHome = AppBody(Home);

export default AppHome