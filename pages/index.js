import Link from 'next/link'

process.env.LINK_PREFIX = '';
if(process.env.NODE_ENV !== 'development') {
    process.env.LINK_PREFIX = '/default';
}

const Index = () => (
    <div>
        <div>Welcome to next.js! (PS: I'm running on AWS Lambda, thanks to scandium)</div>
        <div>
            <Link href={`${process.env.LINK_PREFIX}/wow-character`}>
                <a>Check my main wow character</a>
            </Link>
        </div>
    </div>
);

export default Index