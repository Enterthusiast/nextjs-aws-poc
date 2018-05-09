import Head from 'next/head'

const AppHead = (props) => {

  const title = props.title ? props.title : 'Enterthusiast Web Lair'

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css"/>
      <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>
    </Head>
  );
}

export default AppHead