import Link from 'next/link'
import Title from '../styles/title.js'
import environment from './../environments/env-config.js'

const Index = () => (
    <div>
        <Title>Enterthusiast code playground</Title>
        <div>Welcome to next.js! (PS: I'm running on AWS Lambda, thanks to scandium)</div>
        <div>
            <Link href={`${environment.link_prefix}/wow-character`}>
                <a>Check my main wow character</a>
            </Link>
        </div>
    </div>
);

export default Index